import React, { useState, useEffect, useReducer } from "react";
import { Box, Divider, TextField, Typography } from "@mui/material";
import Controller from "../Controller/Controller";
import classes from "./Payment.module.css";
import UserCrendentials from "../Shipping/UserCredentials/UserCrendentials";
import {
  cardNoReducer,
  cvvReducer,
  expiryDateReducer,
  generalReducer,
} from "../../../shared/Reducers/InputReducers";
import { useSelector } from "react-redux";
import { selectOrderInfo } from "../../../store/Order/order.selector";
import { textFeildStyle } from "../../../utils/function";
const Payment = (props) => {
  const orderInfo = useSelector(selectOrderInfo);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [cardNoState, dispatchCardNo] = useReducer(cardNoReducer, {
    value: "",
    isValid: null,
  });
  const [holderNameState, dispatchHolderName] = useReducer(generalReducer, {
    value: "",
    isValid: null,
  });
  const [expiryDateState, dispatchExpiryDate] = useReducer(expiryDateReducer, {
    value: "",
    isValid: null,
  });
  const [cvvState, dispatchCvv] = useReducer(cvvReducer, {
    value: "",
    isValid: null,
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const cardNoChangeHandler = (event) => {
    dispatchCardNo({ type: "USER_INPUT", val: event.target.value });
  };
  const holderNameChangeHandler = (event) => {
    dispatchHolderName({ type: "USER_INPUT", val: event.target.value });
  };
  const expiryDateChangeHandler = (event) => {
    dispatchExpiryDate({ type: "USER_INPUT", val: event.target.value });
  };
  const cvvChangeHandler = (event) => {
    dispatchCvv({ type: "USER_INPUT", val: event.target.value });
  };
  const validateCardNoHandler = () => dispatchCardNo({ type: "INPUT_BLUR" });
  const validateHolderNameHandler = () =>
    dispatchHolderName({ type: "INPUT_BLUR" });
  const validateExpiryDateHandler = () =>
    dispatchExpiryDate({ type: "INPUT_BLUR" });
  const validateCvvHandler = () => dispatchCvv({ type: "INPUT_BLUR" });
  const { isValid: cardNoIsValid } = cardNoState;
  const { isValid: holderNameIsValid } = holderNameState;
  const { isValid: expiryDateIsValid } = expiryDateState;
  const { isValid: cvvIsValid } = cvvState;
  useEffect(() => {
    const timer = setTimeout(() => {
      const formValidity =
        cardNoIsValid && holderNameIsValid && expiryDateIsValid && cvvIsValid;
      setFormIsValid(formValidity);
      if (formValidity) {
        setPaymentDetails({
          cardNo: cardNoState.value,
          holderName: holderNameState.value,
          expiryDate: expiryDateState.value,
          cvv: cvvState.value,
        });
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [cardNoIsValid, holderNameIsValid, expiryDateIsValid, cvvIsValid]);

  const validateFormHandler = async () => {
    if (!cardNoIsValid) {
      document.getElementById("cardNo").focus();
    } else if (!holderNameIsValid) {
      document.getElementById("holderName").focus();
    } else if (!expiryDateIsValid) {
      document.getElementById("expiryDate").focus();
    } else {
      document.getElementById("cvv").focus();
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: "1rem",
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
        <Divider />
        <UserCrendentials
          label="Method"
          value={orderInfo.shippingMethod}
          onClick={props.onPageChange.bind(null, 1)}
        />
      </div>
      <div className={classes["titleContainer"]}>
        <Typography
          sx={{
            color: "rgb(57, 56, 56)",
            fontSize: "1.4rem",
            letterSpacing: "1px",
          }}
        >
          Payment
        </Typography>
        <Typography>All transactions are secure and encrypted.</Typography>
      </div>
      <div className={classes["paymentCardContainer"]}>
        <div className={classes["headerContainer"]}>
          <Typography
            sx={{
              fontSize: "1.2rem",
              color: "rgb(80,80,80)",
              height: "fit-content",
              alignSelf: "center",
            }}
          >
            Credit Card/Debit Card
          </Typography>

          <div className={classes["headerIcons"]}>
            <img src="visa.svg" />
            <img src="mastercard.svg" />
            <img src="american-express.svg" />
          </div>
        </div>

        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "1.2rem",
          }}
        >
          <TextField
            variant="outlined"
            label="Card Number"
            id="cardNo"
            placeholder="1234 1234 1234"
            type="text"
            value={cardNoState.value}
            onChange={cardNoChangeHandler}
            onBlur={validateCardNoHandler}
            InputProps={{
              endAdornment: cardNoIsValid && (
                <div>
                  <img src="visa.svg" />
                </div>
              ),
            }}
            autoComplete="off"
            error={cardNoIsValid === false ? true : false}
            sx={textFeildStyle(cardNoIsValid)}
            helperText={
              cardNoIsValid === false ? "Enter valid card number" : ""
            }
          />

          <TextField
            id="holderName"
            label="holdername"
            type="text"
            variant="outlined"
            value={holderNameState.value}
            onChange={holderNameChangeHandler}
            onBlur={validateHolderNameHandler}
            autoComplete="off"
            error={holderNameIsValid === false ? true : false}
            sx={textFeildStyle(holderNameIsValid)}
            helperText={holderNameIsValid === false ? "Enter valid name" : ""}
          />

          <TextField
            id="expiryDate"
            label="expiryDate"
            type="text"
            placeholder="MM/YY"
            value={expiryDateState.value}
            onChange={expiryDateChangeHandler}
            onBlur={validateExpiryDateHandler}
            fullWidth
            autoComplete="off"
            error={expiryDateIsValid === false ? true : false}
            sx={textFeildStyle(expiryDateIsValid)}
            helperText={expiryDateIsValid === false ? "Enter valid date" : ""}
          />

          <TextField
            label="cvv"
            id="cvv"
            type="text"
            placeholder="1234"
            value={cvvState.value}
            onChange={cvvChangeHandler}
            onBlur={validateCvvHandler}
            fullWidth
            autoComplete="off"
            error={cvvIsValid === false ? true : false}
            sx={textFeildStyle(cvvIsValid)}
            helperText={cvvIsValid === false ? "Enter valid cvv number" : ""}
          />
        </Box>
      </div>
      <Controller
        paymentDetails={paymentDetails}
        returnTo="shipping"
        continueTo="placeOrder"
        onNextPage={props.onPageChange.bind(null, 3)}
        onPreviousPage={props.onPageChange.bind(null, 1)}
        onValidateForm={validateFormHandler}
        formIsValid={formIsValid}
      />
    </Box>
  );
};

export default Payment;
