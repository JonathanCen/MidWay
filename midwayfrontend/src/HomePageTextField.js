import React from "react";
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
  
  const handleChange = (e) => {
    props.onTextChange(e.target.value);
  }

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
          required={required}
          onChange={handleChange}
          label={label}
            startAdornment={
            <InputAdornment position="start">
              {label.includes("Location") ? <AddLocationAltTwoToneIcon /> : <CelebrationTwoToneIcon /> }
            </InputAdornment>
          }
        />
        <FormHelperText id={`${id}-helper-text`}>
          {helperText}
        </FormHelperText>
    </FormControl>


    // <TextField
    //   required={props.required}
    //   id={props.id}
    //   label={props.label}
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