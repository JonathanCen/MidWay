import React from "react";
import { Paper } from "@mui/material";

function Item(props) {
  return (
    <Paper
      id={props.id}
      elevation={6}
      sx={{
        padding: "10px",
        backgroundColor: "#fff",
        borderRadius: "3%"
      }}
    >
      {props.children}
    </Paper>
  );
}

export default Item;
