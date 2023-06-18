import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { selectSuccess } from "../store/ui/ui.selector";

const PrivateRoutes = (props) => {
  const success = useSelector(selectSuccess);
  try {
    if (success.status) {
      return <Outlet context={{ for: success.for }} />;
    }
    throw { message: props.message, status: 404 };
  } catch (err) {
    throw err;
  }
};

export default PrivateRoutes;
