import React, { useEffect, useState } from "react";
import "./SearchedMovies.css";
import { Link, useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { IconContext } from "react-icons";
import poster from "../../images/poster-image.png";

function SearchedMovies() {
  let { searchword } = useParams();

  const [searchedMovies, setSearchedMovies] = useState([]);

  async function getSearchedMovies() {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchword}&api_key=${process.env.REACT_APP_APIKEY}`
    );
    const allSearchedMovies = await response.json();
    setSearchedMovies(allSearchedMovies.results);
  }

  useEffect(() => {
    getSearchedMovies();
  }, [searchword]);

  return (
    <div className="grid-container">
      {searchedMovies.map((movie, i) => {
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

export default SearchedMovies;
