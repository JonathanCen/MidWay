import React, { useState, useRef, useEffect, forwardRef  } from "react";
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import AddLocationAltTwoToneIcon from '@mui/icons-material/AddLocationAltTwoTone';

const HomePageAddressInput = forwardRef((props, ref) => {
  
  const { id, label, helperText, required, statusCode, removeHelperText, address } = props;
  // const [address, setAddress] = useState("");
  const inputRef = useRef(null);

  // Stores the autocomplete google object
  // const [autoComplete, setAutoComplete] = useState(null);
  let autoComplete;

  // Handles when user types and character into the input
  const handleChange = (e) => {
    // setAddress(e.target.value);
    props.onTextChange(e.target.value);
    props.onSelectDropDown(false);
  }

  // Handles when user selects a location from autocomplete options
  const handlePlaceSelect = async () => {
    const place = autoComplete.getPlace();
    if (place.formatted_address !== undefined) {
      // setAddress(place.formatted_address);
      props.onTextChange(place.formatted_address);
      props.onSelectDropDown(true);
    }
  }

  // Checkout documentation
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
  }, []);


  return (
    <FormControl id={id} error={statusCode === 1} color={statusCode === 2 ? 'success' : ''} focused={statusCode === 2}>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <OutlinedInput
          startAdornment={
            <InputAdornment position="start">
              <AddLocationAltTwoToneIcon />
            </InputAdornment>
          }
          ref={ref}
          inputRef={inputRef}
          required={required}
          onChange={handleChange}
          label={label}
          autoComplete="off"
          value={address}
          type="text"
        />
        { 
          !removeHelperText && 
          <FormHelperText id={`${id}-helper-text`} 
            sx={{
              color: statusCode === 2 ? '#2e7d32' : ''
            }}
          >
            {helperText}
          </FormHelperText>
        }
    </FormControl>

  );
});

export default HomePageAddressInput;