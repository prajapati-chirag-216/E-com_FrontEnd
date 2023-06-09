import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import Home from '@mui/icons-material/Home';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import GroupsIcon from '@mui/icons-material/Groups';
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
        <ListItem sx={{transform:{xs:'scale(1.8)',md:'scale(1)'},marginTop:{xs:'3rem',md:'0rem'}}}disablePadding onClick={props.onClose}>
          <ListItemButton
            sx={{height: "100px", display: "flex", flexDirection: "column" }}
            onClick={() => {
              navigate("/home");
            }}
          >
            <ListItemIcon style={{ justifyContent: "center" ,transform:'scale(1.2)'}}>
              <Home fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Home" style={{ textAlign: "center" }} />
          </ListItemButton>
        </ListItem>
        <Divider/>
        <ListItem sx={{transform:{xs:'scale(1.8)'},marginTop:{xs:'3rem'}}} disablePadding onClick={props.onClose}>
          <ListItemButton
            sx={{ height: "100px", display: "flex", flexDirection: "column" }}
            onClick={() => {
              navigate("/aboutus");
            }}
          >
            <ListItemIcon style={{ justifyContent: "center" }}>
              < GroupsIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="About Us" style={{ textAlign: "center" }} />
          </ListItemButton>
        </ListItem>
        <Divider/>
        <ListItem sx={{transform:{xs:'scale(1.8)'},marginTop:{xs:'3rem'}}} disablePadding onClick={props.onClose}>
          <ListItemButton
            sx={{ height: "100px", display: "flex", flexDirection: "column" }}
            onClick={() => {
              navigate("/contactus");
            }}
          >
            <ListItemIcon style={{ justifyContent: "center" }}>
              < QuestionAnswerIcon  fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Contact Us" style={{ textAlign: "center" }} />
          </ListItemButton>
        </ListItem>
  
      </List>
    </Box>
  );
};

export default ManuList;
