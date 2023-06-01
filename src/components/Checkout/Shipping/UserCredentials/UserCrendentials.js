import React from "react";
import { Typography } from "@mui/material";
const UserCrendentials = (props) => {
  return (
    <div>
      <Typography fontSize="1.1rem" letterSpacing="1px" flex="1">
        {props.label}
      </Typography>
      <Typography
        fontSize="1.1rem"
        color="rgb(80,80,80)"
        letterSpacing="1px"
        flex="6"
      >
        {props.value}
      </Typography>
      <Typography
        flex="1"
        align="right"
        letterSpacing="1px"
        sx={{
          cursor: "pointer",
          "&:hover": {
            color: "black",
          },
        }}
        onClick={props.onClick}
      >
        Change
      </Typography>
    </div>
  );
};

export default UserCrendentials;
