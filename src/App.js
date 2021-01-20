import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import Search from './Search';

class BooksApp extends React.Component {
  render() {
    return (
      <div>
        <Route exact path='/' render={() => <ListBooks />} />
        <Route path='/search' render={() => <Search />} />
      </div>
    );
  }
}

export default BooksApp;
