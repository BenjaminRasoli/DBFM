import React from "react";
import "./Footer.css";
import logo from "../../images/DATABASEFORMOVIES-logos_white.png";
import { BsInstagram, BsFacebook, BsGithub } from "react-icons/bs";

function Footer() {
  return (
    <footer className="footer">
      <ul>
        <li>
          <img src={logo} />
        </li>
      </ul>
      <ul>
        <li>
          <h4>Grunder</h4>
          <li>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt
              recusandae minus quis. Pariatur impedit saepe dolores qui
            </p>
          </li>
        </li>
      </ul>
      <ul>
        <li>
          <h4>Arbete</h4>
          <li>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt
              recusandae minus quis. Pariatur impedit saepe dolores qui
            </p>
          </li>
        </li>
      </ul>
      <ul>
        <li>
          <h4>Möjligheter</h4>
        </li>
        <li>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt
            recusandae minus quis. Pariatur impedit saepe dolores qui
          </p>
        </li>
      </ul>

      <ul className="footer-icons">
        <li>
          <BsInstagram />
        </li>
        <li>
          <BsFacebook />
        </li>

        <li>
          <a target="blank" href="https://github.com/BenjaminRasoli">
            <BsGithub />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
