import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import {
  AiOutlineInstagram,
  AiOutlineGithub,
  AiFillFacebook,
  AiFillLinkedin,
} from "react-icons/ai";
import logo from "../../images/DATABASEFORMOVIES-logos_white.png";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <footer class="footer">
      <ul class="social-icon">
        <li class="social-icon__item">
          <a class="social-icon__link" href="#">
            <ion-icon name="logo-facebook"></ion-icon>
          </a>
        </li>
        <li class="social-icon__item">
          <a class="social-icon__link" href="#">
            <ion-icon name="logo-twitter"></ion-icon>
          </a>
        </li>
        <li class="social-icon__item">
          <a class="social-icon__link" href="#">
            <ion-icon name="logo-linkedin"></ion-icon>
          </a>
        </li>
        <li class="social-icon__item">
          <a class="social-icon__link" href="#">
            <ion-icon name="logo-instagram"></ion-icon>
          </a>
        </li>
      </ul>
      <ul class="menu">
        <Link to="/">
          <li class="menu__item">
            <a class="menu__link" href="/">
              Home
            </a>
          </li>
        </Link>

        <Link to="/favorites">
          <li class="menu__item">
            <a class="menu__link" href="/">
              Favtories
            </a>
          </li>
        </Link>

        <Link onClick={scrollToTop} to="/contact">
          <li class="menu__item">
            <a class="menu__link" href="/">
              About
            </a>
          </li>
        </Link>

        <Link onClick={scrollToTop} to="/contact">
          <li class="menu__item">
            <a class="menu__link" href="/">
              Contact
            </a>
          </li>
        </Link>
      </ul>
      <div className="socialMediaFooter">
        <a href="https://github.com/BenjaminRasoli" target="_blank">
          <span className="instagram">
            <AiOutlineInstagram size={30} />
          </span>
        </a>
        <a href="https://github.com/BenjaminRasoli" target="_blank">
          <span className="facebook">
            <AiFillFacebook size={30} />
          </span>
        </a>
        <a href="https://github.com/BenjaminRasoli" target="_blank">
          <span className="github">
            <AiOutlineGithub size={30} />
          </span>
        </a>
        <a href="https://github.com/BenjaminRasoli" target="_blank">
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
