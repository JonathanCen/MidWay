import React, {useState} from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import FlightIcon from "@mui/icons-material/Flight";

const HomePageModeTransportationButtons = () => {
  const [modeTransportation, setModeTransportation] = useState("Walking");

  const changeModeTransportation = (e, newTransportation) => {
    if (newTransportation !== null) {
      setModeTransportation(newTransportation);
    }
  };

  return (
    <React.Fragment>
      <div id="transportation-label">Mode of Transportation:</div>
      <ToggleButtonGroup
        value={modeTransportation}
        exclusive
        color="primary"
        onChange={changeModeTransportation}
        sx={{
          width: "100%",
          justifyContent: "center",
        }}
      >
        <ToggleButton value="Driving" sx={{width: "100%"}}>
          <DirectionsCarIcon />
        </ToggleButton>
        <ToggleButton value="Transit" sx={{width: "100%"}}>
          <DirectionsTransitIcon />
        </ToggleButton>
        <ToggleButton value="Walking" sx={{width: "100%"}}>
          <DirectionsWalkIcon />
        </ToggleButton>
        <ToggleButton value="Cycling" sx={{width: "100%"}}>
          <DirectionsBikeIcon />
        </ToggleButton>
        <ToggleButton value="Flights" sx={{width: "100%"}}>
          <FlightIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </React.Fragment>
  )
}

export default HomePageModeTransportationButtons;