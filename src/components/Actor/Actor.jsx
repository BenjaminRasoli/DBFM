import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import "./Actor.css";
import { Link } from "react-router-dom";
import poster from "../../images/poster-image.png";
import { MdReadMore } from "react-icons/md";

function Actor() {
  const [actor, setActor] = useState({});
  const [showFullBiography, setShowFullBiography] = useState(false);
  const [movieCredits, setMovieCredits] = useState([]);
  const { actorId } = useParams();
  async function getActor() {
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

  const truncateText = (text, maxRows) => {
    if (!text) return ""; // Handle undefined or empty text
    const maxChars = maxRows * 80;
    if (text.length <= maxChars) return text;
    return `${text.slice(0, maxChars)}...`;
  };
  const movieSeriesUrl = (movie) => {
    if (movie.media_type === "movie") {
      return `/movie/${movie.id}`;
    } else if (movie.media_type === "tv") {
      return `/tv/${movie.id}`;
    }
  };

  const handleReadMore = () => {
    setShowFullBiography(true);
  };

  const handleReadLess = () => {
    setShowFullBiography(false);
  };

  const checkInfo = (actorInfo) => {
    if (actorInfo) {
      return actorInfo;
    } else {
      return "Not Available";
    }
  };
  useEffect(() => {
    getActor();
  }, [actorId]);
  return (
    <>
      <div className="actorContainer">
        <div className="actorImageContainer">
          <img
            className="actorImage"
            src={
              actor.profile_path === null
                ? poster
                : `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
            }
            alt={actor.name}
          />

          <div className="actorInformation">
            <strong>Known for</strong>
            <p>{checkInfo(actor.known_for_department)}</p>
            <strong>Birthday</strong>
            <p>{checkInfo(actor.birthday)} </p>
            {actor.deathday && (
              <>
                <strong>Death day</strong>
                <p>{actor.deathday}</p>
              </>
            )}
            <strong>Place of birth</strong>
            <p>{checkInfo(actor.place_of_birth)}</p>
            <strong>Popularity</strong>

            <p>{checkInfo(actor.popularity)}</p>
          </div>
        </div>
        <div className="besideActorImage">
          <h1>{checkInfo(actor.name)}</h1>
          <h3>Biography</h3>

          <div className="truncatedBiography">
            {actor.biography
              ? showFullBiography
                ? actor.biography
                : truncateText(actor.biography, 10)
              : "No biography avaible for this actor"}
          </div>

          {actor.biography &&
            actor.biography.length > 10 * 80 &&
            (showFullBiography ? (
              <button onClick={handleReadLess}>Read Less</button>
            ) : (
              <button onClick={handleReadMore}>Read More</button>
            ))}
          <div className="actorMovies">
            {movieCredits.slice(0, 10).map((movie) => (
              <Link to={movieSeriesUrl(movie)}>
                <div key={movie.id}>
                  <img
                    src={
                      movie.poster_path === null
                        ? poster
                        : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    }
                    alt={actor.name}
                  />
                  <div className="actorMoviesTitle">
                    <p>{movie.title || movie.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Actor;
