import React, { useEffect } from "react";
import {useLocation, useParams} from 'react-router-dom';
import Grid from '@mui/material/Grid';

import MeetingLocationsHeader from "./MeetingLocationsHeader";
import MeetingLocationsGoogleMapWrapper from "./MeetingLocationsGoogleMapWrapper";
import MeetingLocationsList from "./MeetingLocationsList";

const MeetingLocations = () => {
  const location  = useLocation();
  // const { firstAddress, secondAddress, activity, transportation } = useParams(); 

  useEffect(() => {
    console.log(location);
    if (location.state !== null) {
      console.log(location.state.meetingLocationsData);
    }
    // ! If location is empty/null/undefined, then we need to call the backend on these inputs

  }, [])

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item xs={12} sx={{ height: "10vh", border: "solid 1px black" }}> <MeetingLocationsHeader id="meeting-locations-header"/> </Grid>
      <Grid item xs={3} sx={{  height: "100%", border: "solid 1px blue"}}> <MeetingLocationsList meetingLocationsData={location.state.meetingLocationsData}/> </Grid>
      <Grid item xs={9} sx={{  height: "100%", border: "solid 1px red"}}> <MeetingLocationsGoogleMapWrapper meetingLocationsData={location.state.meetingLocationsData}/> </Grid>
    </Grid>
  );
};

export default MeetingLocations;