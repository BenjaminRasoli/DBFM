import React, { useEffect, useRef, useState } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { toast } from "react-toastify";
import axios from "axios";
import Hamburger from "hamburger-react";
import "./Navbar.css";
import logo from "../../images/DATABASEFORMOVIES-logos_white.png";
import { useUser } from "../../context/UserProvider";

function Navbar() {
  const { user, logout } = useUser();
  const [searchWord, setSearchWord] = useState("");
  const [genres, setGenres] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [toggle, setToggle] = useState(false);
  const navbarRef = useRef(null);

  let navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(e.target) &&
        !e.target.closest(".navBarButton") &&
        !e.target.closest("#sideBar")
      ) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setToggle]);

  function searchMovies(e) {
    e.preventDefault();
    const trimmedSearchWord = searchWord.trim();
    setSearchWord("");
    navigate({
      pathname: "/search",
      search: `query=${trimmedSearchWord}`,
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

  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [toggle]);

  return (
    <>
      <div className="navBarButton">
        <Hamburger
          color="var(--second-color)"
          toggled={toggle}
          toggle={() => setToggle(!toggle)}
        />
      </div>
      <aside ref={navbarRef} className="sideBar">
        <Link to="/">
          <img className="mainLogo" src={logo} alt="DBFM Logo" />
        </Link>
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
      <div className="searchContainerWithHamburger">
        <form id="search" className="searchContainer">
          <div
            className="searchBox"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
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
          {!user ? (
            <Link to="/login" className="loginLink">
              Login
            </Link>
          ) : (
            <button className="logoutButton" onClick={logout}>
              Logout
            </button>
          )}
        </form>
      </div>
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
    </>
  );
}

export default Navbar;
