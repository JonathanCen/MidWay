import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import HomePageAddressInput from "./HomePageAddressInput";
import HomePageActivitySelect from "./HomePageActivitySelect";
import ModeTransportationSelect from "./ModeTransportationSelect";
import HomePageFormButton from "./HomePageFormButton";

import { MeetingLocationsContext } from "./MeetingLocationsContext";

const MeetingLocationHeaderForm = () => {
  const firstAddressRef = useRef(null);
  const secondAddressRef = useRef(null);

  // State for the form components
  const [firstAddress, setFirstAddress] = useState("");
  const [secondAddress, setSecondAddress] = useState("");
  const [activity, setActivity] = useState("Any");
  const [transportation, setTransportation] = useState("Driving");

  // Hook used to show the state of the button
  const [loading, setLoading] = useState(false);

  // Hook used to navigate to meeting-location page
  const navigate = useNavigate();

  // Ensure that the address the users selected are valid addresses in google maps
  const [submitButtonPressed, setSubmitButtonPressed] = useState(false);
  const [isValidFirstAddress, setIsValidFirstAddress] = useState(false);
  const [isValidSecondAddress, setIsValidSecondAddress] = useState(false);

  const { setLocationPathName } = useContext(MeetingLocationsContext);

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

  /*
   * Used to redirect to the results page
   */
  const redirectToMeetingLocationsPage = (url, meetingLocationsData) => {
    navigate(url, { state: { meetingLocationsData } });
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
    setLoading(true);

    // Perform a fetch request
    const url = `/find-locations/firstAddress=${firstAddress}/secondAddress=${secondAddress}/activity=${activity}/transportation=${transportation}`;

    fetch(url)
      .then((response) => {
        // Get the response and parse the json
        response
          .json()
          .then((data) => {
            // Check if the backend sent valid data
            if (!data.isValid) {
              // There was an error in the backend
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
    // <form onSubmit={handleSubmit}>
    // <Stack direction="row" spacing={2}>
    <React.Fragment>
      <HomePageAddressInput
        statusCode={getStatus(isValidFirstAddress)}
        required={true}
        id="input-address-one"
        label="First Starting Location"
        helperText={generateHelperText(isValidFirstAddress, "first")}
        onTextChange={handleFirstLocationUpdate}
        onSelectDropDown={handleFirstLocationSelect}
        removeHelperText={true}
        address={firstAddress}
        ref={firstAddressRef}
      />
      <HomePageAddressInput
        statusCode={getStatus(isValidSecondAddress)}
        required={true}
        id="input-address-two"
        label="Second Starting Location"
        helperText={generateHelperText(isValidSecondAddress, "second")}
        onTextChange={handleSecondLocationUpdate}
        onSelectDropDown={handleSecondLocationSelect}
        removeHelperText={true}
        address={secondAddress}
        ref={secondAddressRef}
      />
      <HomePageActivitySelect
        statusCode={submitButtonPressed}
        id="select-activity"
        label="Activity (Optional)"
        helperText="Enter an activity of your choice."
        onNewSelect={handleActivityUpdate}
        removeHelperText={true}
        activity={activity}
      />
      <ModeTransportationSelect
        statusCode={submitButtonPressed}
        id="select-transportation"
        label="Mode Of Transportation"
        helperText="Select Mode of Transportation."
        onNewSelect={handleTransportationUpdate}
        removeHelperText={true}
        transportation={transportation}
      />
      <HomePageFormButton
        id="meeting-locations-header-form-button"
        isLoading={loading}
        downSize={true}
        onClickHandler={handleSubmit}
      />
    </React.Fragment>

    // </form>
  );
};

export default MeetingLocationHeaderForm;
