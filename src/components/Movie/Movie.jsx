import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import YouTube from "react-youtube"; //import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Movie() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  let { id } = useParams();
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
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${process.env.REACT_APP_APIKEY}`
    );
    const movie = await response.json();
    setMovie(movie);
    setBooking({
      ...booking,
      MovieName: movie.original_title,
    });
  }

  async function getAllActors() {
    const res = await axios(
      `https://api.themoviedb.org/3/movie/${id}/casts?api_key=${process.env.REACT_APP_APIKEY}`
    );
    setAllActor(res.data.cast);
  }

  async function getVideo() {
    const res = await axios(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_APIKEY}`
    );

    setVideo(res.data.results[0]);
  }

  useEffect(() => {
    fetchMovie();
    getAllActors();
    getVideo();
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
    <>
      {Array.isArray(movie.genres) &&
        movie.genres.map((movie, i) => {
          return <h1 key={i}>{movie.name}</h1>;
        })}
      <div>
        {Array.isArray(movie.genres) &&
          movie.production_companies.map((movie, i) => {
            return (
              <React.Fragment key={i}>
                <h1>{movie.name}</h1>
                <h1>{movie.origin_country}</h1>
              </React.Fragment>
            );
          })}
      </div>
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
      </div>
      {Array.isArray(allActors) &&
        allActors.map((actor) => {
          return (
            <Link to={`/actor/${actor.id}`}>
              <p>{actor.name}</p>
            </Link>
          );
        })}
      <YouTube videoId={`${video.key}`} opts={youtubeOpts} />;
    </>
  );
}

export default Movie;
