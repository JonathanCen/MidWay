import React, { useState, useEffect } from "react";
import { getBackgroundImagePromise } from "./utils";
import Grid from "@mui/material/Grid";
import Item from "./Item";
import LoadingButton from '@mui/lab/LoadingButton';
import TravelExploreTwoToneIcon from '@mui/icons-material/TravelExploreTwoTone';

import HomePageHeader from "./HomePageHeader";
import HomePageActivityInput from "./HomePageActivityInput";
import HomePageModeTransportationButtons from "./HomePageModeTransportationButtons";
import HomePageAddressInput from "./HomePageAddressInput";
import HomePageActivitySelect from "./HomePageActivitySelect";
import HomePageFooter from "./HomePageFooter";

const HomePage = () => {
  const [firstAddress, setFirstAddress] = useState('');
  const [secondAddress, setSecondAddress] = useState('');
  const [activity, setActivity] = useState('');
  const [modeTransportation, setModeTransportation] = useState('Walking');

  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState(null);

  // Ensure that the address the users selected are valid addresses in google maps
  const [submitButtonPressed, setSubmitButtonPressed] = useState(false);
  const [isValidFirstAddress, setIsValidFirstAddress] = useState(false);
  const [isValidSecondAddress, setIsValidSecondAddress] = useState(false);

  const helperText = []

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

  /*
   * Event handlers when user types into the input boxes
   */
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

  /*
   * Event handlers when user selects a dropdown; using this to ensure that the user's input is a valid address.
   */
  const handleFirstLocationSelect = (bool) => {
    setIsValidFirstAddress(bool);
  }
 
  const handleSecondLocationSelect = (bool) => {
    setIsValidSecondAddress(bool);
  }

  // Returns whether the locations are valid
  const validateLocations = () => {
    return isValidFirstAddress && isValidSecondAddress;
  }

  const getStatus = (isValidAddress) => {
    return submitButtonPressed && !isValidAddress ? 1 : submitButtonPressed && isValidAddress ? 2 : 0;
  }

  const generateHelperText = (isValidAddress, position) => {
    let helperText = `Enter your ${position} location.`;

    if (submitButtonPressed && !isValidAddress) {
      helperText = "Please select a valid address from the dropdown."
    } else if (submitButtonPressed && isValidAddress) {
      helperText = "Correct selected a valid address."
    }

    return helperText;
  }

  const handleSubmit = (e) => {
    const formValues = {
      firstAddress: firstAddress,
      secondAddress: secondAddress,
      activity: activity,
      modeTransportation: modeTransportation
    };

    // Ensure that the page doesn't refresh
    e.preventDefault();

    // Check the user selected valid addresses for both addresses 
    const isValidLocations = validateLocations();
    setSubmitButtonPressed(true);

    // If one of the location is not valid, then just return
    if (!isValidLocations) {
      console.log("location is not valid, ", isValidFirstAddress, isValidSecondAddress);
      return ;
    }

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
                <HomePageAddressInput statusCode={getStatus(isValidFirstAddress)} required={true} id="input-address-one" label="First Starting Location" helperText={generateHelperText(isValidFirstAddress, 'first')} onTextChange={handleFirstLocationUpdate} onSelectDropDown={handleFirstLocationSelect}/>
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <HomePageAddressInput statusCode={getStatus(isValidSecondAddress)} required={true} id="input-address-two" label="Second Starting Location" helperText={generateHelperText(isValidSecondAddress, 'second')} onTextChange={handleSecondLocationUpdate} onSelectDropDown={handleSecondLocationSelect}/>
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <HomePageActivitySelect statusCode={submitButtonPressed} id="select-activity" label="Activity (Optional)" helperText="Enter an activity of your choice." onNewSelect={handleActivityUpdate} />
                {/* <HomePageActivityInput statusCode={submitButtonPressed} id="select-activity" label="Activity (Optional)" helperText="Enter an activity of your choice." onNewSelect={handleActivityUpdate} /> */}
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
