import React from "react";
import classes from "./Controller.module.css";
import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
const Controller = (props) => {
  return (
    <div className={classes["controll-div"]}>
      <span>
        <ArrowBackIosIcon fontSize="small" /> Return to {props.returnTo}
      </span>
      <Button
        variant="contained"
        sx={{
          fontSize: "1.2rem",
          letterSpacing: "2px",
          backgroundColor: "black",
          "&:hover": {
            backgroundColor: "black",
          },
          padding: "1rem",
        }}
      >
        Continue to {props.continueTo}
      </Button>
    </div>
  );
};

export default Controller;
