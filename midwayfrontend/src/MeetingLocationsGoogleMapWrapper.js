import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import MeetingLocationsGoogleMap from "./MeetingLocationsGoogleMap";

const render = (status) => {
  return <h1>{status}</h1>;
};

const MeetingLocationsGoogleMapWrapper = (props) => {
  const { meetingLocationsData } = props;

  return (
    <div style={{ height: "90%", width: "100%" }}>
      <Wrapper
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        render={render}
      >
        <MeetingLocationsGoogleMap
          meetingLocationsData={meetingLocationsData}
          style={{ flexGrow: "1", height: "100%" }}
        />
      </Wrapper>
    </div>
  );
};

export default MeetingLocationsGoogleMapWrapper;
