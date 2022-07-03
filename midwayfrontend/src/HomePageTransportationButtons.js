import React, {useState} from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
// import FlightIcon from "@mui/icons-material/Flight";

const HomePageTransportationButtons = (props) => {
  // const [transportation, setTransportation] = useState("Walking");
  const { transportation } = props;

  const changeTransportation = (e, newTransportation) => {
    if (newTransportation !== null) {
      // Update component state
      // setTransportation(newTransportation);

      // Update parent's form state
      props.onButtonChange(newTransportation);
    }
  };

  return (
    <React.Fragment>
      <div id="transportation-label">Mode of Transportation:</div>
      <ToggleButtonGroup
        value={transportation}
        exclusive
        color="primary"
        onChange={changeTransportation}
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
        {/* <ToggleButton value="Flights" sx={{width: "100%"}}>
          <FlightIcon />
        </ToggleButton> */}
      </ToggleButtonGroup>
    </React.Fragment>
  )
}

export default HomePageTransportationButtons;