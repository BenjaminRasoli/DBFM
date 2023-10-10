import "./MovieCard.css";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { IconContext } from "react-icons";
import poster from "../../images/poster-image.png";
import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function MovieCard({
  handleFavorites,
  movie,
  favorites,
  setFavorites,
  genreId,

  location,
}) {
  return (
    <div className="cardConatiner" key={movie.id}>
      <div
        className="heartContainer"
        onClick={() => handleFavorites(movie, favorites, setFavorites)}
      >
        {favorites.some((favorite) => favorite.id == movie.id) ? (
          <AiFillHeart className="heart" size={50} color="red" />
        ) : (
          <AiOutlineHeart size={50} color="var(--main-color)" />
        )}
      </div>

      <React.Fragment>
        <Link
          to={
            (location.pathname === `/genres/${genreId}` &&
              `/movie/${movie.id}`) ||
            `/${movie.original_title ? "movie" : "tv"}/${movie.id}`
          }
        >
          <div className="grid-item">
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
                  <h3>{movie.original_title || movie.original_name}</h3>
                  <p>{movie.release_date || movie.first_air_date}</p>
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
    </div>
  );
}

export default MovieCard;
