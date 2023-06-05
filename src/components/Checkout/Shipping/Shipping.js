import React, { useState } from "react";
import classes from "./Shipping.module.css";
import { Divider, Typography, Box, Radio } from "@mui/material";
import Controller from "../Controller/Controller";
import UserCrendentials from "./UserCredentials/UserCrendentials";
import { useSelector } from "react-redux";
import { selectOrderInfo } from "../../../store/Order/order.selector";
const Shipping = (props) => {
  const [selectedValue, setSelectedValue] = useState(0);
  const shippingMethods = [
    "Online Payment : Free Shipping",
    "Cash on Delivery : ₹5 COD handling charges This shipping option is eligible for Cash on Delivery.",
  ];
  const handleChange = (event) => {
    setSelectedValue(+event.target.value);
  };
  const orderInfo = useSelector(selectOrderInfo);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: "4rem",
        flexDirection: "column",
        paddingBottom: "5rem",
      }}
    >
      <div className={classes["details-container"]}>
        <UserCrendentials
          label="Contact"
          value={orderInfo.contactInformation.email}
          onClick={props.onPageChange.bind(null, 0)}
        />
        <Divider />
        <UserCrendentials
          label="Ship to"
          value={orderInfo.shippingAddress.address}
          onClick={props.onPageChange.bind(null, 0)}
        />
      </div>
      <div className={classes["shipping_details-container"]}>
        <Typography
          sx={{
            color: "rgb(57, 56, 56)",
            fontSize: "1.4rem",
            letterSpacing: "1px",
            marginBottom: "0.3rem",
          }}
        >
          Shipping method
        </Typography>
        <Typography
          sx={{
            backgroundColor: "black",
            width: "100%",
            textTransform: "uppercase",
            textAlign: "center",
            padding: "1rem",
            fontSize: "1.3rem",
            color: "white",
            borderRadius: "8px",
            letterSpacing: "3px",
            wordSpacing: "5px",
            boxSizing: "border-box",
          }}
        >
          We trust you
        </Typography>
        <div className={classes["details-container"]}>
          <div>
            <Radio
              checked={selectedValue === 0}
              onChange={handleChange}
              value={0}
            />
            <Typography
              fontSize="1.1rem"
              color="rgb(80,80,80)"
              letterSpacing="1px"
              flex="6"
            >
              {shippingMethods[0]}
            </Typography>
            <Typography
              flex="1"
              align="right"
              letterSpacing="1px"
              sx={{ color: "rgb(50,50,50)" }}
            >
              Free
            </Typography>
          </div>
          <Divider />

          <div>
            <Radio
              checked={selectedValue === 1}
              onChange={handleChange}
              value={1}
            />
            <Typography
              fontSize="1.1rem"
              color="rgb(80,80,80)"
              letterSpacing="1px"
              flex="6"
            >
              {shippingMethods[1]}
            </Typography>
            <Typography
              flex="1"
              align="right"
              letterSpacing="1px"
              sx={{ color: "rgb(50,50,50)" }}
            >
              $ 5
            </Typography>
          </div>
        </div>
      </div>
      <Controller
        returnTo="information"
        continueTo="Continue to payment"
        onNextPage={props.onPageChange.bind(null, 2)}
        onPreviousPage={props.onPageChange.bind(null, 0)}
        shippingMethod={shippingMethods[selectedValue]}
        formIsValid={true}
      />
    </Box>
  );
};

export default Shipping;
