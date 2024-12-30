import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import {
  AiOutlineInstagram,
  AiOutlineGithub,
  AiFillFacebook,
  AiFillLinkedin,
} from "react-icons/ai";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <footer className="footer">
      <ul className="menu">
        <Link className="menuLink" to="/">
          <li className="menuItem">Home</li>
        </Link>

        <Link className="menuLink" to="/favorites">
          <li className="menuItem">Favtories</li>
        </Link>

        <Link className="menuLink" onClick={scrollToTop} to="/about">
          <li className="menuItem">About</li>
        </Link>

        <Link className="menuLink" onClick={scrollToTop} to="/login">
          <li className="menuItem">Login</li>
        </Link>
      </ul>
      <div className="socialMediaFooter">
        <a
          href="https://github.com/BenjaminRasoli"
          target="_blank"
          rel="noreferrer"
        >
          <span className="instagram">
            <AiOutlineInstagram size={30} />
          </span>
        </a>
        <a
          href="https://github.com/BenjaminRasoli"
          target="_blank"
          rel="noreferrer"
        >
          <span className="facebook">
            <AiFillFacebook size={30} />
          </span>
        </a>
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
          href="https://github.com/BenjaminRasoli"
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
