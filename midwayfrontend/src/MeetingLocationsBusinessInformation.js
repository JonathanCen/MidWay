import React, { useState, useContext, useEffect } from "react";
import { BusinessPressedContext } from "./BusinessPressedContext";
import { Grid, Stack, Divider } from "@mui/material";
import MeetingLocationImageList from "./MeetingLocationImageList";
import MeetingLocationBusinessReview from "./MeetingLocationBusinessReview";

const isValidAddress = (address) => {
  return address !== "" && address !== undefined && address !== null;
};

// Returns the local timezone current time and date
const getCurrentDateIndex = () => {
  const currentDate = new Date();
  return currentDate.getDay();
};

const parseHours = (hours) => {
  // Check the input is not undefined
  if (hours === undefined) {
    return [];
  }

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const arrOpenHourStrings = [];

  let currentDay = 0,
    hoursIndex = 0,
    arrOpenHours = [];
  while (hoursIndex < hours.length) {
    if (hours[hoursIndex].day !== currentDay) {
      const openHoursArr = exactOpenHours(arrOpenHours);
      arrOpenHourStrings.push([days[currentDay], openHoursArr]);
      arrOpenHours = [];
      currentDay++;
    } else {
      arrOpenHours.push(hours[hoursIndex]);
      hoursIndex += 1;
    }
  }

  if (arrOpenHours.length > 0) {
    const openHoursArr = exactOpenHours(arrOpenHours);
    arrOpenHourStrings.push([days[currentDay], openHoursArr]);
  }

  // Iterate through the rest of the days and fill them in as closed
  for (let i = arrOpenHourStrings.length; i < 7; i++) {
    arrOpenHourStrings.push([days[i], ["Closed"]]);
  }

  return arrOpenHourStrings;
};

const exactOpenHours = (arrOpenHours) => {
  const accumStringHour = [],
    numHours = arrOpenHours.length;
  for (let { start, end } of arrOpenHours) {
    accumStringHour.push(
      `${convert24HourClockNotationTo12HourClockNotation(
        start
      )} - ${convert24HourClockNotationTo12HourClockNotation(end)}${
        accumStringHour.length !== numHours - 1 ? "," : ""
      }`
    );
  }
  return accumStringHour.length === 0 ? ["Closed"] : accumStringHour;
};

// Converts the input string 24 hour clock notation to 12 hour clock notation
const convert24HourClockNotationTo12HourClockNotation = (str24Hour) => {
  const strHour = str24Hour.slice(0, 2);
  const strMinutes = str24Hour.slice(2);

  const hourInt = parseInt(strHour);
  const isPM = Math.floor(hourInt / 12),
    hour = hourInt % 12;
  return `${hour === 0 ? 12 : hour}:${strMinutes} ${isPM ? "PM" : "AM"}`;
};

const MeetingLocationsBusinessInformation = (props) => {
  const { businessInformation } = useContext(BusinessPressedContext);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [arrHours, setArrayHours] = useState([]);
  const [businessReviews, setBusinessReviews] = useState([]);

  // Check the current date so we can display the proper hours for the current day
  const currentDateIndex = getCurrentDateIndex();
  useEffect(() => {
    if (Object.keys(businessInformation).length > 0) {
      if (businessInformation.hours.length > 0) {
        setArrayHours(parseHours(businessInformation.hours[0].open));
      }
      // setArrayHours(parseHours(hours));
      setAddress1(businessInformation.location.address1);
      setAddress2(businessInformation.location.address2);
      setAddress3(businessInformation.location.address3);
      setCity(businessInformation.location.city);
      setState(businessInformation.location.state);
      setPostalCode(businessInformation.location.postal_code);
      setBusinessReviews(businessInformation.reviews);
    }
  }, [businessInformation]);

  return (
    <Grid
      container
      direction="row"
      className="business-information"
      sx={{ height: "100%" }}
      spacing={3}
    >
      <Grid item xs={12}>
        <MeetingLocationImageList />
      </Grid>
      <Grid item xs={12}>
        <Stack direction="column" spacing={3}>
          <div id="business-information-meta-information">
            <Stack
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              divider={<Divider orientation="vertical" flexItem />}
            >
              {/* <div id="business-information-about"> */}
              <Stack direction="column" alignItems="center">
                <div id="business-information-address-header">Address</div>
                <div id="business-information-address">
                  {isValidAddress(address1) && (
                    <div className="business-information-main-address">
                      {address1}
                    </div>
                  )}
                  {isValidAddress(address2) && (
                    <div className="business-information-main-address">
                      {address2}
                    </div>
                  )}
                  {isValidAddress(address3) && (
                    <div className="business-information-main-address">
                      {address3}
                    </div>
                  )}
                  {
                    <div className="business-information-postal-information">{`${
                      city !== null ? city : ""
                    }, ${state !== null ? state : ""} ${
                      postalCode !== null ? postalCode : ""
                    }`}</div>
                  }
                </div>
              </Stack>
              {/* </div> */}
              {/* <div id="business-information-hours"> */}
              <Stack direction="column" alignItems="center">
                <div id="business-information-hours">Hours</div>
                {arrHours.length > 0 ? (
                  arrHours.map((day, index) => {
                    return (
                      <div key={index}>
                        <div className="business-information-hours-day">
                          {" "}
                          {day[0]}:
                          {day[1].map((hour, indexJ) => (
                            <span
                              className="business-information-hours-day-hours"
                              key={indexJ}
                            >
                              {" "}
                              {hour}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div id="business-information-no-hours">
                    Sorry no hours avaliable
                  </div>
                )}
              </Stack>
              {/* </div> */}
            </Stack>
          </div>
          <div id="business-information-reviews">
            <div id="business-information-reviews-header">Reviews</div>
            {businessReviews.length > 0 ? (
              businessReviews.map((review, index) => (
                <MeetingLocationBusinessReview review={review} key={index} />
              ))
            ) : (
              <div id="business-information-reviews-no-reviews">
                {" "}
                Sorry currently there are no reviews for this business{" "}
              </div>
            )}
          </div>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default MeetingLocationsBusinessInformation;
