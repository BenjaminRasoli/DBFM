import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Select from "react-select";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import YouTube from "react-youtube";
import poster from "../../images/poster-image.png";
import noImageHolder from "../../images/noImageHolder.jpg";

import {
  AiFillStar,
  AiOutlineSend,
  AiOutlineArrowDown,
  AiFillHeart,
  AiOutlineHeart,
} from "react-icons/ai";
import ClipLoader from "react-spinners/ClipLoader";
import { options } from "./selectOptions";
import {
  fetchMovie,
  fetchSeasons,
  getEpisodes,
  getAllActors,
  getVideo,
  sendBooking,
} from "./functions.js";
import "./Movie.css";
import { useUser } from "../../context/UserProvider.js";
import { handleFavorites } from "../Movies/functions.js";

function Movie() {
  const [selectedOption, setSelectedOption] = useState("");
  let { id, tvId } = useParams();
  let location = useLocation();
  const [movie, setMovie] = useState({});
  const [favorites, setFavorites] = useState([]);
  const favoriteMovies =
    JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  const [booking, setBooking] = useState({
    name: null,
    MovieName: null,
    email: null,
    location: null,
    MovieImage: null,
  });
  const [allActors, setAllActor] = useState([]);
  const [video, setVideo] = useState({});
  const [seasons, setSeasons] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [expandedOverview, setExpandedOverview] = useState({});
  const [scrollPosition, setScrollPosition] = useState(0);
  const episodesContainerRef = useRef(null);
  const [bookedMovie, setBookedMovie] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState("");
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const { user } = useUser();

  const toggleReadMore = (episodeId) => {
    setExpandedOverview((prevExpanded) => ({
      ...prevExpanded,
      [episodeId]: !prevExpanded[episodeId],
    }));
  };

  const handleBackgroundLoad = () => {
    setBackgroundLoaded(true);
  };

  useEffect(() => {
    fetchMovie(
      id,
      tvId,
      setMovie,
      setBooking,
      booking,
      location,
      setBookedMovie,
      setBookingLoading
    );
    fetchSeasons(tvId, setSeasons);
    getAllActors(id, tvId, setAllActor, location);
    getVideo(id, tvId, setVideo, location);
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    setFavorites(favoriteMovies !== null ? favoriteMovies : []);
  }, []);


  useEffect(() => {
    if (movie.backdrop_path) {
      const backgroundImage = new Image();
      backgroundImage.src = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
      backgroundImage.onload = () => {
        setBackgroundLoaded(true);
      };
    }
  }, [movie.backdrop_path]);

  return (
    <>
      {Object.keys(movie).length === 0 || !backgroundLoaded ? (
        <div className="centerLoadingMovie">
          <ClipLoader color="var(--fourth-color)" size={150} />
        </div>
      ) : (
        <div
          className="movieContainer"
          style={{
            backgroundImage: movie.backdrop_path
              ? `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`
              : "none",
          }}
        >
          <div className="movieCardOneMovie">
            <img
              className="moreInformationImage"
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : poster
              }
              alt={movie.title || "Poster"}
            />
            <div
              className="heartContainerOneMovie"
              onClick={() =>
                handleFavorites(movie, favorites, setFavorites, user)
              }
            >
              {favorites.some((favorite) => favorite.id === movie.id) ? (
                <AiFillHeart size={50} color="var(--fourth-color)" />
              ) : (
                <AiOutlineHeart size={50} color="var(--main-color)" />
              )}
            </div>
          </div>
          <div className="movieInformationContainer">
            <div className="movieInformation">
              <h1>{movie.title || movie.name || "Title not available"}</h1>
              {movie.original_title !== movie.title &&
                movie.original_name !== movie.name && (
                  <h2>{movie.original_title || movie.original_name}</h2>
                )}
              <div className="movieSubData">
                <div className="movieSubDataLeft">
                  <AiFillStar color="yellow" />
                  {movie.vote_average || "N/A"}
                </div>
                <div className="movieSubDataRight">
                  {movie.release_date || movie.first_air_date || "Unknown"}
                  {movie.runtime || movie.episode_run_time?.length > 0
                    ? ` / ${movie.runtime || movie.episode_run_time} min`
                    : ""}
                </div>
              </div>
              <div className="movieGenresContainer">
                <h2>The Genres</h2>
                <div className="movieGenres">
                  {Array.isArray(movie.genres) && movie.genres.length > 0 ? (
                    movie.genres.map((genre, index) => (
                      <p key={genre.id} className="movieGenres">
                        {genre.name}
                        {index < movie.genres.length - 1 ? ", " : ""}
                      </p>
                    ))
                  ) : (
                    <p>No genres available</p>
                  )}
                </div>
              </div>
              <div className="movieOverViewContainer">
                <h2>The Synopsis</h2>
                <div className="movieOverView">
                  <p>{movie.overview || "No synopsis available"}</p>
                </div>
              </div>

              <div className="actorsContainer">
                <h2>Actors</h2>
                <div className="actorsList">
                  {Array.isArray(allActors) && allActors.length > 0 ? (
                    allActors.slice(0, 15).map((actor, index) => (
                      <span key={actor.id}>
                        <Link to={`/actor/${actor.id}`}>{actor.name}</Link>
                        {index < allActors.slice(0, 15).length - 1 && ", "}
                      </span>
                    ))
                  ) : (
                    <p>No actors available</p>
                  )}
                </div>
              </div>
            </div>

            {movie.original_name && (
              <div className="seasonEpisodeContainer">
                <h2>Seasons</h2>
                {Array.isArray(seasons) && seasons.length > 0 ? (
                  <>
                    <div className="seasonsContainer">
                      {seasons.map((season) =>
                        season.name ? (
                          <button
                            key={season.season_number}
                            className={`seasonButton ${
                              selectedSeason === season.season_number
                                ? "selected"
                                : ""
                            }`}
                            onClick={() =>
                              getEpisodes(
                                tvId,
                                season.season_number,
                                episodesContainerRef,
                                setEpisodes,
                                setSelectedSeason
                              )
                            }
                          >
                            <p>{season.name}</p>
                          </button>
                        ) : (
                          <div key={season.season_number}>
                            <p className="noSeason">No seasons available</p>
                          </div>
                        )
                      )}
                    </div>
                  </>
                ) : (
                  <p className="noSeason">No seasons available</p>
                )}

                {Array.isArray(seasons) && seasons.length > 0 && (
                  <div
                    className="episodesContainer"
                    ref={episodesContainerRef}
                    onScroll={(e) => setScrollPosition(e.target.scrollLeft)}
                    style={{ scrollLeft: scrollPosition }}
                  >
                    {Array.isArray(episodes) &&
                      episodes.map((episode) => (
                        <div key={episode.id} className="episodeCard">
                          <div className="episodeTextContainer">
                            <p className="episodeText">
                              EP {episode.episode_number}
                            </p>
                            <p className="episodeText">
                              {episode.name || "Untitled"}
                            </p>
                            <div className="episodeInfo">
                              <p className="episodeText rating">
                                {episode.vote_average || "N/A"}
                                <AiFillStar color="yellow" />
                              </p>
                              <p className="episodeText releaseDate">
                                {episode.air_date || "Unknown"}
                                {episode.runtime && (
                                  <>
                                    <span>/</span>
                                    <span className="runTime">
                                      {episode.runtime}min
                                    </span>
                                  </>
                                )}
                              </p>
                            </div>
                            <p
                              className={`episodeText episodeOverview ${
                                expandedOverview[episode.id]
                                  ? "expandedOverview"
                                  : ""
                              }`}
                            >
                              {episode.overview || "No overview available"}
                            </p>
                            {episode.overview?.length > 50 && (
                              <button
                                className="readMoreButton"
                                onClick={() => toggleReadMore(episode.id)}
                              >
                                {expandedOverview[episode.id]
                                  ? "Read Less"
                                  : "Read More"}
                              </button>
                            )}
                          </div>
                          <img
                            className="episodeImage"
                            src={
                              episode.still_path
                                ? `https://image.tmdb.org/t/p/w500/${episode.still_path}`
                                : noImageHolder
                            }
                            alt={episode.title || "Episode"}
                          />
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}

            <div className="youtubeVideoContainer">
              {video && (
                <YouTube videoId={video.key} className="youtubeVideo" />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Movie;
