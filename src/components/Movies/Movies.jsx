import "./Movies.css";
import MovieCard from "../MovieCard/MovieCard";
import {
  Link,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { handleFavorites, sortMovie } from "./functions";
import ClipLoader from "react-spinners/ClipLoader";

let moreMovies = 0;

function Movies({ genres }) {
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
  const favoriteMovies =
    JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  const [scrollButtonVisible, setScrollButtonVisible] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  const handleScroll = () => {
    const yOffset = window.scrollY;
    setScrollButtonVisible(yOffset > 200);
  };

  const scrollUp = () => {
    const scrollSmooth = document.documentElement;
    scrollSmooth.scrollIntoView({ behavior: "smooth" });
  };

  async function fetchMovies() {
    setLoading(true);

    if (location.pathname === "/favorites") {
      setMovies(favoriteMovies && favoriteMovies);
    } else {
      moreMovies++;
      let url = "";
      if (location.pathname === "/") {
        url = `https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${moreMovies}&api_key=${process.env.REACT_APP_APIKEY}`;
      } else if (location.pathname === "/search") {
        url = `https://api.themoviedb.org/3/search/multi?language=en-US&query=${searchWord}&page=${moreMovies}&api_key=${process.env.REACT_APP_APIKEY}`;
      } else if (location.pathname === `/genres/${genreId}`) {
        url = `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${genreId}&page=${moreMovies}&api_key=${process.env.REACT_APP_APIKEY}`;
      }

      const response = await fetch(url);
      const allMovies = await response.json();

      const filteredResults = allMovies.results?.filter(
        (item) => item.media_type === "movie" || item.media_type === "tv"
      );

      if (filteredResults?.length === 0) setDisabled(true);

      setMovies((prevMovies) => [...prevMovies, ...filteredResults]);
      setTotalResults(filteredResults.total_results || 0);
    }

    setLoading(false);
  }

  useEffect(() => {
    moreMovies = 0;
    setMovies([]);
    fetchMovies();
    setDisabled(false);

    setFavorites(favoriteMovies !== null ? favoriteMovies : []);
    window.scrollTo(0, 0);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  useEffect(() => {
    if (location.pathname === "/favorites") {
      const favoriteMovies =
        JSON.parse(localStorage.getItem("favoriteMovies")) || [];
      setMovies(favoriteMovies);
    }
  }, [favorites, location.pathname]);

  return (
    <>
      <div className="sortContainer">
        {((location.pathname !== "/favorites" && movies.length > 0) ||
          (location.pathname === "/favorites" &&
            favoriteMovies.length > 0)) && (
          <div className="select">
            <select
              onChange={(e) =>
                sortMovie(e.target.value, filteredMovies, setMovies)
              }
            >
              <option value="a-z">A-Z</option>
              <option value="date">Sort by date</option>
              <option value="vote">Sort by vote</option>
            </select>
          </div>
        )}
        <div className="movieGenresContainerAll">
          {location.pathname === "/" && (
            <h3 className="movieGenresText">Recent</h3>
          )}
          {location.pathname === "/favorites" && (
            <h3 className="movieGenresText">Favorites</h3>
          )}
          {location.pathname === "/search" && (
            <h3>
              Results for <span className="searchWord"> "{searchWord}" </span>(
              {totalResults} found)
            </h3>
          )}
          {location.pathname.startsWith("/genres/") && Array.isArray(genres) ? (
            genres.filter((genre) => genre.id === parseInt(genreId)).length >
            0 ? (
              genres
                .filter((genre) => genre.id === parseInt(genreId))
                .map((genre) => (
                  <h3 className="movieGenresText" key={genre.id}>
                    {genre.name}
                  </h3>
                ))
            ) : (
              <h3>Genre not found</h3>
            )
          ) : null}
        </div>
      </div>

      <div className="gridContainer">
        <div className="gridInnerContainer">
          {favoriteMovies.length === 0 &&
            location.pathname === "/favorites" && (
              <>
                <div className="noFavorites">
                  <h3>No movies added to favorites</h3>
                  <span>
                    <Link to="/">Start adding</Link>
                  </span>
                </div>
              </>
            )}
          {!loading && movies.length === 0 && searchWord && (
            <div className="noResultsFound">
              <h1>No results found</h1>
              <Link to="/">Go back to Home</Link>
            </div>
          )}
          {Array.isArray(movies) &&
            filteredMovies.map((movie, i) => {
              return (
                <React.Fragment key={i}>
                  <MovieCard
                    handleFavorites={handleFavorites}
                    movie={movie}
                    favorites={favorites}
                    setFavorites={setFavorites}
                    genreId={genreId}
                    location={location}
                  />
                </React.Fragment>
              );
            })}
        </div>

        {loading &&
          movies.length === 0 &&
          location.pathname !== "/favorites" && (
            <div className="centerLoading">
              <ClipLoader color="var(--fourth-color)" size={150} />
            </div>
          )}

        {movies.length !== 0 &&
          location.pathname !== "/favorites" &&
          totalResults > 15 && (
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

        <div className={`scrollUpContainer ${scrollButtonVisible && "show"}`}>
          <button className="scrollUp" onClick={scrollUp}>
            <BsFillArrowUpCircleFill size={50} color="var(--second-color)" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Movies;
