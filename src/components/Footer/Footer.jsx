import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";
import { AiOutlineGithub, AiFillLinkedin } from "react-icons/ai";
import { useUser } from "../../context/UserProvider";

function Footer() {
  const { user } = useUser();

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <footer className="footer">
      <ul className="menu">
        <NavLink className="menuLink" to="/" activeclassname="active">
          <li className="menuItem">Home</li>
        </NavLink>

        <NavLink className="menuLink" to="/favorites" activeclassname="active">
          <li className="menuItem">Favtories</li>
        </NavLink>

        <NavLink
          className="menuLink"
          onClick={scrollToTop}
          to="/about"
          activeclassname="active"
        >
          <li className="menuItem">About</li>
        </NavLink>

        {!user && (
          <NavLink
            className="menuLink"
            onClick={scrollToTop}
            to="/login"
            activeclassname="active"
          >
            <li className="menuItem">Login</li>
          </NavLink>
        )}
      </ul>
      <div className="socialMediaFooter">
        <a
          href="https://github.com/BenjaminRasoli"
          target="_blank"
          rel="noreferrer"
        >
          <span className="github">
            <AiOutlineGithub size={30} />
          </span>
        </a>
        <a
          href="https://www.linkedin.com/in/benjamin-rasoli-2948ab300"
          target="_blank"
          rel="noreferrer"
        >
          <span className="linkedin">
            <AiFillLinkedin size={30} />
          </span>
        </a>
      </div>
      <p>&copy;2023 DATA BASE FOR MOVIES | All Rights Reserved</p>
    </footer>
  );
}

export default Footer;
