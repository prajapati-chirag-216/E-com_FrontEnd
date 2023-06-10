import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import classes from "./Tabs.module.css";
import { useNavigate } from "react-router-dom";
const TABS = ["home", "about us", " contact us", "customer reviews"];
const Tabs = () => {

  const navigate = useNavigate();

  const changePageHandler = (tab) =>{

    let newTabe  = tab.replace(/\s/g,'');

         navigate(`/${newTabe}`)
  }

  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        gap: "4rem",
      }}
    >
      {TABS.map((tab, index) => (
        <span  onClick={changePageHandler.bind(null,tab)}key={index} className={classes["tabs"]}>
          {tab}
        </span>
      ))}
    </Box>
  );
};

export default Tabs;
