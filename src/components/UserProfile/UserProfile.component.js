import { useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import { Tabs, Tab, Box, useMediaQuery, Divider } from "@mui/material";
import MyOrders from "./MyOrders/myOrders.component";
import PropTypes from "prop-types";
import "./userprofile.styles.scss";
import MyProfile from "./MyProfile/myprofile.component";
import AccountSettings from "./AccountSettings/AccountSetting";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const UserProfile = () => {
  const matches = useMediaQuery("(max-width:1400px)");
  const mobileMatches = useMediaQuery("(max-width:700px)");
  const location = useLocation();
  const pathIndex = location.pathname.endsWith("/myProfile")
    ? 0
    : location.pathname.endsWith("/orders")
    ? 1
    : 2;
  const [value, setValue] = useState(pathIndex);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigateHandler = (location) => navigate(`/myProfile${location}`);

  return (
    <div className="profileTabsContainer">
      <Tabs
        orientation={!matches ? "vertical" : "horizontal"}
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRight: 1,
          flex: 1,
          borderColor: "divider",
          "& .MuiTabs-indicator": {
            backgroundColor: "black",
          },
          "& .MuiTab-root": {
            color: "gray",
          },
          "& .MuiTab-root.Mui-selected": {
            color: "black",
          },
          borderWidth: !matches ? "1px" : "0px",
        }}
      >
        <Tab
          sx={{
            margin: !mobileMatches ? "2rem 0 2rem 0" : "1rem 0 1rem 0",
            width: !mobileMatches ? "18rem" : "13rem",
            fontSize: "1rem",
          }}
          icon={<AccountBoxIcon sx={{ fontSize: "2rem" }} />}
          label="My Profile"
          onClick={navigateHandler.bind(null, "")}
        />
        <Tab
          sx={{
            margin: !mobileMatches ? "2rem 0 2rem 0" : "1rem 0 1rem 0",
            width: !mobileMatches ? "18rem" : "13rem",
            fontSize: "1rem",
          }}
          icon={<LocalShippingIcon sx={{ fontSize: "2rem" }} />}
          label="My Orders"
          onClick={navigateHandler.bind(null, "/orders")}
        />
        <Tab
          sx={{
            margin: !mobileMatches ? "2rem 0 2rem 0" : "1rem 0 1rem 0",
            width: !mobileMatches ? "18rem" : "13rem",
            fontSize: "1rem",
          }}
          icon={<SettingsApplicationsIcon sx={{ fontSize: "2rem" }} />}
          label="Account Settings"
          onClick={navigateHandler.bind(null, "/account")}
        />
      </Tabs>
      {matches && <Divider sx={{ width: "95%" }} />}
      <div className="tabPanelContainer">
        <Outlet />
      </div>
    </div>
  );
};

export default UserProfile;
