import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getBackgroundImagePromise } from "./utils";
import Grid from "@mui/material/Grid";
import Item from "./Item";

import HomePageHeader from "./HomePageHeader";
// import HomePageActivityInput from "./HomePageActivityInput";
import HomePageAddressInput from "./HomePageAddressInput";
import HomePageActivitySelect from "./HomePageActivitySelect";
import HomePageTransportationButtons from "./HomePageTransportationButtons";
import HomePageFormButton from "./HomePageFormButton";
import HomePageFooter from "./HomePageFooter";

import { MeetingLocationsContext } from "./MeetingLocationsContext";

const HomePage = () => {
  // State for the form components
  const [firstAddress, setFirstAddress] = useState("");
  const [secondAddress, setSecondAddress] = useState("");
  const [activity, setActivity] = useState("Any");
  const [transportation, setTransportation] = useState("Walking");

  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState(null);

  // Hook used to navigate to meeting-location page
  const navigate = useNavigate();

  const { setLocationPathName } = useContext(MeetingLocationsContext);

  // Ensure that the address the users selected are valid addresses in google maps
  const [submitButtonPressed, setSubmitButtonPressed] = useState(false);
  const [isValidFirstAddress, setIsValidFirstAddress] = useState(false);
  const [isValidSecondAddress, setIsValidSecondAddress] = useState(false);
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
  };

  const handleSecondLocationUpdate = (location) => {
    setSecondAddress(location);
  };

  const handleActivityUpdate = (activity) => {
    setActivity(activity);
  };

  const handleTransportationUpdate = (transportation) => {
    setTransportation(transportation);
  };

  /*
   * Event handlers when user selects a dropdown; using this to ensure that the user's input is a valid address.
   */
  const handleFirstLocationSelect = (bool) => {
    setIsValidFirstAddress(bool);
  };

  const handleSecondLocationSelect = (bool) => {
    setIsValidSecondAddress(bool);
  };

  // Returns whether the locations are valid
  const validateLocations = () => {
    return isValidFirstAddress && isValidSecondAddress;
  };

  const getStatus = (isValidAddress) => {
    return submitButtonPressed && !isValidAddress
      ? 1
      : submitButtonPressed && isValidAddress
      ? 2
      : 0;
  };

  const generateHelperText = (isValidAddress, position) => {
    let helperText = `Enter your ${position} location.`;

    if (submitButtonPressed && !isValidAddress) {
      helperText = "Please select a valid address from the dropdown.";
    } else if (submitButtonPressed && isValidAddress) {
      helperText = "Correct selected a valid address.";
    }

    return helperText;
  };

  /*
   * Used to redirect to the results page
   */
  const redirectToMeetingLocationsPage = (url, meetingLocationsData) => {
    console.log("hit");
    navigate(url, { state: { meetingLocationsData } });
  };

  // Reset all the state in the forum
  const resetState = () => {
    setFirstAddress("");
    setSecondAddress("");
    setActivity("Any");
    setTransportation("Driving");
    setLoading(false);
    setSubmitButtonPressed(false);
    setIsValidFirstAddress(false);
    setIsValidSecondAddress(false);
  };

  const handleSubmit = (e) => {
    const formValues = {
      firstAddress: firstAddress,
      secondAddress: secondAddress,
      activity: activity,
      transportation: transportation,
    };

    // Ensure that the page doesn't refresh
    e.preventDefault();

    // Check the user selected valid addresses for both addresses
    const isValidLocations = validateLocations();
    setSubmitButtonPressed(true);

    // If one of the location is not valid, then just return
    if (!isValidLocations) {
      return;
    }

    // Display loading animation on button
    // ! There might be a bug, since the button is not loading?
    setLoading(true);

    // Perform a fetch request
    const url = `/find-locations/firstAddress=${firstAddress}/secondAddress=${secondAddress}/activity=${activity}/transportation=${transportation}`;

    fetch(url)
      .then((response) => {
        // Get the response and parse the json
        response
          .json()
          .then((data) => {
            console.log(data);
            if (!data.isValid) {
              console.log(`Message: ${data.message}`);
              setLoading(false);
            } else {
              // Reset all the state
              resetState();

              // Redirect to new page
              const meetingLocationsURL = `/meeting-locations/firstAddress=${firstAddress}/secondAddress=${secondAddress}/activity=${activity}/transportation=${transportation}`;
              redirectToMeetingLocationsPage(meetingLocationsURL, data);
              setLocationPathName(meetingLocationsURL);
            }
          })
          .catch((err) => {
            console.log(`error parsing response json: ${err}`);
          });
      })
      .catch((err) => console.log(`error at fetching url: ${err}`));
  };

  return (
    <div id="home-page-container">
      {/* <HomePageHeader /> */}
      {/* <div id="home-page-body-wrapper"> */}

      <div id="home-page-body" style={{ backgroundImage: `url(${imageURL})` }}>
        <HomePageHeader />
        <Item id="hope-page-form-outline">
          <form onSubmit={handleSubmit}>
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
                <HomePageAddressInput
                  statusCode={getStatus(isValidFirstAddress)}
                  required={true}
                  id="input-address-one"
                  label="First Starting Location"
                  helperText={generateHelperText(isValidFirstAddress, "first")}
                  onTextChange={handleFirstLocationUpdate}
                  onSelectDropDown={handleFirstLocationSelect}
                  address={firstAddress}
                />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <HomePageAddressInput
                  statusCode={getStatus(isValidSecondAddress)}
                  required={true}
                  id="input-address-two"
                  label="Second Starting Location"
                  helperText={generateHelperText(
                    isValidSecondAddress,
                    "second"
                  )}
                  onTextChange={handleSecondLocationUpdate}
                  onSelectDropDown={handleSecondLocationSelect}
                  address={secondAddress}
                />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <HomePageActivitySelect
                  statusCode={submitButtonPressed}
                  id="select-activity"
                  label="Activity (Optional)"
                  helperText="Enter an activity of your choice."
                  onNewSelect={handleActivityUpdate}
                  activity={activity}
                />
                {/* <HomePageActivityInput statusCode={submitButtonPressed} id="select-activity" label="Activity (Optional)" helperText="Enter an activity of your choice." onNewSelect={handleActivityUpdate} /> */}
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <HomePageTransportationButtons
                  onButtonChange={handleTransportationUpdate}
                  transportation={transportation}
                />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <HomePageFormButton
                  isLoading={loading}
                  id="home-page-form-button"
                />
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
