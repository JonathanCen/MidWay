import React, {useState} from "react";
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";

const ModeTransportationSelect = (props) => {
  // Init state
  const [transportation, setTransportation] = useState('Walking');

  // Init local variables
  const { id, label, helperText, statusCode, removeHelperText } = props;
  const listOfTransportation = ["Driving", "Transit", "Walking", "Cycling"];

  // Handles select
  const changeTransportation = (e) => {
    const newTransportation = e.target.value;
    setTransportation(newTransportation);
    props.onNewSelect(newTransportation);
  }

  return (
    <TextField
      id={id}
      select
      fullWidth
      label={label}
      value={transportation}
      onChange={changeTransportation}
      helperText={!removeHelperText ? helperText : ''}
      FormHelperTextProps={{
        sx: {
          color:  statusCode ? '#2e7d32' : ''
        }
      }}
      color={statusCode ? 'success' : ''}
      focused={statusCode}
      InputProps={{
        startAdornment: (
        <InputAdornment position="start">
          {
            transportation === "Driving" 
              ? <DirectionsCarIcon/> 
              : transportation === "Transit"
                ? <DirectionsTransitIcon/>
                : transportation === "Walking"
                  ? <DirectionsWalkIcon/>
                  : <DirectionsBikeIcon/>
          }
        </InputAdornment>
        )
      }}
    >
      {listOfTransportation.map((activity, index) => (
        <MenuItem key={index} value={activity}>
          {activity}
        </MenuItem>
      ))}
    </TextField>
  )

}

export default ModeTransportationSelect;