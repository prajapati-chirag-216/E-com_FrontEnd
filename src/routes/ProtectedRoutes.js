import React, { Fragment, Suspense, useEffect, useState } from "react";
import { Await, Navigate, Outlet, useLoaderData } from "react-router-dom";
import { fetchUserProfile } from "../utils/api";
import LoadingSpinner from "../components/Dekstop/UI/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { setSnackBar } from "../store/ui/ui.action";
import { selectCartItems } from "../store/cart/cart.selector";

const ProtectedRoutes = (props) => {
  const dispatch = useDispatch();
  const loaderData = useLoaderData();
  const cartItems = useSelector(selectCartItems);
  useEffect(() => {
    if (!loaderData.userProfile) {
      console.log('her')
      dispatch(
        setSnackBar({
          status: true,
          message: "You need to login to your account",
          severity: "info",
        })
      );
    } else if ( !props.isProfilePage  && cartItems.length === 0) {
      dispatch(
        setSnackBar({
          status: true,
          severity: "info",
          message: "Your cart is empty",
        })
      );
    }
  }, []);
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Await resolve={loaderData}>
        {(data) =>
          data?.userProfile ? (
            <Outlet />
          ) : (
            <Navigate to={!data?.userProfile ? "/login" : "/home"} />
          )
        }
      </Await>
    </Suspense>
  );
};
export async function loader() {
  let res;
  try {

    res = await fetchUserProfile();

  } catch (err) {
    throw err;
  }
  return res;
}
export default ProtectedRoutes;
