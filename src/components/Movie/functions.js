import axios from "axios";

export async function fetchMovie(
  id,
  tvId,
  setMovie,
  setBooking,
  booking,
  location
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
    MovieName: res.data.original_title,
  });
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

export function sendBooking(e, booking, setSelectedOption) {
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
