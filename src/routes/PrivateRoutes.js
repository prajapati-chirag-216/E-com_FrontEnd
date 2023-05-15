import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const PrivateRoutes = (props) => {
  const success = useSelector((state) => state.ui.success);
  try {
    if (success) {
      return <Outlet />;
    }
    throw { message: props.message, status: 404 };
  } catch (err) {
    throw err;
  }
};

export default PrivateRoutes;
