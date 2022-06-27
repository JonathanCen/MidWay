import React, { useState } from "react";
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import CelebrationTwoToneIcon from '@mui/icons-material/CelebrationTwoTone';

const HomePageActivityInput = (props) => {
  const { id, label, helperText, required } = props;
  const [activity, setActivity] = useState("");

  // Handles when user types and character into the input
  const handleChange = (e) => {
    setActivity(e.target.value);
    props.onNewSelect(e.target.value);
  }


  return (
    <FormControl id={id}>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <OutlinedInput
          startAdornment={
            <InputAdornment position="start">
              <CelebrationTwoToneIcon />
            </InputAdornment>
          }
          required={required}
          onChange={handleChange}
          label={label}
          value={activity}
          type="text"
        />
        <FormHelperText id={`${id}-helper-text`}>
          {helperText}
        </FormHelperText>
    </FormControl>

  );
}

export default HomePageActivityInput;