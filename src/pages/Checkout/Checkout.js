import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import classes from "./Checkout.module.css";
import SimpleStepper from "../../components/Checkout/Stepper/SimpleStepper";
import Ticket from "../../components/Checkout/Ticket/Ticket";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectOrderInfo } from "../../store/Order/order.selector";
import { selectCartItems } from "../../store/cart/cart.selector";
import { setSuccess } from "../../store/ui/ui.action";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const orderInfo = useSelector(selectOrderInfo);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  const changePageHandler = (page) => {
    let location;
    if (page == 0) {
      location = "/checkout";
    } else if (page == 1) {
      location = "/checkout/shipping";
    } else if (page == 2) {
      location = "/checkout/payment";
    } else if (page == 3) {
      dispatch(setSuccess({ status: true, for: "order" }));
      location = "/success";
    }
    navigate(location, { replace: true });
    setCurrentPage(page);
  };

  useEffect(() => {
    if (
      (!orderInfo?.contactInformation || !orderInfo?.shippingAddress) &&
      currentPage > 0
    ) {
      navigate("/checkout");
      setCurrentPage(0);
    } else if (!orderInfo?.shippingMethod && currentPage > 1) {
      navigate("/checkout/shipping");
      setCurrentPage(1);
    }
    if (location.pathname.endsWith("/checkout")) {
      setCurrentPage(0);
    } else if (location.pathname.endsWith("/shipping")) {
      setCurrentPage(1);
    } else if (location.pathname.endsWith("/payment")) {
      setCurrentPage(2);
    }
    return () => {
      console.log("leave");
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "auto",
      }}
    >
      <div className={classes["left-div"]}>
        <Typography
          variant="h3"
          sx={{
            letterSpacing: "2px",
            fontWeight: "bold",
            fontFamily: "Georgia, 'Times New Roman', Times, serif",
          }}
        >
          shopZee
        </Typography>
        <SimpleStepper currentPage={currentPage + 1} />
        <Outlet context={{ onPageChange: changePageHandler }} />
      </div>
      <div className={classes["right-div"]}>
        <Ticket />
      </div>
    </Box>
  );
};

export default Checkout;
