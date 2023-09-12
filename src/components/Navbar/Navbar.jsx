import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import logo from "../../images/DATABASEFORMOVIES-logos_white.png";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const [searchWord, setSearchWord] = useState();
  const [genres, setGenres] = useState([]);
  let navigate = useNavigate();
  function searchMovies(e) {
    e.preventDefault();
    navigate(`/search/${searchWord}`);
  }

  async function getGenres() {
    const res = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${process.env.REACT_APP_APIKEY}`
    );
    setGenres(res.data.genres);
  }

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <div className="topnav">
      <div className="left">
        <img className="mainlogo" src={logo} alt="DBFM Logo" />
        <Link to="/"> Home</Link>
        <Link to="/favorites"> Favorites</Link>
        {Array.isArray(genres) &&
          genres.map((genre, i) => {
            return (
              <Link to={`/genres/${genre.id}`} key={i}>
                {genre.name}
              </Link>
            );
          })}
        {/* <Link to="/genres/28"> Action</Link>
        <Link to="/genres/12"> Adventure</Link> */}
      </div>
      <div className="right">
        <form>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search.."
              onChange={(e) => setSearchWord(e.target.value)}
            />
            <button onClick={(e) => searchMovies(e)} className="search-icon">
              <BiSearch />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Navbar;
