import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";
import {
  AiOutlineGithub, AiFillLinkedin
} from "react-icons/ai";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <footer className="footer">
      <ul className="menu">
        <NavLink className="menuLink" to="/" activeClassName="active">
          <li className="menuItem">Home</li>
        </NavLink>

        <NavLink className="menuLink" to="/favorites" activeClassName="active">
          <li className="menuItem">Favtories</li>
        </NavLink>

        <NavLink
          className="menuLink"
          onClick={scrollToTop}
          to="/about"
          activeClassName="active"
        >
          <li className="menuItem">About</li>
        </NavLink>

        <NavLink
          className="menuLink"
          onClick={scrollToTop}
          to="/login"
          activeClassName="active"
        >
          <li className="menuItem">Login</li>
        </NavLink>
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
