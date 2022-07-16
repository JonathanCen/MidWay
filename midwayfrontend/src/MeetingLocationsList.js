import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import MeetingLocationsListBusiness from "./MeetingLocationsListBusiness";

/*
 * Each list is going to have:
 * 1) Title of the paper
 *    a. (Activity) in (midpoint)
 *    b. (Activity) in (nearby city)
 * 2) Cards of each business that is linked to the acitvity
 */
const MeetingLocationsList = ({
  meetingLocationsData,
  nearbyCity,
  activity,
  businessNumbering,
}) => {
  return (
    <Paper
      elevation={8}
      sx={{
        margin: "15px",
        padding: "10px",
        background: "#fff",
      }}
    >
      {/* Iterate through all the businesses and put them in a card */}
      <div className="meeting-location-list-title">
        {" "}
        {nearbyCity !== undefined
          ? `${activity} Places Near Midpoint, ${nearbyCity}`
          : `${activity} Places Near Midpoint`}{" "}
      </div>
      {meetingLocationsData.map((business, index) => {
        if (business !== undefined) {
          return (
            <MeetingLocationsListBusiness
              business={business}
              num={businessNumbering[business.name]}
              key={index}
            />
          );
        }
      })}
    </Paper>
  );
};

export default MeetingLocationsList;
