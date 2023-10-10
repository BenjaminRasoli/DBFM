import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { IconContext } from "react-icons";
import logo from "../../images/DATABASEFORMOVIES-logos_white.png";
import axios from "axios";
import Hamburger from "hamburger-react";
import "./Navbar.css";

function Navbar() {
  const [searchWord, setSearchWord] = useState("");
  const [genres, setGenres] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  let navigate = useNavigate();
  function searchMovies(e) {
    e.preventDefault();
    setSearchWord("");
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

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <>
      <aside class="sidebar">
        <nav class="nav">
          <ul>
            <li>
              <NavLink className="sideBarText" to="/">
                Home
              </NavLink>
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

      <IconContext.Provider
        value={{ color: "var(--main-color)", size: "30px" }}
      >
        <form
          id="search"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="search-container">
            <div class="search-box">
              <input
                className="search-text"
                type="text"
                placeholder="Search.."
                onChange={(e) => setSearchWord(e.target.value)}
                value={searchWord}
                disabled={!isHovered}
              />
              <button
                class="search-btn"
                onClick={(e) => searchMovies(e)}
                className="search-icon"
                disabled={!searchWord}
              >
                <BiSearch  />
              </button>
            </div>
          </div>
        </form>
      </IconContext.Provider>

      <div id="sidebar" className={toggle && "active"}>
        <nav class="nav">
          <ul>
            <li>
              <NavLink className="sideBarText" to="/">
                Home
              </NavLink>
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
      </div>
      <button class="navBarButton">
        <IconContext.Provider>
          <Hamburger
            color="var(--second-color)"
            toggled={toggle}
            toggle={setToggle}
          />
        </IconContext.Provider>
      </button>
    </>
  );
}

export default Navbar;
