import React from "react";
import { LoadingButton } from "@mui/lab";
import { useMediaQuery } from "@mui/material";

const StatusButton = (props) => {
  const matches = useMediaQuery("(max-width:700px)");
  return (
    <LoadingButton
      variant="contained"
      component="label"
      loading={props.isLoading.status}
      loadingPosition="start"
      startIcon={props.icon}
      onClick={props.onClick}
      sx={{
        width: matches ? "10rem" : "20rem",
        fontSize: matches ? "0.7rem" : "1rem",
        padding: matches ? "0.5rem" : "1rem",
        gap: matches ? "0.5" : "1rem",
        backgroundColor: "black",
        color: "white",
        borderRadius: "2px",
        cursor: props.isLoading.status ? "not-allowed" : "pointer",
        "&:hover": {
          backgroundColor: "black",
        },
      }}
      disabled={props.isLoading.status}
    >
      {props.children}
    </LoadingButton>
  );
};

export default StatusButton;
