import "./MovieCard.css";
import {
  Link,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { BiSolidDownArrow } from "react-icons/bi";
import { IconContext } from "react-icons";
import poster from "../../images/poster-image.png";
import React, { useEffect, useState } from "react";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiFillPlusCircle,
  AiOutlineArrowDown,
  AiOutlinePlus,
} from "react-icons/ai";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

let moreMovies = 0;

function MovieCard() {
  const [searchParams] = useSearchParams();
  let searchWord = searchParams.get("query");

  let { genreId } = useParams();
  let location = useLocation();
  const [movies, setMovies] = useState([]);
  let filteredMovies = movies.filter(
    (movie) =>
      movie.release_date ||
      (movie.first_air_date && movie.media_type !== "person")
  );

  const [favorites, setFavorites] = useState([]);
  const favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies"));
  const [scrollButtonVisible, setScrollButtonVisible] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [disabled, setDisabled] = useState(false);

  async function fetchMovies() {
    if (location.pathname === "/favorites") {
      const favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies"));
      setMovies(favoriteMovies && favoriteMovies);
      console.log("hej");
    } else {
      moreMovies++;
      let url = "";
      if (location.pathname === "/") {
        url = `https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${moreMovies}&api_key=${process.env.REACT_APP_APIKEY}`;
      } else if (location.pathname === "/search") {
        url = `https://api.themoviedb.org/3/search/multi?language=en-US&query=${searchWord}&page=${moreMovies}&api_key=${process.env.REACT_APP_APIKEY}`;
      } else if (location.pathname === `/genres/${genreId}`) {
        url = `https://api.themoviedb.org/3/discover/movie?language=en-US&&with_genres=${genreId}&page=${moreMovies}&api_key=${process.env.REACT_APP_APIKEY}`;
      }
      const response = await fetch(url);
      const allMovies = await response.json();
      allMovies.results.length === 0 && setDisabled(true);

      setMovies((prevMovies) => [...prevMovies, ...allMovies.results]);
      setTotalResults(allMovies.total_results || 0);
    }
  }

  const handleScroll = () => {
    const yOffset = window.scrollY;
    setScrollButtonVisible(yOffset > 200);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollUp = () => {
    const scrollSmooth = document.documentElement;

    scrollSmooth.scrollIntoView({ behavior: "smooth" });
  };
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
          original_title: movie.original_title,
          original_name: movie.original_name,
          release_date: movie.release_date,
          first_air_date: movie.first_air_date,
          vote_average: movie.vote_average,
          poster_path: movie.poster_path,
          media_type: movie.media_type,
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
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (location.pathname === "/favorites") {
      const favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies"));
      setMovies(favoriteMovies);
    }
  }, [favorites]);

  function sortMovie(sortType) {
    const sortedMovies = filteredMovies.sort((a, b) => {
      switch (sortType) {
        case "a-z":
          return (a.original_title || a.original_name).localeCompare(
            b.original_title || b.original_name
          );
        case "date":
          return (
            new Date(b.release_date || b.first_air_date) -
            new Date(a.release_date || a.first_air_date)
          );
        case "vote":
          return b.vote_average - a.vote_average;
        default:
          return 0;
      }
    });

    setMovies(sortedMovies);
  }

  return (
    <>
      <div class="sortContainer">
        <div class="select">
          <select onChange={(e) => sortMovie(e.target.value)}>
            <option value="a-z">A-Z</option>
            <option value="date">Sort by date</option>
            <option value="vote">Sort by vote</option>
          </select>
        </div>
      </div>
      <div className="gridContainer">
        <div className="gridInnerContainer">
          {favoriteMovies.length === 0 &&
            location.pathname === "/favorites" && (
              <>
                <h3>No movies added to favorites</h3>
                <Link to="/">Start adding</Link>
              </>
            )}

          {movies.length === 0 && searchWord && <h1> Movie not found</h1>}
          {Array.isArray(movies) &&
            filteredMovies.map((movie, i) => {
              return (
                <div className="cardConatiner">
                  <div
                    className="heartContainer"
                    onClick={() => handleFavorites(movie)}
                  >
                    {favorites.some((favorite) => favorite.id == movie.id) ? (
                      <AiFillHeart className="heart" size={50} color="red" />
                    ) : (
                      <AiOutlineHeart size={50} color="var(--main-color)" />
                    )}
                  </div>

                  <React.Fragment key={i}>
                    <Link
                      to={
                        (location.pathname === `/genres/${genreId}` &&
                          `/movie/${movie.id}`) ||
                        `/${movie.original_title ? "movie" : "tv"}/${movie.id}`
                      }
                      key={i}
                    >
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
                              <h3>
                                {movie.original_title || movie.original_name}
                              </h3>
                              <p>
                                {movie.release_date || movie.first_air_date}
                              </p>
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
            })}
        </div>
        {location.pathname !== "/favorites" && totalResults > 15 && (
          <div className="moreMovieButtonContainer">
            <div className="centerButton">
              <button
                className="moreMovieButton"
                disabled={disabled}
                onClick={() => fetchMovies()}
              >
                <AiFillPlusCircle size={50} color="var(--second-color)" />
              </button>
            </div>
          </div>
        )}
        <div
          className={`scrollUpContainer ${
            scrollButtonVisible ? "show" : "hide"
          }`}
        >
          {scrollButtonVisible && (
            <button className="scrollUp" onClick={scrollUp}>
              <BsFillArrowUpCircleFill size={50} color="var(--second-color)" />
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default MovieCard;
