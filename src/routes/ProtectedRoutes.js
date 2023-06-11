import React, { Fragment, Suspense, useEffect, useState } from "react";
import { Await, Navigate, Outlet, useLoaderData } from "react-router-dom";
import { fetchUserProfile } from "../utils/api";
import LoadingSpinner from "../components/Dekstop/UI/LoadingSpinner";
import { useDispatch } from "react-redux";
import { setSnackBar } from "../store/ui/ui.action";

const ProtectedRoutes = (props) => {
  const dispatch = useDispatch();
  const loaderData = useLoaderData();
  useEffect(() => {
    if (!loaderData.userProfile) {
      dispatch(
        setSnackBar({
          status: true,
          message: "You need to login to your account",
          severity: "info",
        })
      );
    }
  }, []);
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Await resolve={loaderData}>
        {(data) => (data.userProfile ? <Outlet /> : <Navigate to="/login" />)}
      </Await>
    </Suspense>
  );
};
export async function loader() {
  let res;
  try {
    res = fetchUserProfile();
  } catch (err) {
    throw err;
  }
  return res;
}
export default ProtectedRoutes;
