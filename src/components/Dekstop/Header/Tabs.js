import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import classes from "./Tabs.module.css";
const TABS = ["home", "about us", " contact us", "customer reviews"];
const Tabs = () => {
  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        gap: "4rem",
      }}
    >
      {TABS.map((tab, index) => (
        <span key={index} className={classes["tabs"]}>
          {tab}
        </span>
      ))}
    </Box>
  );
};

export default Tabs;
