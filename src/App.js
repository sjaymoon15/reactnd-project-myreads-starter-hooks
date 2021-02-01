import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import Search from './Search';

const BooksApp = () => {
  return (
    <div>
      <Route exact path='/' render={() => <ListBooks />} />
      <Route path='/search' render={() => <Search />} />
    </div>
  );
};

export default BooksApp;
