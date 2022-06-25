import React from "react";
import TextField from "@mui/material/TextField";

const HomePageTextField = (props) => {
  return (
    <TextField
      required={props.required}
      id={props.id}
      label={props.label}
      // size="small"
      sx={{
        font: "Anek Latin",
      }}
      // variant="standard"
      fullWidth
    />
  );
}

export default HomePageTextField;