import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Filter from "../Filter/Filter";
import classes from "./Header.module.css";
import { useSelector } from "react-redux";
import { selectCatagoryName } from "../../../store/catagories/catagories.selector";
const Header = () => {
  const [filterModalState, setFilterModalState] = useState(false);
  const catagoryName = useSelector(selectCatagoryName);
  const openFilterModalHandler = () => {
    setFilterModalState((prevState) => !prevState);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        padding: "1rem",
        width: "100%",
      }}
    >
      <Typography
        align="center"
        sx={{
          letterSpacing: "5px",
          fontSize: "2rem",
          textTransform: "uppercase",
          fontFamily:
            "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
        }}
      >
        {catagoryName}
      </Typography>
      <div className={classes["filter"]}>
        <div onClick={openFilterModalHandler}>
          <span>Sort</span>
          <KeyboardArrowDownIcon
            sx={{
              transition: "all 400ms",
              transform: filterModalState ? "rotate(-180deg)" : "",
            }}
          />
        </div>
        <Filter status={filterModalState} />
      </div>
    </Box>
  );
};

export default Header;
