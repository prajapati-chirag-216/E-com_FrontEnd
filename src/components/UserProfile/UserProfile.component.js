import { useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import { Tabs, Tab, Box } from "@mui/material";
import MyOrders from "./MyOrders/myOrders.component";
import PropTypes from "prop-types";
import "./userprofile.styles.scss";
import MyProfile from "./MyProfile/myprofile.component";
import AccountSettings from "./AccountSettings/AccountSetting";

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
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="profileTabsContainer">
      <Box sx={{ bgcolor: "background.paper", display: "flex" }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRight: 1,
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
          }}
        >
          <Tab
            style={{
              margin: "2rem 0 2rem 0",
              width: "18rem",
              transform: "scale(1.3)",
            }}
            icon={<AccountBoxIcon />}
            label="My Profile"
          />
          <Tab
            style={{
              margin: "2rem 0 2rem 0",
              width: "18rem",
              transform: "scale(1.3)",
            }}
            icon={<LocalShippingIcon />}
            label="My Orders"
          />
          <Tab
            style={{
              margin: "2rem 0 2rem 0",
              width: "18rem",
              transform: "scale(1.3)",
            }}
            icon={<SettingsApplicationsIcon />}
            label="Account Settings"
          />
        </Tabs>

        <div className="tabPanelContainer">
          <TabPanel value={value} index={0}>
            <MyProfile />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <MyOrders />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AccountSettings />
          </TabPanel>
        </div>
      </Box>
    </div>
  );
};

export default UserProfile;
