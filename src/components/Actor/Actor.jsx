import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

function Actor() {
  const [actor, setActor] = useState({});
  const { actorId } = useParams();
  async function getActor() {
    const res = await axios(
      `https://api.themoviedb.org/3/person/${actorId}?api_key=${process.env.REACT_APP_APIKEY}`
    );
    setActor(res.data);
  }

  useEffect(() => {
    getActor();
  });
  return (
    <>
      <h1>{actor.name}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
        alt={actor.name}
      />
    </>
  );
}

export default Actor;
