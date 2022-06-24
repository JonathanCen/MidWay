import React from "react";
import { useLocation, Link } from "react-router-dom";
import Button from "@mui/material/Button";

const PageNotFound = () => {
  const location = useLocation();
  return (
    <div id="page-not-found-body">
      <img src="/page-not-found.png" id="page-not-found-image" alt="404 Page Not Found"></img>
      {/* <h1 id="page-not-found-heading">404 Error</h1> */}
      <h1 id="page-not-found-heading">Page Not Found.</h1>
      <p id="page-not-found-message">
        The requested URL 
        <i id="page-not-found-pathname">{location.pathname}</i> does not exist.
      </p>
      <Button variant="outlined" id="page-not-found-button">
        <Link to="/" id="page-not-found-link">
          Take me Home.
        </Link>
      </Button>
    </div>
  );
}

export default PageNotFound;