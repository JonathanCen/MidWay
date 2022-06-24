import React, { useState, useEffect } from "react";
import { getBackgroundImagePromise } from "./utils";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Item from "./Item";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import FlightIcon from "@mui/icons-material/Flight";
import { Button } from "@mui/material";

const HomePage = () => {
  const [modeTransportation, setModeTransportation] = useState("Walking");
  const [imageURL, setImageURL] = useState(null);
  const useDefaultBackground = true;

  const changeModeTransportation = (e, newTransportation) => {
    if (newTransportation !== null) {
      setModeTransportation(newTransportation);
    }
  };

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

  return (
    <div id="homepage-container">
      <Item id="homepage-form-outline">
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          rowSpacing={2}
        >
          <Grid item sx={{ width: "100%" }}>
            {/* <Item> */}
            <TextField
              required
              id="textfield-address-one"
              label="First Address"
              // margin="normal"
              variant="standard"
              fullWidth
            />
            {/* </Item> */}
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            {/* <Item> */}
            <TextField
              required
              id="textfield-address-two"
              label="Second Address"
              // margin="normal"
              variant="standard"
              fullWidth
            />
            {/* </Item> */}
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            {/* <Item> */}
            <TextField
              id="textfield-activity"
              label="Activity (Optional)"
              // margin="normal"
              variant="standard"
              fullWidth
            />
            {/* </Item> */}
          </Grid>
          <Grid item>
            <div id="transportation-label">Mode of Transportation:</div>
            {/* <Item> */}
            <ToggleButtonGroup
              value={modeTransportation}
              exclusive
              onChange={changeModeTransportation}
            >
              <ToggleButton value="Driving">
                {" "}
                <DirectionsCarIcon />{" "}
              </ToggleButton>
              <ToggleButton
                value="Transit"
                // sx={{
                //   "& .MuiTouchRipple-root": {
                //     color: "#1976d2",
                //   },
                // }}
              >
                {" "}
                <DirectionsTransitIcon />{" "}
              </ToggleButton>
              <ToggleButton value="Walking">
                {" "}
                <DirectionsWalkIcon />{" "}
              </ToggleButton>
              <ToggleButton value="Cycling">
                {" "}
                <DirectionsBikeIcon />{" "}
              </ToggleButton>
              <ToggleButton value="Flights">
                {" "}
                <FlightIcon />{" "}
              </ToggleButton>
            </ToggleButtonGroup>
            {/* </Item> */}
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <Button variant="outlined" id="home-page-form-button">
              Find Activities
            </Button>
          </Grid>
          {/* </Item> */}
        </Grid>
      </Item>
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
