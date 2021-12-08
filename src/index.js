import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import MovieListPage from './components/MovieListPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MovieDetailPage from './components/MovieDetailPage';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path = "/" element = {<MovieListPage/>}/>
        <Route path = "/:imdbId" element = {<MovieDetailPage/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
