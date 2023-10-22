import axios from "axios";
import { toast } from "react-toastify";

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
    MovieName: res.data.original_title || res.data.original_name,
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

export async function sendBooking(
  e,
  booking,
  setSelectedOption,
  selectedOption,
  setBooking
) {
  e.preventDefault();

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(booking.email)) {
    toast.error("You have entered an invalid email address");
  } else if (!/^[A-Za-z]+$/.test(booking.name) || booking.name === "") {
    toast.error("You have entered an invalid name");
  } else if (selectedOption === "") {
    toast.error("Please choose a locaiton");
  } else {
    await toast.promise(
      axios.post(
        `${
          process.env.REACT_APP_SERVER_URL || "http://localhost:3003"
        }/bookings`,
        booking
      ),
      {
        pending: "Promise is pending",
        success: "Promise resolved 👌",
        error: "Promise rejected 🤯",
      }
    );

    e.target.reset();
    setSelectedOption([]);
    setBooking({ name: null, MovieName: null, email: null, location: null });
    // await axios.post(
    //   `${"http://localhost:3003" || process.env.REACT_APP_SERVER_URL}/sendEmail`,
    //   booking
    // );
  }
}
