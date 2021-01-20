import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';

class Book extends Component {
  state = {
    book: {},
  };

  componentDidMount() {
    const { book } = this.props;
    if (book && book.shelf) {
      this.setState(() => ({
        book,
      }));
    }

    if (book && !book.shelf) {
      BooksAPI.get(book.id).then((book) => {
        this.setState(() => ({
          book,
        }));
      });
    }
  }

  handleOnChange = (event) => {
    const newShelfValue = event.target.value;
    const bookState = this.state.book;
    bookState.shelf = newShelfValue;

    this.setState(() => ({ book: bookState }));
    if (this.props.onSelectShelf) {
      this.props.onSelectShelf(this.state.book, newShelfValue);
    }
  };

  render() {
    const { book } = this.state;
    const style = {
      width: 128,
      height: 193,
    };

    if (book && book.imageLinks) {
      style.backgroundImage = `url("${book.imageLinks.thumbnail}")`;
    }
    return (
      <li>
        <div className='book'>
          <div className='book-top'>
            <div className='book-cover' style={style} />
            <div className='book-shelf-changer'>
              <select value={book.shelf} onChange={this.handleOnChange}>
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
  }
}

export default Book;
