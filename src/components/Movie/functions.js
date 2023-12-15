import axios from "axios";
import { toast } from "react-toastify";

export async function fetchMovie(
  id,
  tvId,
  setMovie,
  setBooking,
  booking,
  location,
  setBookedMovie,
  setBookingLoading
) {
  const url =
    location.pathname === `/movie/${id}`
      ? `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${process.env.REACT_APP_APIKEY}`
      : `https://api.themoviedb.org/3/tv/${tvId}?language=en-US&api_key=${process.env.REACT_APP_APIKEY}`;
  window.scrollTo(0, 0);

  const res = await axios(url);
  setMovie(res.data);
  setBooking({
    ...booking,
    MovieName: res.data.original_title || res.data.original_name,
    MovieImage: "https://image.tmdb.org/t/p/w500/" + res.data.poster_path,
  });
  const bookings = await axios("https://dbfm.onrender.com/bookings");
  const booked = bookings.data.some(
    (booking) => booking.MovieName === res.data.original_title
  );

  setBookedMovie(booked);
  setBookingLoading(false);
}

export async function fetchSeasons(tvId, setSeasons) {
  const url = `https://api.themoviedb.org/3/tv/${tvId}?&api_key=${process.env.REACT_APP_APIKEY}`;

  const response = await fetch(url);
  const allSeasons = await response.json();
  setSeasons(allSeasons.seasons);
}

export async function getEpisodes(
  tvId,
  seasonNumber,
  episodesContainerRef,
  setEpisodes
) {
  const url = `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?&api_key=${process.env.REACT_APP_APIKEY}`;
  const response = await fetch(url);
  const allEpisodes = await response.json();
  episodesContainerRef.current.scrollLeft = 0;
  setEpisodes(allEpisodes.episodes);
}

export async function getAllActors(id, tvId, setAllActor, location) {
  const url =
    location.pathname === `/movie/${id}`
      ? `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_APIKEY}`
      : `https://api.themoviedb.org/3/tv/${tvId}/credits?api_key=${process.env.REACT_APP_APIKEY}`;
  const res = await axios(url);
  setAllActor(res.data.cast);
}

export async function getVideo(id, tvId, setVideo, location) {
  const url =
    location.pathname === `/movie/${id}`
      ? `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_APIKEY}`
      : `https://api.themoviedb.org/3/tv/${tvId}/videos?api_key=${process.env.REACT_APP_APIKEY}`;

  const res = await axios(url);

  setVideo(res.data.results[0]);
}

export async function sendBooking(
  e,
  booking,
  setSelectedOption,
  selectedOption,
  setBooking
) {
  e.preventDefault();

  if (!/^[A-Öa-ö]+$/.test(booking.name) || booking.name === null) {
    toast.error("You have entered an invalid name");
  } else if (
    !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(booking.email)
  ) {
    toast.error("You have entered an invalid email address");
  } else if (selectedOption === "") {
    toast.error("Please choose a location");
  } else {
    setSelectedOption([]);
    setBooking({
      ...booking,
      name: null,
      email: null,
      location: null,
    });
    e.target.reset();
    await toast.promise(
      axios.post(
        `${
          process.env.REACT_APP_SERVER_URL || "http://localhost:3003"
        }/bookings`,
        booking
      ),

      {
        pending: "Booking is pending",
        success: "Booking sent 👌",
        error: "Booking failed 🤯",
      }
    );
    document.getElementById("sendFormButton").disabled = true;
  }
  document.getElementById("sendFormButton").disabled = false;
}
