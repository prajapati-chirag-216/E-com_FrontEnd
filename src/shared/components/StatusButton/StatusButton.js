import React from "react";
import { Button, CircularProgress, useMediaQuery } from "@mui/material";

const StatusButton = (props) => {
  const matches = useMediaQuery("(max-width:700px)");
  return (
    <Button
      variant="contained"
      component="label"
      onClick={props.onClick}
      sx={{
        width: matches ? "10rem" : "20rem",
        size: matches ? "0.7rem" : "4rem",
        padding: matches ? "0.5rem" : "1rem",
        gap: matches ? "0.5rem" : "1rem",
        backgroundColor: "black",
        color: "white",
        cursor: props.isLoading.status ? "not-allowed" : "pointer",
        "&:hover": {
          backgroundColor: "black",
        },
        ...props.style,
      }}
      disabled={props.isLoading.status}
    >
      {props.isLoading.status ? (
        <CircularProgress color="inherit" size={33} />
      ) : (
        props.children
      )}
    </Button>
  );
};

export default StatusButton;
