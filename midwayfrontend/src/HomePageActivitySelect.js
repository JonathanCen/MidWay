import React, { useEffect, useState } from "react";
// import InputLabel from '@mui/material/InputLabel';
// import FormHelperText from '@mui/material/FormHelperText';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import CelebrationTwoToneIcon from "@mui/icons-material/CelebrationTwoTone";
import InputAdornment from "@mui/material/InputAdornment";

const HomePageActivitySelect = (props) => {
  // Init state
  // const [activity, setActivity] = useState('Any');

  // Init local variables
  const { id, label, helperText, statusCode, removeHelperText, activity } =
    props;
  const listOfActivities = [
    "Any",
    "Arts & Entertainment",
    "Beauty & Spas",
    "Food",
    "Hotels & Travel",
    "Nightlife",
    "Restaurants",
    "Shopping",
  ];

  const changeActivity = (e) => {
    const newActivity = e.target.value;
    // setActivity(newActivity);
    props.onNewSelect(newActivity);
  };

  return (
    <TextField
      id={id}
      select
      fullWidth
      label={label}
      value={activity}
      onChange={changeActivity}
      helperText={!removeHelperText ? helperText : ""}
      FormHelperTextProps={{
        sx: {
          color: statusCode ? "#2e7d32" : "",
        },
      }}
      color={statusCode ? "success" : ""}
      focused={statusCode}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <CelebrationTwoToneIcon />
          </InputAdornment>
        ),
      }}
    >
      {listOfActivities.map((activity, index) => (
        <MenuItem key={index} value={activity}>
          {activity}
        </MenuItem>
      ))}
    </TextField>

    // <FormControl id={id}>
    //   <InputLabel htmlFor={id}>{label}</InputLabel>
    //   <Select
    //     labelId={id}
    //     label={label}
    //     value={activity}
    //     onChange={changeActivity}
    //     startAdornment={
    //       <InputAdornment position="start">
    //         <CelebrationTwoToneIcon />
    //       </InputAdornment>
    //     }
    //   >
    //     <MenuItem value="Any">Any</MenuItem>
    //   </Select>
    //   <FormHelperText id={`${id}-helper-text`}>{helperText}</FormHelperText>
    // </FormControl>
  );
};

export default HomePageActivitySelect;
