import React, { useEffect, useRef, useState } from "react";
import { useNavigate, NavLink, Link, useLocation } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import axios from "axios";
import Hamburger from "hamburger-react";
import "./Navbar.css";
import logo from "../../images/DATABASEFORMOVIES-logos_white.png";
import pinkRedLogo from "../../images/DATABASEFORMOVIES-logos_pink-red.png";
import { useUser } from "../../context/UserProvider";

function Navbar({ genres }) {
  const { user, logout } = useUser();
  const [searchWord, setSearchWord] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [toggle, setToggle] = useState(false);
  const navbarRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

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
        <Hamburger toggled={toggle} toggle={() => setToggle(!toggle)} />
      </div>
      <aside ref={navbarRef} className="sideBar">
        <Link to="/">
          <img
            className="mainLogo"
            src={isHomePage ? pinkRedLogo : logo}
            alt="DBFM Logo"
          />
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
              maxLength={500}
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
          {user && <h4 className="userName">{user.userName}</h4>}
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
