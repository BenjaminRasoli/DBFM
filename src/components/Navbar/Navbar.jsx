import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import logo from "../../images/DATABASEFORMOVIES-logos_white.png";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";

function Navbar() {
  const [searchWord, setSearchWord] = useState();
  let navigate = useNavigate();
  function searchMovies(e) {
    e.preventDefault();
    navigate(`/search/${searchWord}`);
  }

  return (
    <div className="topnav">
      <div className="left">
        <img className="mainlogo" src={logo} alt="DBFM Logo" />
        <Link to="/"> Home</Link>
        <Link to="/Popular"> Popular</Link>
        <Link to="/favorites"> Favorites</Link>
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
