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
    <div class="topnav">
      <div class="left">
        <img className="mainlogo" src={logo} alt="DBFM Logo" />
        <Link to="/DBFM"> Home</Link>
        <Link to="/Popular"> Popular</Link>
        <Link to="/Popular"> About</Link>
      </div>
      <div class="right">
        <form>
          <div class="search-container">
            <input
              type="text"
              placeholder="Search.."
              onChange={(e) => setSearchWord(e.target.value)}
            />
            <button onClick={(e) => searchMovies(e)} class="search-icon">
              <BiSearch />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Navbar;
