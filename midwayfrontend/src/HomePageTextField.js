import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";

import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

import AddLocationAltTwoToneIcon from '@mui/icons-material/AddLocationAltTwoTone';
import CelebrationTwoToneIcon from '@mui/icons-material/CelebrationTwoTone';

const HomePageTextField = (props) => {
  const { id, label, helperText, required } = props;
  const [address, setAddress] = useState("");
  const inputRef = useRef(null);

  // Stores the autocomplete google object
  let autoComplete;

  // Handles when user types and character into the input
  const handleChange = (e) => {
    setAddress(e.target.value);
    props.onTextChange(e.target.value);
  }

  // Handles when user selects a location from autocomplete options
  const handlePlaceSelect = async () => {
    const place = autoComplete.getPlace();
    if (place.formatted_address !== undefined) {
      setAddress(place.formatted_address);
      props.onTextChange(place.formatted_address);
    }
  }

  useEffect(() => {
    // Hook the textboxes to be connected to google places api
    autoComplete = new window.google.maps.places.Autocomplete(
      inputRef.current, { 
        types: ["address"],
        fields: ["address_components", "formatted_address"] 
    });
    
    autoComplete.addListener("place_changed", () => {
      handlePlaceSelect();
    });
  }, [])


  return (
      //   <FormControl>
      //   <InputLabel htmlFor="component-outlined">Name</InputLabel>
      //   <OutlinedInput
      //     id="component-outlined"
      //     // value={name}
      //     // onChange={handleChange}
      //     label="Name"
      //   />
      // </FormControl>

    <FormControl id={id}>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <OutlinedInput
          startAdornment={
            <InputAdornment position="start">
              {label.includes("Location") ? <AddLocationAltTwoToneIcon /> : <CelebrationTwoToneIcon /> }
            </InputAdornment>
          }
          inputRef={inputRef}
          required={required}
          onChange={handleChange}
          label={label}
          autoComplete="off"
          value={address}
          type="text"
        />
        <FormHelperText id={`${id}-helper-text`}>
          {helperText}
        </FormHelperText>
    </FormControl>


    // <TextField
    //   required={props.required}
    //   id={props.id}
    //   label={props.label}
    //   inputRef={inputRef}
    //   // size="small"
    //   sx={{
    //     font: "Anek Latin",
    //   }}
    //   // variant="standard"
    //   fullWidth
    // />
  );
}

export default HomePageTextField;