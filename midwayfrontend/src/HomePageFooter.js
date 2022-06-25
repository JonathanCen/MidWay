import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";

const HomePageFooter = () => {
  return (
    <div id="home-page-footer">
      {/* <div id="footer-slogan">
        Meet More. Travel Less. Discover More.
      </div> */}
      <div id="footer-contact-links">
        <a id="github-link" href="https://github.com/">
          Source Code <GitHubIcon fontSize="small" />
        </a>
        <a id="personal-page-link" href="https://google.com/">
          Jonathan Cen
        </a>
      </div>
      {/* <div id="home-page-footer-slogan"> Finding ways for people to meet in the middle. </div> */}
    </div>
  )
};

export default HomePageFooter;