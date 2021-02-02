import React from 'react';
import Book from './Book';

const BookShelf = ({ bookShelfBooks, bookShelfNameKey, onSelectShelf }) => {
  const bookShelfName = extractBookShelfName(bookShelfNameKey);
  return (
    <div className='bookshelf'>
      <h2 className='bookshelf-title'>{bookShelfName}</h2>
      <div className='bookshelf-books'>
        <ol className='books-grid'>
          {bookShelfBooks.map((book) => {
            return (
              <Book
                bookProp={book}
                onSelectShelf={onSelectShelf}
                key={book.id}
              />
            );
          })}
        </ol>
      </div>
    </div>
  );
};

const extractBookShelfName = (shelfValue) => {
  if (shelfValue === 'currentlyReading') {
    return 'Currently Reading';
  } else if (shelfValue === 'wantToRead') {
    return 'Want To Read';
  } else if (shelfValue === 'read') {
    return 'Read';
  }
};

export default BookShelf;
