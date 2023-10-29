import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Select from "react-select";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import YouTube from "react-youtube";
import poster from "../../images/poster-image.png";
import { AiFillStar, AiOutlineSend, AiOutlineArrowDown } from "react-icons/ai";
import ClipLoader from "react-spinners/ClipLoader";
import { options } from "./selectOptions";
import {
  fetchMovie,
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

  useEffect(() => {
    fetchMovie(id, tvId, setMovie, setBooking, booking, location);
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
              <h1>{movie.original_title || movie.original_name}</h1>
              <div className="movieSubData">
                <div className="movieSubDataLeft">
                  <AiFillStar color="yellow" />
                  {movie.vote_average}
                </div>
                <div className="movieSubDataRight">
                  {movie.release_date || movie.first_air_date} /
                  {movie.runtime || movie.episode_run_time}MIN
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

            <div>
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
            </div>
            <div>
              {video && (
                <YouTube videoId={`${video.key}`} className="youtubeVideo" />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Movie;
