import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { selectSuccess } from "../store/ui/ui.selector";

const PrivateRoutes = (props) => {
  const success = useSelector(selectSuccess);
  console.log(success);
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
