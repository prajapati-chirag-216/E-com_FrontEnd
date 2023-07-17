import { Outlet } from "react-router-dom";
import React, { Fragment } from "react";
import MainNavigation from "../Header/MainNavigation";
import Footer from "../../Footer/Footer";
import "./Layout.style.scss";
import { useMediaQuery } from "@mui/material";
const Layout = () => {
  const matches = useMediaQuery("(max-width:500px)");
  return (
    <div style={{ width: !matches ? "auto" : "max-content" }}>
      <MainNavigation />
      <div className="main-div">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
