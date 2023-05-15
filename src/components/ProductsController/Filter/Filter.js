import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import classes from "./Filter.module.css";
const Filter = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        position: "absolute",
        top: "3.2rem",
        right: "-4rem",
        zIndex: 5,
        transition: "height 300ms",
        height: props.status ? "22.6rem" : "0rem",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          padding: "2rem",
          display: "flex",

          transition: "all 500ms",
          transform: props.status ? "translateY(0rem)" : "translateY(-25rem)",
          flexDirection: "column",
          gap: "2rem",
          width: "max-content",
          cursor: "auto",
        }}
      >
        <span className={classes.filters}>popularity</span>
        <span className={classes.filters}>best selling</span>
        <span className={classes.filters}>Date, new to old</span>
        <span className={classes.filters}>Date, old to new</span>
        <span className={classes.filters}>price, hight to low</span>
        <span className={classes.filters}>price, low to high</span>
      </Paper>
    </Box>
  );
};
export default Filter;
