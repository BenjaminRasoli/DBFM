import React, { useEffect, useState } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import axios from "axios";
import Hamburger from "hamburger-react";
import "./Navbar.css";
import logo from "../../images/DATABASEFORMOVIES-logos_white.png";

function Navbar() {
  const [searchWord, setSearchWord] = useState("");
  const [genres, setGenres] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [toggle, setToggle] = useState(false);
  let navigate = useNavigate();
  function searchMovies(e) {
    e.preventDefault();
    setSearchWord("");
    setToggle(false);
    navigate({
      pathname: "/search",
      search: `query=${searchWord}`,
    });
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
    <>
      <Link to="/">
        <img className="mainLogo" src={logo} alt="DBFM Logo" />
      </Link>
      <aside className="sideBar">
        <nav className="navbar">
          <ul>
            <li>
              <NavLink className="sideBarText" to="/favorites">
                Favorites
              </NavLink>
            </li>
            {Array.isArray(genres) &&
              genres.map((genre, i) => {
                return (
                  <li key={i}>
                    <NavLink
                      to={`/genres/${genre.id}`}
                      className={({ isActive }) =>
                        isActive ? " active sideBarText " : "sideBarText"
                      }
                    >
                      {genre.name}
                    </NavLink>
                  </li>
                );
              })}
          </ul>
        </nav>
      </aside>

      <form
        id="search"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="searchContainer">
          <div className="searchBox">
            <input
              className="searchText"
              type="text"
              placeholder="Search.."
              onChange={(e) => setSearchWord(e.target.value)}
              value={searchWord}
              disabled={!isHovered}
            />
            <button
              onClick={(e) => searchMovies(e)}
              className="searchIcon"
              disabled={!searchWord}
            >
              <BiSearch size={30} color="var(--main-color)" />
            </button>
          </div>
        </div>
      </form>

      <nav id="sideBar" className={toggle ? "active" : ""}>
        <div className="navbar">
          <ul onClick={() => setToggle(false)}>
            <li>
              <NavLink className="sideBarText" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="sideBarText" to="/favorites">
                Favorites
              </NavLink>
            </li>
            {Array.isArray(genres) &&
              genres.map((genre, i) => {
                return (
                  <li key={i}>
                    <NavLink
                      to={`/genres/${genre.id}`}
                      className={({ isActive }) =>
                        isActive ? " active sideBarText " : "sideBarText"
                      }
                    >
                      {genre.name}
                    </NavLink>
                  </li>
                );
              })}
          </ul>
        </div>
      </nav>
      <button className="navBarButton">
        <Hamburger
          color="var(--second-color)"
          toggled={toggle}
          toggle={setToggle}
        />
      </button>
    </>
  );
}

export default Navbar;
