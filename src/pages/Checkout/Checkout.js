import React from "react";
import { Box, Typography } from "@mui/material";
import classes from "./Checkout.module.css";
import SimpleStepper from "../../components/Checkout/Stepper/SimpleStepper";
import Information from "../../components/Checkout/Information/Information";
import Ticket from "../../components/Checkout/Ticket/Ticket";
import Shipping from "../../components/Checkout/Shipping/Shipping";
import Payment from "../../components/Checkout/Paymet/Payment";
const Checkout = () => {
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
        <SimpleStepper />
        <Information />
        {/* <Shipping /> */}
        {/* <Payment /> */}
      </div>
      <div className={classes["right-div"]}>
        <Ticket />
      </div>
    </Box>
  );
};

export default Checkout;
