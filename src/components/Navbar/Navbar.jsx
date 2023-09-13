import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { useNavigate, NavLink } from "react-router-dom";
import logo from "../../images/DATABASEFORMOVIES-logos_white.png";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import { Icon, colors } from "@mui/material";
import { IconContext } from "react-icons";

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
    // <div className="topnav">
    //   <div className="left">
    //     <img className="mainlogo" src={logo} alt="DBFM Logo" />
    //     <Link to="/"> Home</Link>
    //     <Link to="/favorites"> Favorites</Link>
    //     {Array.isArray(genres) &&
    //       genres.map((genre, i) => {
    //         return (
    //           <Link to={`/genres/${genre.id}`} key={i}>
    //             {genre.name}
    //           </Link>
    //         );
    //       })}
    //     {/* <Link to="/genres/28"> Action</Link>
    //     <Link to="/genres/12"> Adventure</Link> */}
    //   </div>
    //   <div className="right">
    //     <form>
    //       <div className="search-container">
    //         <input
    //           type="text"
    //           placeholder="Search.."
    //           onChange={(e) => setSearchWord(e.target.value)}
    //         />
    //         <button onClick={(e) => searchMovies(e)} className="search-icon">
    //           <BiSearch />
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
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
      {/* <form>
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
      </form> */}
      <IconContext.Provider value={{ color: "#28262C", size: "50px" }}>
        <form id="search">
          <div className="search-container">
            <div class="search-box">
              <input
                className="search-text"
                type="text"
                placeholder="Search.."
                onChange={(e) => setSearchWord(e.target.value)}
              />
              <button
                class="search-btn"
                onClick={(e) => searchMovies(e)}
                className="search-icon"
              >
                <BiSearch size={30} />
              </button>
            </div>
          </div>
        </form>
      </IconContext.Provider>
      
    </>
  );
}

export default Navbar;
