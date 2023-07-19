import React, { useState } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ManuList from "./ManuList";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, useMediaQuery } from "@mui/material";

const Drawer = (props) => {
  // const matches=useMediaQuery("(max-width")
  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawerHandler = () => {
    setDrawerState(true);
  };
  const closeDrawerHandler = () => {
    setDrawerState(false);
  };

  return (
    <React.Fragment>
      <IconButton
        size="small"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
        onClick={toggleDrawerHandler}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={props.drawerState || drawerState}
        onClose={closeDrawerHandler}
        onOpen={toggleDrawerHandler}
      >
        <ManuList onClose={closeDrawerHandler} />
      </SwipeableDrawer>
    </React.Fragment>
  );
};
export default Drawer;
