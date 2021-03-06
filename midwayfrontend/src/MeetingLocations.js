import React, { useEffect, useState, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { BusinessPressedContext } from "./BusinessPressedContext";
import MeetingLocationsHeader from "./MeetingLocationsHeader";
import MeetingLocationHeaderForm from "./MeetingLocationHeaderForm";
import MeetingLocationsGoogleMapWrapper from "./MeetingLocationsGoogleMapWrapper";
import MeetingLocationsList from "./MeetingLocationsList";
import MeetingLocationsBusinessInformation from "./MeetingLocationsBusinessInformation";
import Collapse from "@mui/material/Collapse";
import { MeetingLocationsContext } from "./MeetingLocationsContext";

const MeetingLocations = (props) => {
  // Hook to get params passed in from the previous route
  const location = useLocation();

  const meetingLocationsListRef = useRef(null);

  // Initalize some state, and retrieve some context
  const [businessNumbering, setBusinessNumbering] = useState({});
  const { isBusinessPressed } = useContext(BusinessPressedContext);

  const isNearbyCity = (nearbyCities) => nearbyCities !== undefined;

  const getBusinessNum = (businessName) => {
    return businessNumbering[businessName];
  };

  useEffect(() => {
    // ! If location is empty/null/undefined, then we need to call the backend on these inputs

    // Iterate through all the businesses and assign them a numbering
    let businessNumber = 1,
      tmpBusinessNumbering = {};
    location.state.meetingLocationsData.businesses.data.search.business.forEach(
      (business) => {
        tmpBusinessNumbering[business.name] = businessNumber++;
      }
    );

    // Check if there's nearbyCities
    if (
      isNearbyCity(
        location.state.meetingLocationsData.nearbyCitiesAndBusinesses
      )
    ) {
      location.state.meetingLocationsData.nearbyCitiesAndBusinesses.forEach(
        (city) => {
          city.businesses.forEach((business) => {
            tmpBusinessNumbering[business.name] = businessNumber++;
          });
        }
      );
    }
    setBusinessNumbering({ ...tmpBusinessNumbering });
  }, [location.pathname]);

  useEffect(() => {
    meetingLocationsListRef.current.scrollTo(0, 0);
  }, [isBusinessPressed]);

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item xs={12} sx={{ height: "10vh", border: "solid 1px black" }}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <MeetingLocationsHeader id="meeting-locations-header" />
          <MeetingLocationHeaderForm />
        </Stack>
      </Grid>
      <Grid
        item
        xs={4}
        sx={{ height: "90%", overflowY: "scroll" }}
        ref={meetingLocationsListRef}
      >
        <Collapse in={isBusinessPressed}>
          <MeetingLocationsBusinessInformation getNum={getBusinessNum} />
        </Collapse>
        <Collapse in={!isBusinessPressed}>
          <MeetingLocationsList
            meetingLocationsData={
              location.state.meetingLocationsData.businesses.data.search
                .business
            }
            activity={location.state.meetingLocationsData.requestBody.activity}
            businessNumbering={businessNumbering}
          />
          {isNearbyCity(
            location.state.meetingLocationsData.nearbyCitiesAndBusinesses
          ) &&
            location.state.meetingLocationsData.nearbyCitiesAndBusinesses.map(
              (business, index) => (
                <MeetingLocationsList
                  key={index}
                  meetingLocationsData={business.businesses}
                  nearbyCity={business.city}
                  activity={
                    location.state.meetingLocationsData.requestBody.activity
                  }
                  businessNumbering={businessNumbering}
                />
              )
            )}
        </Collapse>
      </Grid>
      {/* <Grid item xs={8} sx={{  height: "100%" }}> <div/> </Grid> */}
      <Grid item xs={8} sx={{ height: "100%" }}>
        {" "}
        <MeetingLocationsGoogleMapWrapper
          meetingLocationsData={location.state.meetingLocationsData}
        />{" "}
      </Grid>
    </Grid>
  );
};

export default MeetingLocations;
