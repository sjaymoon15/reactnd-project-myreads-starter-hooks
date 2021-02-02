import React, { useState } from 'react';
import Book from './Book';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

const Search = () => {
  const [searchedBooks, setSearchedBooks] = useState([]);

  const searchBooks = async (searchQuery) => {
    const searchedBooksRes = await BooksAPI.search(searchQuery);
    setSearchedBooks(searchedBooksRes);
  };

  const onInputChange = ({ target }) => {
    if (target) {
      searchBooks(target.value);
    }
  };

  const updateBookShelf = async (book, shelf) => {
    await BooksAPI.update(book, shelf);
  };

  return (
    <div className='search-books'>
      <div className='search-books-bar'>
        <Link to='/'>
          <button className='close-search'>Close</button>
        </Link>
        <div className='search-books-input-wrapper'>
          <input
            type='text'
            onChange={onInputChange}
            placeholder='Search by title or author'
          />
        </div>
      </div>
      <div className='search-books-results'>
        <ol className='books-grid'>
          {searchedBooks &&
            searchedBooks.length > 0 &&
            searchedBooks.map((book) => {
              return (
                <Book
                  bookProp={book}
                  key={book.id}
                  onSelectShelf={updateBookShelf}
                />
              );
            })}
        </ol>
      </div>
    </div>
  );
};

export default Search;
