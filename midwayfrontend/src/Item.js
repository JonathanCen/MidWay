import React from "react";
import { Paper } from "@mui/material";

const Item = (props) => {
  const { id, isBusinessInformation } = props;
  return (
    <Paper
      id={id}
      elevation={6}
      sx={{
        padding: isBusinessInformation ? "5px" : "10px",
        margin: isBusinessInformation ? "10px" : "0px",
        backgroundColor: "#fff",
        borderRadius: "3%",
        // height: "100%", width: "100%"
      }}
    >
      {props.children}
    </Paper>
  );
}

export default Item;
