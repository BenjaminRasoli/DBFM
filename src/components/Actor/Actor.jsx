import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./Actor.css";
import { Link } from "react-router-dom";
import personPoster from "../../images/personPlaceHolder.jpg";
import poster from "../../images/poster-image.png";
import { getActor, checkInfo, movieSeriesUrl, truncateText } from "./functions";
import ClipLoader from "react-spinners/ClipLoader";

function Actor() {
  const [actor, setActor] = useState({});
  const [showFullBiography, setShowFullBiography] = useState(false);
  const [movieCredits, setMovieCredits] = useState([]);
  const { actorId } = useParams();

  useEffect(() => {
    getActor(setActor, setMovieCredits, actorId);
  }, [actorId]);
  return (
    <>
      {Object.keys(actor).length === 0 ? (
        <div className="centerLoadingMovie">
          <ClipLoader color="var(--fourth-color)" size={150} />
        </div>
      ) : (
        <div className="actorContainer">
          <div className="actorImageContainer">
            <img
              className="actorImage"
              src={
                actor.profile_path === null
                  ? personPoster
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

            {actor.biography && actor.biography.length > 10 * 80 && (
              <button
                className="readButton"
                onClick={() => setShowFullBiography(!showFullBiography)}
              >
                {showFullBiography ? "Read Less" : "Read More"}
              </button>
            )}
            <div className="actorMovies">
              {movieCredits.slice(0, 10).map((movie) => (
                <Link key={movie.id} to={movieSeriesUrl(movie)}>
                  <div>
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
      )}
    </>
  );
}

export default Actor;
