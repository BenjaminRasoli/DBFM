import "./MovieCard.css";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
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
    <div key={movie.id}>
      <div
        className="heartContainer"
        onClick={() => handleFavorites(movie, favorites, setFavorites)}
      >
        {favorites.some((favorite) => favorite.id === movie.id) ? (
          <AiFillHeart size={50} color="var(--fourth-color)" />
        ) : (
          <AiOutlineHeart size={50} color="var(--main-color)" />
        )}
      </div>

      <Link
        to={
          (location.pathname === `/genres/${genreId}` &&
            `/movie/${movie.id}`) ||
          `/${movie.original_title ? "movie" : "tv"}/${movie.id}`
        }
      >
        <div className="gridItem">
          <div className="movieCard">
            <img
              src={
                movie.poster_path === null
                  ? poster
                  : "https://image.tmdb.org/t/p/w500/" + movie.poster_path
              }
              alt={movie.title}
              className="movieImage"
            />
            <div className="cardContent">
              <h3>{movie.title || movie.name}</h3>
              <p>{movie.release_date || movie.first_air_date}</p>
              <p>
                {movie.vote_average}
                <AiFillStar color="yellow" />
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
