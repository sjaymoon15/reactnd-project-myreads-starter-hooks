import React, { Component } from 'react';
import Book from './Book';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

class Search extends Component {
  state = {
    searchedBooks: [],
    searchQuery: '',
  };

  searchBooks = (searchQuery) => {
    BooksAPI.search(searchQuery).then((searchedBooks) => {
      this.setState(() => ({
        searchedBooks,
      }));
    });
  };

  onInputChange = ({ target }) => {
    if (target) {
      this.setState(() => ({
        searchQuery: target.value,
      }));
      this.searchBooks(target.value);
    }
  };

  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((res) => {});
  };

  render() {
    const { searchedBooks } = this.state;
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/'>
            <button className='close-search'>Close</button>
          </Link>
          <div className='search-books-input-wrapper'>
            <input
              type='text'
              onChange={this.onInputChange}
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
                    book={book}
                    key={book.id}
                    onSelectShelf={this.updateBookShelf}
                  />
                );
              })}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
