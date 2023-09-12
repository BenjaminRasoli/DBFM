import "./MovieCard.css";
import { Link, useParams, useLocation } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { IconContext } from "react-icons";
import poster from "../../images/poster-image.png";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

let moreMovies = 0;
function MovieCard() {
  let { searchword, genreId } = useParams();
  let location = useLocation();
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies"));

  async function fetchMovies() {
    if (location.pathname === "/favorites") {
      const favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies"));
      setMovies(favoriteMovies);
    } else {
      moreMovies++;
      let url = "";
      if (location.pathname === "/") {
        url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${moreMovies}&api_key=${process.env.REACT_APP_APIKEY}`;
      } else if (location.pathname === `/search/${searchword}`) {
        url = `https://api.themoviedb.org/3/search/movie?language=en-US&query=${searchword}&page=${moreMovies}&api_key=${process.env.REACT_APP_APIKEY}`;
      } else if (location.pathname === `/genres/${genreId}`) {
        url = `https://api.themoviedb.org/3/discover/movie?language=en-US&&with_genres=${genreId}&page=${moreMovies}&api_key=${process.env.REACT_APP_APIKEY}`;
      }
      const response = await fetch(url);
      const allMovies = await response.json();

      setMovies((prevMovies) => [...prevMovies, ...allMovies.results]);
    }
  }

  function handleFavorites(movie) {
    const isAlreadyInFavorites = favorites.some(
      (favorite) => favorite.id === movie.id
    );

    if (isAlreadyInFavorites) {
      const updatedFavorites = favorites.filter(
        (favorite) => favorite.id !== movie.id
      );
      setFavorites(updatedFavorites);
      localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [
        ...favorites,
        {
          id: movie.id,
          title: movie.title,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          poster_path: movie.poster_path,
        },
      ];
      setFavorites(updatedFavorites);
      localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
    }
  }

  useEffect(() => {
    moreMovies = 0;
    setMovies([]);
    fetchMovies();
    const favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies"));
    setFavorites(favoriteMovies !== null ? favoriteMovies : []);
  }, [location]);

  useEffect(() => {
    if (location.pathname === "/favorites") {
      const favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies"));
      setMovies(favoriteMovies);
    }
  }, [favorites]);

  return (
    <div className="grid-container">
      {favoriteMovies.length === 0 && location.pathname === "/favorites" && (
        <Link to="/">Start adding</Link>
      )}
      {movies.length === 0 && searchword && <h1> Movie not found</h1>}
      {Array.isArray(movies) &&
        movies.map((movie, i) => {
          return (
            <React.Fragment key={i}>
              <div onClick={() => handleFavorites(movie)}>
                {favorites.some((favorite) => favorite.id == movie.id) ? (
                  <AiFillHeart size={50} />
                ) : (
                  <AiOutlineHeart size={50} />
                )}
              </div>

              <Link to={`/movie/${movie.id}`} key={i}>
                <div key={movie.id} className="grid-item">
                  <div className="movie-card">
                    <img
                      src={
                        movie.poster_path === null
                          ? poster
                          : "https://image.tmdb.org/t/p/w500/" +
                            movie.poster_path
                      }
                      alt={movie.title}
                      className="movie-image"
                    />
                    <IconContext.Provider value={{ color: "yellow" }}>
                      <div className="card-content">
                        <h3>{movie.title}</h3>
                        <p> {movie.release_date}</p>
                        <p>
                          {movie.vote_average}
                          <AiFillStar />
                        </p>
                      </div>
                    </IconContext.Provider>
                  </div>
                </div>
              </Link>
            </React.Fragment>
          );
        })}
      {location.pathname !== "/favorites" && (
        <button onClick={() => fetchMovies()}>more movies</button>
      )}
    </div>
  );
}

export default MovieCard;
