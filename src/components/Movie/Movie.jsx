import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import "./Movie.css";
import axios from "axios";
import Select from "react-select";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import YouTube from "react-youtube"; //import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import poster from "../../images/poster-image.png";
import { AiFillStar } from "react-icons/ai";
import { IconContext } from "react-icons";

function Movie() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  let { id, tvId, genreId } = useParams();
  let location = useLocation();

  const [movie, setMovie] = useState({});
  const [booking, setBooking] = useState({
    name: null,
    MovieName: null,
    email: null,
    location: null,
  });
  const [allActors, setAllActor] = useState([]);
  const [video, setVideo] = useState({});

  async function fetchMovie() {
    const url =
      location.pathname === `/movie/${id}`
        ? `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${process.env.REACT_APP_APIKEY}`
        : `https://api.themoviedb.org/3/tv/${tvId}?language=en-US&api_key=${process.env.REACT_APP_APIKEY}`;
    window.scrollTo(0, 0);

    const response = await fetch(url);
    const movie = await response.json();
    setMovie(movie);
    setBooking({
      ...booking,
      MovieName: movie.original_title,
    });
  }

  async function getAllActors() {
    const url =
      location.pathname === `/movie/${id}`
        ? `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_APIKEY}`
        : `https://api.themoviedb.org/3/tv/${tvId}/credits?api_key=${process.env.REACT_APP_APIKEY}`;
    const res = await axios(url);
    setAllActor(res.data.cast);
  }

  async function getVideo() {
    const url =
      location.pathname === `/movie/${id}`
        ? `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_APIKEY}`
        : `https://api.themoviedb.org/3/tv/${tvId}/videos?api_key=${process.env.REACT_APP_APIKEY}`;

    const res = await axios(url);

    setVideo(res.data.results[0]);
  }

  useEffect(() => {
    fetchMovie();
    getAllActors();
    getVideo();
    window.scroll(0, 0);
  }, []);

  function sendBooking(e) {
    e.preventDefault();

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(booking.email)) {
      alert("You have entered an invalid email address!");
    } else if (!/^[A-Za-z]+$/.test(booking.name)) {
      alert("You have entered an invalid name !");
    } else {
      axios.post("http://localhost:3003/bookings", booking);
      e.target.reset();
      setSelectedOption([]);
      axios.post("http://localhost:3003/sendEmail", booking);
    }
  }

  const youtubeOpts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
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
              <IconContext.Provider value={{ color: "yellow" }}>
                <AiFillStar />
              </IconContext.Provider>
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
          {/* <div>
              {Array.isArray(movie.genres) &&
                movie.production_companies.map((movie, i) => {
                  return (
                    <React.Fragment key={i}>
                      <h1>{movie.name}</h1>

                      <h1>{movie.origin_country}</h1>
                    </React.Fragment>
                  );
                })}
            </div> */}
          <div className="actorsContainer">
            <h3> Actors</h3>
            {/* <div className="actorNames"> */}
            {Array.isArray(allActors) &&
              allActors.slice(0, 10).map((actor) => {
                return (
                  <Link to={`/actor/${actor.id}`}>
                    <p>{actor.name}</p>
                  </Link>
                );
              })}
            {/* </div> */}
          </div>
        </div>
        {/* 
        <div>
          <Accordion className="test">
            <AccordionSummary
              // expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form onSubmit={(e) => sendBooking(e)}>
                <input
                  type="text"
                  onChange={(e) =>
                    setBooking({ ...booking, name: e.target.value })
                  }
                />

                <input
                  type="text"
                  onChange={(e) =>
                    setBooking({ ...booking, email: e.target.value })
                  }
                />

                <button>submit</button>
              </form>
              <Select
                value={selectedOption}
                onChange={(selectedOption) => {
                  setSelectedOption(selectedOption);
                  setBooking({
                    ...booking,
                    location: selectedOption ? selectedOption.value : null,
                  });
                }}
                options={options}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: "red",
                    backgroundColor: "green",
                  }),
                }}
              />
            </AccordionDetails>
            
          </Accordion>
        </div> */}

        {/* {video && <YouTube videoId={`${video.key}`} opts={youtubeOpts} />} */}
      </div>
    </div>
  );
}

export default Movie;
