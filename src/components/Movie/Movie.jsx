import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Select from "react-select";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import YouTube from "react-youtube";
import poster from "../../images/poster-image.png";
import noImageHolder from "../../images/noImageHolder.jpg";

import { AiFillStar, AiOutlineSend, AiOutlineArrowDown } from "react-icons/ai";
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

function Movie() {
  const [selectedOption, setSelectedOption] = useState("");
  let { id, tvId } = useParams();
  let location = useLocation();
  const [movie, setMovie] = useState({});
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

  const toggleReadMore = (episodeId) => {
    setExpandedOverview((prevExpanded) => ({
      ...prevExpanded,
      [episodeId]: !prevExpanded[episodeId],
    }));
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

  return (
    <>
      {Object.keys(movie).length === 0 ? (
        <div className="centerLoadingMovie">
          <ClipLoader color="var(--fourth-color)" size={150} />
        </div>
      ) : (
        <div className="movieContainer">
          <img
            className="moreInformationImage"
            src={
              movie.poster_path === null
                ? poster
                : "https://image.tmdb.org/t/p/w500/" + movie.poster_path
            }
            alt={movie.title}
          />
          <div className="movieInformationContainer">
            <div className="movieInformation">
              {movie.title === movie.original_title &&
              movie.name === movie.original_name ? (
                <h1>{movie.original_title || movie.original_name}</h1>
              ) : (
                <>
                  <h1>{movie.title || movie.name}</h1>
                  <h1>{movie.original_title || movie.original_name}</h1>
                </>
              )}

              <div className="movieSubData">
                <div className="movieSubDataLeft">
                  <AiFillStar color="yellow" />
                  {movie.vote_average}
                </div>
                <div className="movieSubDataRight">
                  {movie.release_date || movie.first_air_date}
                  {movie.runtime || movie.episode_run_time?.length > 0
                    ? `/${movie.runtime || movie.episode_run_time}min`
                    : ""}
                </div>
              </div>
              <div className="movieGenresContainer">
                <h2> The Genres</h2>
                <div className="movieGenres">
                  {Array.isArray(movie.genres) &&
                    movie.genres.map((genre, index) => {
                      return (
                        <h3 className="movieGenres" key={genre.id}>
                          {genre.name}
                          {index < movie.genres.length - 1 ? ", " : ""}
                        </h3>
                      );
                    })}
                </div>
              </div>
              <div className="movieOverViewContainer">
                <h3> The Synopsis</h3>
                <div className="movieOverView">
                  <p>{movie.overview}</p>
                </div>
              </div>

              <div className="actorsContainer">
                <h3> Actors</h3>
                {Array.isArray(allActors) &&
                  allActors.slice(0, 10).map((actor, i) => {
                    return (
                      <Link key={i} to={`/actor/${actor.id}`}>
                        <p>{actor.name}</p>
                      </Link>
                    );
                  })}
              </div>
            </div>

            <div className="seasonEpisodeContainer">
              {movie.original_name ? (
                <>
                  <h3>Seasons</h3>
                  <div className="seasonsContainer">
                    {seasons.map((season) => (
                      <button
                        key={season.season_number}
                        className="seasonButton"
                        onClick={() => {
                          getEpisodes(
                            tvId,
                            season.season_number,
                            episodesContainerRef,
                            setEpisodes
                          );
                        }}
                      >
                        <p>{season.name}</p>
                      </button>
                    ))}
                  </div>

                  <div
                    className="episodesContainer"
                    ref={episodesContainerRef}
                    onScroll={(e) => setScrollPosition(e.target.scrollLeft)}
                    style={{ scrollLeft: scrollPosition }}
                  >
                    {episodes.map((episode) => (
                      <div key={episode.id} className="episodeCard">
                        <div className="episodeTextContainer">
                          <p className="episodeText">
                            EP {episode.episode_number}
                          </p>
                          <p className="episodeText">{episode.name}</p>

                          <div className="episodeInfo">
                            <p className="episodeText rating">
                              {episode.vote_average}
                              <AiFillStar color="yellow" />
                            </p>
                            <div className="releaseTimeContainer">
                              <p className="episodeText releaseDate">
                                {episode.air_date}
                                {episode.runtime && (
                                  <>
                                    <span>/</span>
                                    <span className="episodeText runTime">
                                      {episode.runtime}min
                                    </span>
                                  </>
                                )}
                              </p>
                            </div>
                          </div>
                          <p
                            className={`episodeText episodeOverview ${
                              expandedOverview[episode.id]
                                ? "expandedOverview"
                                : ""
                            }`}
                          >
                            {episode.overview}
                          </p>
                          {episode.overview.length > 50 && (
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
                            episode.still_path === null
                              ? noImageHolder
                              : "https://image.tmdb.org/t/p/w500/" +
                                episode.still_path
                          }
                          alt={episode.title}
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : bookedMovie ? (
                <h1>Movie Booked</h1>
              ) : bookingLoading ? (
                <span class="loader"></span>
              ) : (
                <Accordion className="bookingFormContainer">
                  <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Book a Ticket</Typography>

                    <div className="bookingFormArrow">
                      <AiOutlineArrowDown size={20} />
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <form
                      onSubmit={(e) =>
                        sendBooking(
                          e,
                          booking,
                          setSelectedOption,
                          selectedOption,
                          setBooking
                        )
                      }
                    >
                      <input
                        type="text"
                        placeholder="Name"
                        onChange={(e) =>
                          setBooking({ ...booking, name: e.target.value })
                        }
                      />

                      <input
                        type="text"
                        placeholder="Email"
                        onChange={(e) =>
                          setBooking({ ...booking, email: e.target.value })
                        }
                      />
                      <Select
                        className="bookingLocation"
                        value={selectedOption}
                        onChange={(selectedOption) => {
                          setSelectedOption(selectedOption);
                          setBooking({
                            ...booking,
                            location: selectedOption
                              ? selectedOption.value
                              : null,
                          });
                        }}
                        options={options}
                        styles={{
                          control: (baseStyles) => ({
                            ...baseStyles,
                          }),
                        }}
                      />
                      <button id="sendFormButton">
                        <AiOutlineSend size={20} />
                      </button>
                    </form>
                  </AccordionDetails>
                </Accordion>
              )}
            </div>
            <div>
              <div className="youtubeVideoContainer">
                {video && (
                  <YouTube videoId={`${video.key}`} className="youtubeVideo" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Movie;
