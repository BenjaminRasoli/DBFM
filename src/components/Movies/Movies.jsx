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

function Movies({ genres }) {
  const [searchParams] = useSearchParams();
  let searchWord = searchParams.get("query");
  let displaySearchWord = searchWord;
  if (searchWord && searchWord.length > 15) {
    displaySearchWord = searchWord.slice(0, 15) + "...";
  }

  let { genreId } = useParams();
  let location = useLocation();
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const favoriteMovies =
    JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  const [scrollButtonVisible, setScrollButtonVisible] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("default");

  const [activeFilter, setActiveFilter] = useState("all");
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
      let url = "";

      if (location.pathname === "/") {
        url = `https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${page}&api_key=${process.env.REACT_APP_APIKEY}`;
      } else if (location.pathname === "/search") {
        if (activeFilter === "all") {
          url = `https://api.themoviedb.org/3/search/multi?include_adult=true?language=en-US&query=${searchWord}&page=${page}&api_key=${process.env.REACT_APP_APIKEY}`;
        } else if (activeFilter === "movies") {
          url = `https://api.themoviedb.org/3/search/movie?include_adult=true?language=en-US&query=${searchWord}&page=${page}&api_key=${process.env.REACT_APP_APIKEY}`;
        } else if (activeFilter === "series") {
          url = `https://api.themoviedb.org/3/search/tv?include_adult=true?language=en-US&query=${searchWord}&page=${page}&api_key=${process.env.REACT_APP_APIKEY}`;
        }
      } else if (location.pathname === `/genres/${genreId}`) {
        url = `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${genreId}&page=${page}&api_key=${process.env.REACT_APP_APIKEY}`;
      }

      const response = await fetch(url);
      const allMovies = await response.json();
      setMovies((prevMovies) =>
        page === 1 ? allMovies.results : [...prevMovies, ...allMovies.results]
      );
      setTotalResults(allMovies.total_results);
    }

    setLoading(false);
  }


  const fetchAll = async () => {
    let url = "";
    if (location.pathname === "/") {
      url = `https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${page}&api_key=${process.env.REACT_APP_APIKEY}`;
    } else if (location.pathname === "/search") {
      url = `https://api.themoviedb.org/3/search/multi?include_adult=true?language=en-US&query=${searchWord}&page=${page}&api_key=${process.env.REACT_APP_APIKEY}`;
    } else if (location.pathname === "/favorites") {
      setActiveFilter("all");
      setMovies(favoriteMovies);
      return;
    }
    const response = await fetch(url);
    const allMovies = await response.json();

    setMovies(allMovies.results);
    setTotalResults(allMovies.total_results);
    setActiveFilter("all");
  };

  const fetchSearchedMovies = async () => {
    let url = "";
    if (location.pathname === "/search") {
      url = `https://api.themoviedb.org/3/search/movie?include_adult=true?language=en-US&query=${searchWord}&page=${page}&api_key=${process.env.REACT_APP_APIKEY}`;
    } else if (location.pathname === "/") {
      url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}&api_key=${process.env.REACT_APP_APIKEY}`;
    } else if (location.pathname === "/favorites") {
      setActiveFilter("movies");
      setMovies(favoriteMovies);
      return;
    }
    const response = await fetch(url);
    const allMovies = await response.json();

    setMovies(allMovies.results);
    setTotalResults(allMovies.total_results);
    setActiveFilter("movies");
  };

  const fetchSearchedSeries = async () => {
    let url = "";
    if (location.pathname === "/search") {
      url = `https://api.themoviedb.org/3/search/tv?include_adult=true?language=en-US&query=${searchWord}&page=${page}&api_key=${process.env.REACT_APP_APIKEY}`;
    } else if (location.pathname === "/") {
      url = `https://api.themoviedb.org/3/trending/tv/day?language=en-US&page=${page}&api_key=${process.env.REACT_APP_APIKEY}`;
    } else if (location.pathname === "/favorites") {
      setActiveFilter("series");
      setMovies(favoriteMovies);
      return;
    }
    const response = await fetch(url);
    const allMovies = await response.json();

    setMovies(allMovies.results);
    setTotalResults(allMovies.total_results);
    setActiveFilter("series");
  };

  useEffect(() => {
    setActiveFilter("all");
    setMovies([]);
    setPage(1);
    setDisabled(false);
    fetchAll();

    window.scrollTo(0, 0);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [searchWord, location]);

  useEffect(() => {
    fetchMovies();
  }, [genreId]);

  useEffect(() => {
    setPage(1);
    setSortOption("default");
  }, [activeFilter, searchWord]);

  useEffect(() => {
    fetchMovies();
  }, [page]);

  useEffect(() => {
    if (location.pathname === "/favorites") {
      let favoriteMovies =
        JSON.parse(localStorage.getItem("favoriteMovies")) || [];

      if (activeFilter === "movies") {
        favoriteMovies = favoriteMovies.filter(
          (movie) => movie.media_type !== "tv"
        );
      } else if (activeFilter === "series") {
        favoriteMovies = favoriteMovies.filter(
          (movie) => movie.media_type !== "movie"
        );
      }
      const fetchFavorites = async () => {
        try {
          const moviesDetails = await Promise.all(
            favoriteMovies.map(async (movie) => {
              const url = `https://api.themoviedb.org/3/${movie.media_type}/${movie.id}?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`;
              const response = await fetch(url);
              return response.json();
            })
          );
          setMovies(moviesDetails);
        } catch (error) {
          console.error("Error fetching favorite movies:", error);
        }
      };
      fetchFavorites();
    }
  }, [favorites, location.pathname, activeFilter]);

  return (
    <>
      <div className="sortContainer">
        {(location.pathname !== "/favorites" || favoriteMovies.length > 0) && (
          <div className="select">
            {location.pathname !== `/genres/${genreId}` && (
              <div className="moviesOrSeries">
                <button
                  disabled={activeFilter === "all"}
                  className={`searchedFilter ${
                    activeFilter === "all" ? "active" : ""
                  }`}
                  onClick={fetchAll}
                >
                  All
                </button>
                |
                <button
                  disabled={activeFilter === "movies"}
                  className={`searchedFilter ${
                    activeFilter === "movies" ? "active" : ""
                  }`}
                  onClick={fetchSearchedMovies}
                >
                  Movies
                </button>
                |
                <button
                  disabled={activeFilter === "series"}
                  className={`searchedFilter ${
                    activeFilter === "series" ? "active" : ""
                  }`}
                  onClick={fetchSearchedSeries}
                >
                  Series
                </button>
              </div>
            )}

            <select
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
                sortMovie(e.target.value, movies, setMovies);
              }}
            >
              {sortOption === "default" && (
                <option value="default">Sort by</option>
              )}
              <option value="a-z">A-Z</option>
              <option value="date">Sort by date</option>
              <option value="vote">Sort by vote</option>
            </select>
          </div>
        )}

        <div className="movieGenresContainerAll">
          {location.pathname === "/" && (
            <h3 className="movieGenresText">Trending</h3>
          )}
          {location.pathname === "/favorites" && (
            <div className="favoritesText">
              <h3 className="movieGenresText">Favorites</h3>
              <span className="favoritesAmountText">
                You've favorited
                <span className="favoritesAmount"> {movies.length}</span>{" "}
                {activeFilter === "movies"
                  ? "Movies"
                  : activeFilter === "series"
                  ? "Series"
                  : "Movies/Series"}
              </span>
            </div>
          )}
          {location.pathname === "/search" && (
            <h3 className="searchWordContainer">
              Results for
              <span className="searchWord">
                <br /> "{displaySearchWord}"
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
                    activeFilter={activeFilter}
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
                  onClick={() => setPage(page + 1)}
                >
                  <AiFillPlusCircle size={50} />
                </button>
              </div>
            </div>
          )}

        <div className={`scrollUpContainer ${scrollButtonVisible && "show"}`}>
          <button className="scrollUp" onClick={scrollUp}>
            <BsFillArrowUpCircleFill size={50} />
          </button>
        </div>
      </div>
    </>
  );
}

export default Movies;
