import React, { useEffect, useState } from "react";
import {useLocation, useParams} from 'react-router-dom';
import Grid from '@mui/material/Grid';

import MeetingLocationsHeader from "./MeetingLocationsHeader";
import MeetingLocationsGoogleMapWrapper from "./MeetingLocationsGoogleMapWrapper";
import MeetingLocationsList from "./MeetingLocationsList";

const MeetingLocations = () => {
  const location  = useLocation();
  const [businessNumbering, setBusinessNumbering] = useState({});

  const isNearbyCity = (nearbyCities) => nearbyCities !== undefined;

  useEffect(() => {
    console.log(location);
    if (location.state !== null) {
      console.log(location.state.meetingLocationsData);
    }
    // ! If location is empty/null/undefined, then we need to call the backend on these inputs

    // Iterate through all the businesses and assign them a numbering
    let businessNumber = 1, tmpBusinessNumbering = {};
    location.state.meetingLocationsData.businesses.data.search.business.forEach((business) => {
      tmpBusinessNumbering[business.name] = businessNumber++; 
    })
    // Check if there's nearbyCities

    if (isNearbyCity(location.state.meetingLocationsData.nearbyCitiesAndBusinesses)) {
      location.state.meetingLocationsData.nearbyCitiesAndBusinesses.forEach((city) => {
        city.businesses.forEach((business) => {
          tmpBusinessNumbering[business.name] = businessNumber++;
        })
      })
    }
    setBusinessNumbering({...tmpBusinessNumbering});
  }, [])

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item xs={12} sx={{ height: "10vh", border: "solid 1px black" }}> <MeetingLocationsHeader id="meeting-locations-header"/> </Grid>
      <Grid item xs={3} sx={{  height: "100%", border: "solid 1px blue", overflowY: "scroll", height: "90%" }}> 
        <MeetingLocationsList meetingLocationsData={location.state.meetingLocationsData.businesses.data.search.business} activity={location.state.meetingLocationsData.requestBody.activity} businessNumbering={businessNumbering}/> 
        { 
          isNearbyCity(location.state.meetingLocationsData.nearbyCitiesAndBusinesses) && 
          location.state.meetingLocationsData.nearbyCitiesAndBusinesses.map((business, index) => 
            <MeetingLocationsList key={index} meetingLocationsData={business.businesses} nearbyCity={business.city} activity={location.state.meetingLocationsData.requestBody.activity} businessNumbering={businessNumbering}/>)
        }
      </Grid>
      <Grid item xs={9} sx={{  height: "100%", border: "solid 1px blue"}}> <div/> </Grid>
      {/* <Grid item xs={9} sx={{  height: "100%", border: "solid 1px red"}}> <MeetingLocationsGoogleMapWrapper meetingLocationsData={location.state.meetingLocationsData}/> </Grid> */}
    </Grid>
  );
};

export default MeetingLocations;