import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const element = <Navigate to={props.destination} replace />;
  return isLoggedIn ? <Outlet /> : element;
};

export default ProtectedRoutes;
