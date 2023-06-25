import { Outlet } from "react-router-dom";
import React, { Fragment } from "react";
import MainNavigation from "../Header/MainNavigation";
import Footer from "../../Footer/Footer";
import  './Layout.style.scss'
const Layout = (props) => {
  return (
  <div>
 <MainNavigation />
      <div className="main-div">
        <Outlet />
      </div>
      <Footer />

  </div>
    // <div  className="homePageContainer">
     
    // </div>
  );
};

export default Layout;
