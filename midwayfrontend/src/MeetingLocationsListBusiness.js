import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Rating,
  Chip,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import StarIcon from "@mui/icons-material/Star";
import CommentIcon from "@mui/icons-material/Comment";
import { GoogleMapContext } from "./GoogleMapContext";
import { BusinessPressedContext } from "./BusinessPressedContext";

const MeetingLocationsListBusiness = ({ business, num }) => {
  const {
    mapInstance,
    mapMarkerInfoWindow,
    mapMarkerInformation,
    businessNameToMarker,
  } = useContext(GoogleMapContext);
  const { setIsBusinessPressed, setBusinessInformation } = useContext(
    BusinessPressedContext
  );

  const [businessHours, setBusinessHours] = useState({});

  const handleBusinessCardClick = () => {
    setIsBusinessPressed(true);
    setBusinessInformation({ ...business });

    if (
      mapInstance !== null &&
      mapMarkerInfoWindow !== null &&
      mapMarkerInformation !== null
    ) {
      setIsBusinessPressed(true);
      setBusinessInformation({ ...business });

      const businessLat = business.coordinates.latitude,
        businessLng = business.coordinates.longitude;
      const businessMarker = businessNameToMarker[business.name];

      // Pan to the location
      mapInstance.panTo(businessMarker.getPosition());

      // Make the marker info window pop out
      for (let [{ lat, lng }, ..._] of mapMarkerInformation) {
        if (lat === businessLat && lng === businessLng) {
          // When initally pressed close the info window
          const infoWindowPreviousContent = mapMarkerInfoWindow.getContent();
          mapMarkerInfoWindow.setContent(undefined);
          mapMarkerInfoWindow.close();

          // Position the map such that the center is the selected marker
          mapInstance.panTo(businessMarker.getPosition());
          mapInstance.setZoom(14);

          // Open the info window
          mapMarkerInfoWindow.setContent(businessMarker.getTitle());
          mapMarkerInfoWindow.open(businessMarker.getMap(), businessMarker);
        }
      }
    }
  };

  useEffect(() => {
    const datesOpen = {};
    if (business.hours.length > 0) {
      for (let { day, ...hours } of business.hours[0].open) {
        if (datesOpen.hasOwnProperty(day)) {
          datesOpen[day].append(hours);
        } else {
          datesOpen[day] = [hours];
        }
      }

      setBusinessHours({ ...datesOpen });
    }
  }, []);

  // Returns the local timezone current time and date
  // ! Fix the date so that it corresponds to the current date
  const getCurrentDateIndex = () => {
    const currentDate = new Date();
    const date = currentDate.getDate() === 0 ? 6 : currentDate.getDate() - 1;
    return currentDate.getDay();
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

  // Check the current date so we can display the proper hours for the current day
  const currentDateIndex = getCurrentDateIndex();

  return (
    business !== undefined && (
      <Card
        elevation={5}
        sx={{
          display: "flex",
          margin: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={handleBusinessCardClick}
      >
        <CardActionArea>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent className="business-content" sx={{ height: "100%" }}>
              <Stack direction="row" spacing={1}>
                <div className="business-title">
                  {`${num}. ${business.name}`}{" "}
                </div>
                <div className="business-rating">
                  <div
                    className="business-rating-rating"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Rating
                      value={business.rating || 0}
                      size="small"
                      precision={0.5}
                      icon={<StarIcon fontSize="inherit" />}
                      emptyIcon={<StarIcon fontSize="inherit" />}
                      readOnly
                    />
                  </div>
                  <div className="business-rating-number-reviews">
                    {business.review_count}
                  </div>
                </div>
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                className="business-categories"
              >
                {business.categories.length > 0 &&
                  business.categories.map((category, index) => (
                    <Chip
                      label={category.title}
                      variant="outlined"
                      size="small"
                      key={index}
                    />
                  ))}
              </Stack>
              <Stack direction="row" spacing={1} className="business-open">
                <div className="business-open-hours">
                  {business.hours.length > 0 &&
                    Object.keys(businessHours).length > 0 &&
                    businessHours[currentDateIndex] !== undefined &&
                    `${convert24HourClockNotationTo12HourClockNotation(
                      businessHours[currentDateIndex][0].start
                    )} - ${convert24HourClockNotationTo12HourClockNotation(
                      businessHours[currentDateIndex][0].end
                    )}`}
                </div>
                <div className="business-open-is-open">
                  {business.hours.length > 0 &&
                    business.hours[0].is_open_now !== undefined && (
                      <Chip
                        className="business-open-is-open-text"
                        label={
                          business.hours[0].is_open_now ? "Open" : "Closed"
                        }
                        color={
                          business.hours[0].is_open_now ? "success" : "error"
                        }
                        size="small"
                        sx={{ height: "16px" }}
                      />
                    )}
                </div>
              </Stack>
              <div className="business-review">
                {" "}
                <CommentIcon color="disabled" sx={{ fontSize: 16 }} />{" "}
                {`${business.reviews[0].text}`}
              </div>
            </CardContent>
          </Box>
        </CardActionArea>
      </Card>
    )
  );
};

export default MeetingLocationsListBusiness;
