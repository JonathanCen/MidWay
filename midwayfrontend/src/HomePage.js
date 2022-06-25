import React, { useState, useEffect } from "react";
import { getBackgroundImagePromise } from "./utils";
import Grid from "@mui/material/Grid";
import HomePageTextField from "./HomePageTextField";
import Item from "./Item";
import HomePageModeTransportationButtons from "./HomePageModeTransportationButtons";
import HomePageHeader from "./HomePageHeader";
import HomePageFooter from "./HomePageFooter";
import { Button } from "@mui/material";

const HomePage = () => {

  const [imageURL, setImageURL] = useState(null);
  const useDefaultBackground = true;

  useEffect(() => {
    if (useDefaultBackground) {
      setImageURL("/background-image-large.jpg");
    } else {
      const backgroundImagePromise = getBackgroundImagePromise();
      backgroundImagePromise
        .then((reponse) => setImageURL(reponse.response.urls.regular))
        .catch((err) =>
          console.log(
            `There was an error retrieving image from unsplash. ${err}`
          )
        );
    }
  }, []);

  return (
    <div id="home-page-container">
      <HomePageHeader />
      {/* <div id="home-page-body-wrapper"> */}

      <div id="home-page-body" style={{ backgroundImage: `url(${imageURL})` }}>
        <Item id="hope-page-form-outline">
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            rowSpacing={3}
            >
            <Grid item sx={{ width: "100%" }}>
              <div id="home-page-form-title">
                Finding ways for people to meet in the middle.
              </div>
            </Grid>
            <Grid item sx={{ width: "100%" }}>
              <HomePageTextField required={true} id="textfield-address-one" label="First Address"/>
            </Grid>
            <Grid item sx={{ width: "100%" }}>
              <HomePageTextField required={true} id="textfield-address-two" label="Second Address"/>
            </Grid>
            <Grid item sx={{ width: "100%" }}>
              <HomePageTextField id="textfield-activity" label="Activity (Optional)"/>
            </Grid>
            <Grid item sx={{ width: "100%" }}>
              <HomePageModeTransportationButtons />
            </Grid>
            <Grid item sx={{ width: "100%" }}>
              <Button size="large" variant="outlined" id="home-page-form-button">
                Find Activities
              </Button>
            </Grid>
          </Grid>
        </Item>
        <div id="slogan">
          Meet More. Travel Less. Discover More.
        </div>
      </div>
      {/* </div> */}
      <HomePageFooter />
      {/* <div
        alt="background"
        id="homepage-background-image"
        style={{ backgroundImage: `url(${imageURL})` }}
        >
      </div> */}
    </div>
  );
};

export default HomePage;
