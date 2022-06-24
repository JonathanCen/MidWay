import React from "react";
import { Paper } from "@mui/material";

function Item(props) {
  return (
    <Paper
      id={props.id}
      elevation={8}
      sx={{
        padding: "10px",
        textAlign: "center",
        backgroundColor: "#fff",
      }}
    >
      {props.children}
    </Paper>
  );
}

export default Item;
