import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import Home from "@mui/icons-material/Home";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import GroupsIcon from "@mui/icons-material/Groups";
import { useLocation, useNavigate } from "react-router-dom";
const ManuList = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      onClick={props.toggleDrawer}
      onKeyDown={props.toggleDrawer}
    >
      <List>
        <ListItem
          sx={{
            backgroundColor: location.pathname.endsWith("/home")
              ? "rgb(230,230,230)"
              : "transparent",
          }}
          disablePadding
          onClick={props.onClose}
        >
          <ListItemButton
            sx={{
              height: "120px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            onClick={() => {
              navigate("/home");
            }}
          >
            <ListItemIcon
              sx={{ justifyContent: "center", transform: "scale(1.2)" }}
            >
              <Home
                fontSize="large"
                sx={{
                  color: location.pathname.endsWith("/home")
                    ? "rgb(60,60,60)"
                    : "gray",
                }}
              />
            </ListItemIcon>
            <Typography
              sx={{
                color: location.pathname.endsWith("/home")
                  ? "rgb(60,60,60)"
                  : "gray",
              }}
            >
              Home
            </Typography>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            backgroundColor: location.pathname.endsWith("/aboutus")
              ? "rgb(230,230,230)"
              : "transparent",
          }}
          disablePadding
          onClick={props.onClose}
        >
          <ListItemButton
            sx={{
              height: "120px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            onClick={() => {
              navigate("/aboutus");
            }}
          >
            <ListItemIcon sx={{ justifyContent: "center" }}>
              <GroupsIcon
                fontSize="large"
                sx={{
                  color: location.pathname.endsWith("/aboutus")
                    ? "rgb(60,60,60)"
                    : "gray",
                }}
              />
            </ListItemIcon>
            <Typography
              sx={{
                color: location.pathname.endsWith("/aboutus")
                  ? "rgb(60,60,60)"
                  : "gray",
              }}
            >
              About Us
            </Typography>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            backgroundColor: location.pathname.endsWith("/contactus")
              ? "rgb(230,230,230)"
              : "transparent",
          }}
          disablePadding
          onClick={props.onClose}
        >
          <ListItemButton
            sx={{
              height: "120px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            onClick={() => {
              navigate("/contactus");
            }}
          >
            <ListItemIcon style={{ justifyContent: "center" }}>
              <QuestionAnswerIcon
                fontSize="large"
                sx={{
                  color: location.pathname.endsWith("/contactus")
                    ? "rgb(60,60,60)"
                    : "gray",
                }}
              />
            </ListItemIcon>
            <Typography
              sx={{
                color: location.pathname.endsWith("/contactus")
                  ? "rgb(60,60,60)"
                  : "gray",
              }}
            >
              Contact Us
            </Typography>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default ManuList;
