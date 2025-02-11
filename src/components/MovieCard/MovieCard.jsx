import "./MovieCard.css";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import poster from "../../images/poster-image.png";
import personPoster from "../../images/personPlaceHolder.jpg";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useUser } from "../../context/UserProvider";
import { fetchFavoritesFromFirebase } from "../Movies/functions";
import { useEffect } from "react";

function MovieCard({
  handleFavorites,
  movie,
  favorites,
  setFavorites,
  genreId,
  location,
  activeFilter,
}) {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchFavoritesFromFirebase(user.uid).then((fetchedFavorites) => {
        setFavorites(fetchedFavorites);
        localStorage.setItem(
          "favoriteMovies",
          JSON.stringify(fetchedFavorites)
        );
      });
    } else {
      const storedFavorites =
        JSON.parse(localStorage.getItem("favoriteMovies")) || [];
      setFavorites(storedFavorites);
    }
  }, [user]);

  return (
    <div className="movieCardContainer" key={movie.id}>
      {movie.media_type !== "person" && (
        <div
          className="heartContainer"
          onClick={() => handleFavorites(movie, favorites, setFavorites, user)}
        >
          {favorites.some((favorite) => favorite.id === movie.id) ? (
            <AiFillHeart size={50} color="var(--fourth-color)" />
          ) : (
            <AiOutlineHeart size={50} color="var(--main-color)" />
          )}
        </div>
      )}
      <Link
        className="movieLink"
        to={
          activeFilter === "movies" || movie.media_type === "movie"
            ? `/movie/${movie.id}`
            : activeFilter === "series" || movie.media_type === "tv"
            ? `/tv/${movie.id}`
            : movie.media_type === "person"
            ? `/actor/${movie.id}`
            : `/movie/${movie.id}`
        }
      >
        <div className="gridItem">
          <div className="movieCard">
            <img
              src={
                movie.media_type !== "person"
                  ? movie.poster_path === null
                    ? poster
                    : "https://image.tmdb.org/t/p/w500/" + movie.poster_path
                  : movie.profile_path === null
                  ? personPoster
                  : "https://image.tmdb.org/t/p/w500/" + movie.profile_path
              }
              alt={movie.title}
              className="movieImage"
            />
            <div className="cardContent">
              <h3>{movie.title || movie.name || "Unknown Title"}</h3>
              {movie.media_type !== "person" && (
                <p>
                  {movie.release_date ||
                    movie.first_air_date ||
                    "Unknown Release Date"}
                </p>
              )}
              {movie.media_type !== "person" && (
                <p className="rating">
                  {movie.vote_average || 0}
                  <AiFillStar color="yellow" />
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
