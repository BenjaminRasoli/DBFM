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

  if (searchWord && searchWord.length > 15) {
    searchWord = searchWord.slice(0, 15) + "...";
  }
  const [favorites, setFavorites] = useState([]);
  const favoriteMovies =
    JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  const [scrollButtonVisible, setScrollButtonVisible] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(true);

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
      let movieUrl = "";
      let tvUrl = "";

      if (location.pathname === "/") {
        url = `https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${moreMovies}&api_key=${process.env.REACT_APP_APIKEY}`;
      } else if (location.pathname === "/search") {
        movieUrl = `https://api.themoviedb.org/3/search/movie?include_adult=true?language=en-US&query=${searchWord}&page=${moreMovies}&api_key=${process.env.REACT_APP_APIKEY}`;
        tvUrl = `https://api.themoviedb.org/3/search/tv?include_adult=true?language=en-US&query=${searchWord}&page=${moreMovies}&api_key=${process.env.REACT_APP_APIKEY}`;
      } else if (location.pathname === `/genres/${genreId}`) {
        url = `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${genreId}&page=${moreMovies}&api_key=${process.env.REACT_APP_APIKEY}`;
      }

      if (movieUrl && tvUrl) {
        const [movieResponse, tvResponse] = await Promise.all([
          fetch(movieUrl),
          fetch(tvUrl),
        ]);

        const allMovies = await movieResponse.json();
        const allTVShows = await tvResponse.json();

        const combinedResults = [...allMovies.results, ...allTVShows.results];

        setMovies((prevMovies) => [...prevMovies, ...combinedResults]);
        setTotalResults(allMovies.total_results + allTVShows.total_results);
      } else {
        const response = await fetch(url);
        const allMovies = await response.json();

        setMovies((prevMovies) => [...prevMovies, ...allMovies.results]);
        setTotalResults(allMovies.total_results);
      }
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
              onChange={(e) => sortMovie(e.target.value, movies, setMovies)}
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
            <h3 className="searchWordContainer">
              Results for
              <span className="searchWord">
                <br /> "{searchWord}"
              </span>
              <br />({totalResults} found)
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
            movies.map((movie) => {
              return (
                <React.Fragment key={movie.id}>
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
          totalResults > movies.length && (
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
