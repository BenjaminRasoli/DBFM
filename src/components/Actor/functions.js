import axios from "axios";

export async function getActor(setActor, setMovieCredits, actorId) {
  const res = await axios(
    `https://api.themoviedb.org/3/person/${actorId}?api_key=${process.env.REACT_APP_APIKEY}`
  );
  setActor(res.data);

  const movieCreditsRes = await axios(
    `https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=${process.env.REACT_APP_APIKEY}`
  );

  const filterVote = movieCreditsRes.data.cast.sort((a, b) => {
    return b.vote_average - a.vote_average;
  });
  setMovieCredits(filterVote);
}

export const truncateText = (text, maxRows) => {
  if (!text) return "";
  const maxChars = maxRows * 80;
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars)}...`;
};
export const movieSeriesUrl = (movie) => {
  if (movie.media_type === "movie") {
    return `/movie/${movie.id}`;
  } else if (movie.media_type === "tv") {
    return `/tv/${movie.id}`;
  }
};

export const checkInfo = (actorInfo) => {
  if (actorInfo) {
    return actorInfo;
  } else {
    return "Not Available";
  }
};
