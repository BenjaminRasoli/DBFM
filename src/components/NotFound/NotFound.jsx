import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
      <div className="notFound">
          <h1>404</h1>
      <h3>Sorry, the page you are looking for doesn't exist.</h3>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}

export default NotFound;
