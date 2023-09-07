import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Movie() {
  let { id } = useParams();
  const [movie, setMovie] = useState({});

  async function fetchMovie() {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${process.env.REACT_APP_APIKEY}`
    );
    const movie = await response.json();
    setMovie(movie);
    console.log(movie);
  }

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <>
      {Array.isArray(movie.genres) &&
        movie.genres.map((movie, i) => {
          return <h1 key={i}>{movie.name}</h1>;
        })}

      <div>
        {Array.isArray(movie.genres) &&
          movie.production_companies.map((movie) => {
            return (
              <>
                <h1>{movie.name}</h1>
                <h1>{movie.origin_country}</h1>
              </>
            );
          })}
      </div>
    </>
  );
}

export default Movie;
