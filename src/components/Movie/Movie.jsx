import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Select from "react-select";

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

  useEffect(() => {
    fetchMovie();
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
    }
  }

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
      <form onSubmit={(e) => sendBooking(e)}>
        <input
          type="text"
          onChange={(e) => setBooking({ ...booking, name: e.target.value })}
        />

        <input
          type="text"
          onChange={(e) => setBooking({ ...booking, email: e.target.value })}
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
    </>
  );
}

export default Movie;
