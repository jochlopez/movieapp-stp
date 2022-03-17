import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from "./components/SearchBox";
import AddFavourite from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

function App() {

const [movies, setMovies] = useState([]);
const [searchValue, setSearchValue] = useState('');
const [favourites, setFavourites] = useState([]);

const getMovieRequest = async (searchValue) => {
  const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=41a3317e`;

  const responce = await fetch(url);
  const responceJson = await responce.json();

  if(responceJson.Search) {
    setMovies(responceJson.Search);
  }
};

useEffect(()=> {
  getMovieRequest(searchValue);
}, [searchValue]);

const saveToLocalStorage = (items) =>{
  localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
};

const AddFavouriteMovie = (movie) => {
  const newFavouriteList = [...favourites, movie];
  setFavourites(newFavouriteList);
  saveToLocalStorage(newFavouriteList);
}

const removeFavouriteMovie = (movie) => {
  const newFavouriteList = favourites.filter(
    (favourite) => favourite.imdbID !== movie.imdbID
  );

  setFavourites(newFavouriteList);
  saveToLocalStorage(newFavouriteList);
}

  return (
    <div className="container-fluid movie-app">
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading="Movies"/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      
      <div className='row'>
        <MovieList
            movies={movies}
            handleFavouritesClick={AddFavouriteMovie}
            favouriteComponent={AddFavourite}
        /> 
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading="Favourites" />
      </div>
      <div className='row'>
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
}

export default App;
