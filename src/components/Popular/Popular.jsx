import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import "./Popular.css";
import { AiFillStar } from "react-icons/ai";
import { IconContext } from "react-icons";
import poster from "../../images/poster-image.png";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function Popular() {
  let { searchword } = useParams();
  let location = useLocation();
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  async function fetchMovies() {
    const response = await fetch(
      location.pathname === "/"
        ? `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${process.env.REACT_APP_APIKEY}`
        : `https://api.themoviedb.org/3/search/movie?query=${searchword}&api_key=${process.env.REACT_APP_APIKEY}`
    );
    const allMovies = await response.json();
    setMovies(allMovies.results);
  }

  function handleFavorites(movie) {
    const isAlreadyInFavorites = favorites.some(
      (favorite) => favorite.movieId === movie.id
    );

    if (isAlreadyInFavorites) {
      const updatedFavorites = favorites.filter(
        (favorite) => favorite.movieId !== movie.id
      );
      setFavorites(updatedFavorites);
      localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [
        ...favorites,
        {
          movieId: movie.id,
          movieName: movie.title,
        },
      ];
      setFavorites(updatedFavorites);
      localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
    }
  }

  useEffect(() => {
    fetchMovies();
    const favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies"));
    setFavorites(favoriteMovies !== null ? favoriteMovies : []);
    console.log(movies);
  }, [searchword]);

  return (
    <div className="grid-container">
      {movies.length === 0 && <h1> Movie not found</h1>}
      {favorites.map((favorite) => {
        return (
          <>
            <p>{favorite.movieName}</p>
            {/* <AiFillHeart
              size={50}
              onClick={() => {
                favorites.filter(favorites.movieId !== favorite.movieId);
              }}
            /> */}
          </>
        );
      })}

      {Array.isArray(movies) &&
        movies.map((movie, i) => {
          return (
            <>
              <div onClick={() => handleFavorites(movie)}>
                {favorites.some((favorite) => favorite.movieId == movie.id) ? (
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
            </>
          );
        })}
    </div>
  );
}

export default Popular;
