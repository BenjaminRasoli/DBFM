import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Popular.css";
import { AiFillStar } from "react-icons/ai";
import { IconContext } from "react-icons";
import poster from "../../images/poster-image.png";

function Popular() {
  const [movies, setMovies] = useState([]);

  async function fetchMovies() {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${process.env.REACT_APP_APIKEY}`
    );
    const allMovies = await response.json();
    setMovies(allMovies.results);
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="grid-container">
      {Array.isArray(movies) &&
        movies.map((movie, i) => {
          return (
            <Link to={`/movie/${movie.id}`} key={i}>
              <div key={movie.id} className="grid-item">
                <div className="movie-card">
                  <img
                    src={
                      movie.poster_path === null
                        ? poster
                        : "https://image.tmdb.org/t/p/w500/" + movie.poster_path
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
          );
        })}
    </div>
  );
}

export default Popular;
