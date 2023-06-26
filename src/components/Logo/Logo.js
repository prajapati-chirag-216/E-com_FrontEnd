import React from "react";
import "./Logo.style.scss";
import { Typography } from "@mui/material";
const Logo = () => {
  return (
    <div className="LoginPageHeaderContainer">
      <Typography
        sx={{
          letterSpacing: { xs: "1px", md: "4px" },
          fontSize: { xs: "3rem", md: "5rem" },
        }}
        variant="h1"
      >
        shop<span>Z</span>ee
      </Typography>
    </div>
  );
};

export default Logo;
