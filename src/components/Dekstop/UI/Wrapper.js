import React from "react";
import { Outlet } from "react-router-dom";

const Wrapper = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Wrapper;
