import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import { Inbox, Dashboard, Category, Inventory2 } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const ManuList = (props) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={props.toggleDrawer}
      onKeyDown={props.toggleDrawer}
    >
      <List>
        <ListItem disablePadding onClick={props.onClose}>
          <ListItemButton
            sx={{ height: "100px", display: "flex", flexDirection: "column" }}
            onClick={() => {
              navigate("/user");
            }}
          >
            <ListItemIcon style={{ justifyContent: "center" }}>
              <Dashboard fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" style={{ textAlign: "center" }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={props.onClose}>
          <ListItemButton
            sx={{ height: "100px", display: "flex", flexDirection: "column" }}
            onClick={() => {
              navigate("/user/customer");
            }}
          >
            <ListItemIcon style={{ justifyContent: "center" }}>
              <Category fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Customer" style={{ textAlign: "center" }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={props.onClose}>
          <ListItemButton
            sx={{ height: "100px", display: "flex", flexDirection: "column" }}
            onClick={() => {
              navigate("/user/product");
            }}
          >
            <ListItemIcon style={{ justifyContent: "center" }}>
              <Inventory2 fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Product" style={{ textAlign: "center" }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={props.onClose}>
          <ListItemButton
            sx={{ height: "100px", display: "flex", flexDirection: "column" }}
            onClick={() => {
              navigate("/user/order");
            }}
          >
            <ListItemIcon style={{ justifyContent: "center" }}>
              <Inbox fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Order" style={{ textAlign: "center" }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default ManuList;
