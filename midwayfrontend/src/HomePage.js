import React, { useState, useEffect } from "react";
import { getBackgroundImagePromise } from "./utils";
import Grid from "@mui/material/Grid";
import HomePageTextField from "./HomePageTextField";
import Item from "./Item";
import HomePageModeTransportationButtons from "./HomePageModeTransportationButtons";
import HomePageHeader from "./HomePageHeader";
import HomePageFooter from "./HomePageFooter";
import LoadingButton from '@mui/lab/LoadingButton';
import TravelExploreTwoToneIcon from '@mui/icons-material/TravelExploreTwoTone';


const emptyFormValues = {
  firstAddress: "",
  secondAddress: "",
  activity: "",
  modeTransportation: "Walking",
}

const HomePage = () => {
  const [firstAddress, setFirstAddress] = useState('');
  const [secondAddress, setSecondAddress] = useState('');
  const [activity, setActivity] = useState('');
  const [modeTransportation, setModeTransportation] = useState('Walking');

  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [formValues, setFormValues] = useState(emptyFormValues)
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

  const handleFirstLocationUpdate = (location) => {
    setFirstAddress(location);
  }

  const handleSecondLocationUpdate = (location) => {
    setSecondAddress(location);
  }

  const handleActivityUpdate = (activity) => {
    setActivity(activity);
  }

  const handleTransportationUpdate = (transportation) => {
    setModeTransportation(transportation);
  }

  const handleSubmit = (e) => {
    console.log(e);
    const formValues = {
      firstAddress: firstAddress,
      secondAddress: secondAddress,
      activity: activity,
      modeTransportation: modeTransportation
    };

    e.preventDefault();

    // Display loading animation on button
    setLoading(true);

    // Perform a fetch request
    console.log(formValues);
    setLoading(false);
  }

  return (
    <div id="home-page-container">
      {/* <HomePageHeader /> */}
      {/* <div id="home-page-body-wrapper"> */}

      <div id="home-page-body" style={{ backgroundImage: `url(${imageURL})` }}>
        <HomePageHeader/>
        <Item id="hope-page-form-outline">
          <form  onSubmit={handleSubmit}>
            <Grid container direction="column" justifyContent="center" alignItems="center" rowSpacing={3} >
              <Grid item sx={{ width: "100%" }}>
                <div id="home-page-form-title">
                  Finding ways for people to meet in the middle.
                </div>
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <HomePageTextField required={true} id="textfield-address-one" label="First Starting Location" helperText="Enter your first location." onTextChange={handleFirstLocationUpdate}/>
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <HomePageTextField required={true} id="textfield-address-two" label="Second Starting Location" helperText="Enter your second location." onTextChange={handleSecondLocationUpdate}/>
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <HomePageTextField id="textfield-activity" label="Activity (Optional)" helperText="Enter an activity of your choice." onTextChange={handleActivityUpdate} />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <HomePageModeTransportationButtons onButtonChange={handleTransportationUpdate}/>
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <LoadingButton
                  // onClick={handleSubmit}
                  type="submit"
                  endIcon={<TravelExploreTwoToneIcon />}
                  loading={loading}
                  loadingPosition="end"
                  variant="outlined"
                  size="large"
                  sx={{ width: "100%" }}
                >
                  {loading ? 'Finding Locations' : 'Find Meeting Locations'}
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Item>
        {/* <div id="slogan">
          Meet More. Travel Less. Discover More.
        </div> */}
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
