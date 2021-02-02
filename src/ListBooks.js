import React, { useEffect, useState } from 'react';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

const ListBooks = () => {
  const [bookShelvesMap, setBookShelvesMap] = useState({});

  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      const bookShelvesMap = mapBooksToShelves(books);
      setBookShelvesMap(bookShelvesMap);
    });
  }, []);

  const mapBooksToShelves = (books = []) => {
    const bookShelvesMap = {};
    for (const book of books) {
      if (bookShelvesMap[book.shelf]) {
        bookShelvesMap[book.shelf].push(book);
      } else {
        bookShelvesMap[book.shelf] = [book];
      }
    }
    return bookShelvesMap;
  };

  const updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((res) => {
      BooksAPI.getAll().then((books) => {
        const bookShelvesMap = mapBooksToShelves(books);
        setBookShelvesMap(bookShelvesMap);
      });
    });
  };

  return (
    <div>
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          {Object.keys(bookShelvesMap).map((key, i) => {
            return (
              <BookShelf
                onSelectShelf={updateBookShelf}
                bookShelfBooks={bookShelvesMap[key]}
                bookShelfNameKey={key}
                key={key}
              />
            );
          })}
        </div>
      </div>
      <div className='open-search'>
        <Link to='/search'>
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  );
};

export default ListBooks;
