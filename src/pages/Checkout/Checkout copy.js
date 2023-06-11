import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import classes from "./Checkout.module.css";
import SimpleStepper from "../../components/Checkout/Stepper/SimpleStepper";
import Information from "../../components/Checkout/Information/Information";
import Ticket from "../../components/Checkout/Ticket/Ticket";
import Shipping from "../../components/Checkout/Shipping/Shipping";
import Payment from "../../components/Checkout/Paymet/Payment";
import { useSelector } from "react-redux";
import { selectOrderInfo } from "../../store/Order/order.selector";
const Checkout = () => {
  const orderInfo = useSelector(selectOrderInfo);
  useEffect(() => {
    if (!orderInfo?.contactInformation || !orderInfo?.shippingAddress) {
      setCurruntPage(0);
    } else if (!orderInfo?.shippingMethod) {
      setCurruntPage(1);
    } else {
      setCurruntPage(2);
    }
  }, []);
  const [curruntPage, setCurruntPage] = useState(0);
  const changePageHandler = (pageNo) => setCurruntPage(pageNo);
  const pageElements = [
    <Information onPageChange={changePageHandler} />,
    <Shipping onPageChange={changePageHandler} />,
    <Payment onPageChange={changePageHandler} />,
  ];
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
            textTransform: "uppercase",
            fontFamily: "Georgia, 'Times New Roman', Times, serif",
          }}
        >
          one Center
        </Typography>
        <SimpleStepper curruntPage={curruntPage + 1} />
        {pageElements[curruntPage]}
      </div>
      <div className={classes["right-div"]}>
        <Ticket />
      </div>
    </Box>
  );
};

export default Checkout;
