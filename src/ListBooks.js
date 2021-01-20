import React, { Component } from 'react';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

class ListBooks extends Component {
  state = { bookShelvesMap: {}, books: [] };
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      const bookShelvesMap = this.mapBooksToShelves(books);
      this.setState(() => ({
        bookShelvesMap,
      }));
    });
  }
  mapBooksToShelves(books = []) {
    const bookShelvesMap = {};
    for (const book of books) {
      if (bookShelvesMap[book.shelf]) {
        bookShelvesMap[book.shelf].push(book);
      } else {
        bookShelvesMap[book.shelf] = [book];
      }
    }
    return bookShelvesMap;
  }

  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((res) => {
      BooksAPI.getAll().then((books) => {
        const bookShelvesMap = this.mapBooksToShelves(books);
        this.setState(() => ({
          bookShelvesMap,
        }));
      });
    });
  };

  render() {
    const { bookShelvesMap } = this.state;
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
                  onSelectShelf={this.updateBookShelf}
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
  }
}

export default ListBooks;
