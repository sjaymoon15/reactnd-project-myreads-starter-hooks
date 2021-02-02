import React, { useEffect, useState } from 'react';
import * as BooksAPI from './BooksAPI';

const Book = ({ onSelectShelf, bookProp }) => {
  const [book, setBook] = useState({});
  const [bookStyle, setBookstyle] = useState({});

  useEffect(
    () => {
      if (bookProp && bookProp.shelf) {
        setBook(bookProp);
      }

      if (bookProp && !bookProp.shelf) {
        BooksAPI.get(bookProp.id).then((book) => {
          setBook(book);
        });
      }
    },
    [bookProp]
  );

  useEffect(
    () => {
      const style = {
        width: 128,
        height: 193,
      };

      if (book && book.imageLinks) {
        style.backgroundImage = `url("${book.imageLinks.thumbnail}")`;
      }

      setBookstyle({ style });
    },
    [book]
  );

  const handleOnChange = (event) => {
    const newShelfValue = event.target.value;
    const bookState = book;
    bookState.shelf = newShelfValue;

    setBook(bookState);
    if (onSelectShelf) {
      onSelectShelf(book, newShelfValue);
    }
  };

  return (
    <li>
      <div className='book'>
        <div className='book-top'>
          <div className='book-cover' style={bookStyle.style} />
          <div className='book-shelf-changer'>
            <select value={book.shelf} onChange={handleOnChange}>
              <option value='move' disabled>
                Move to...
              </option>
              <option value='currentlyReading'>Currently Reading</option>
              <option value='wantToRead'>Want to Read</option>
              <option value='read'>Read</option>
              <option value='none'>None</option>
            </select>
          </div>
        </div>
        <div className='book-title'>{book.title}</div>
        {book &&
          book.authors &&
          book.authors.map((author) => {
            return (
              <div className='book-authors' key={author}>
                {author}
              </div>
            );
          })}
      </div>
    </li>
  );
};

export default Book;
