import React, { useState, useEffect, useReducer } from "react";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import Controller from "../Controller/Controller";
import InputAdornment from "@mui/material/InputAdornment";
import classes from "./Payment.module.css";
import UserCrendentials from "../Shipping/UserCredentials/UserCrendentials";
import {
  cardNoReducer,
  cvvReducer,
  expiryDateReducer,
  generalReducer,
  nameReducer,
} from "../../../shared/Reducers/InputReducers";
import { Close } from "@mui/icons-material";
const Payment = (props) => {
  const styles = (feildIsValid) => {
    return {
      "& .MuiInputLabel-root.Mui-focused": {
        color: feildIsValid === false ? "red" : "black",
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: feildIsValid === false ? "red" : "black",
      },
      "& .MuiInputLabel-root": {
        color: feildIsValid === false ? "red" : "gray",
        letterSpacing: "1px",
      },
    };
  };
  const [cardNoState, dispatchCardNo] = useReducer(cardNoReducer, {
    value: "",
    isValid: null,
  });
  const [holdarNameState, dispatchHoldarName] = useReducer(generalReducer, {
    value: "",
    isValid: null,
  });
  const [expiryDateState, dispatchExpiryDate] = useReducer(expiryDateReducer, {
    value: "",
    isValid: null,
  });
  const [cvvNoState, dispatchCvvNo] = useReducer(cvvReducer, {
    value: "",
    isValid: null,
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const cardNoChangeHandler = (event) => {
    dispatchCardNo({ type: "USER_INPUT", val: event.target.value });
  };
  const holdarNameChangeHandler = (event) => {
    dispatchHoldarName({ type: "USER_INPUT", val: event.target.value });
  };
  const expiryDateChangeHandler = (event) => {
    dispatchExpiryDate({ type: "USER_INPUT", val: event.target.value });
  };
  const cvvNoChangeHandler = (event) => {
    dispatchCvvNo({ type: "USER_INPUT", val: event.target.value });
  };
  const validateCardNoHandler = () => dispatchCardNo({ type: "INPUT_BLUR" });
  const validateHoldarNameHandler = () =>
    dispatchHoldarName({ type: "INPUT_BLUR" });
  const validateExpiryDateHandler = () =>
    dispatchExpiryDate({ type: "INPUT_BLUR" });
  const validateCvvNoHandler = () => dispatchCvvNo({ type: "INPUT_BLUR" });
  const { isValid: cardNoIsValid } = cardNoState;
  const { isValid: holdarNameIsValid } = holdarNameState;
  const { isValid: expiryDateIsValid } = expiryDateState;
  const { isValid: cvvNoIsValid } = cvvNoState;
  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(
        cardNoIsValid && holdarNameIsValid && expiryDateIsValid && cvvNoIsValid
      );
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [cardNoIsValid, holdarNameIsValid, expiryDateIsValid, cvvNoIsValid]);

  const validateFormHandler = async (event) => {
    event.preventDefault();
    if (!cardNoIsValid) {
      document.getElementById("cardNo").focus();
    } else if (!holdarNameIsValid) {
      document.getElementById("holdarName").focus();
    } else if (!expiryDateIsValid) {
      document.getElementById("expiryDate").focus();
    } else {
      document.getElementById("cvvNo").focus();
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
          value="1234@gmail.com"
          onclick={props.onPageChange.bind(null, 0)}
        />
        <Divider />
        <UserCrendentials
          label="Ship to"
          value="12345, 380013 ahmedabad GJ, India"
          onclick={props.onPageChange.bind(null, 0)}
        />
        <Divider />
        <UserCrendentials
          label="Method"
          value="Online Payment : Free Shipping"
          onclick={props.onPageChange.bind(null, 0)}
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
            id="cardNumber"
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
            sx={styles(cardNoIsValid)}
            helperText={
              cardNoIsValid === false ? "Enter valid card number" : ""
            }
          />

          <TextField
            id="holderName"
            label="holdername"
            type="text"
            variant="outlined"
            value={holdarNameState.value}
            onChange={holdarNameChangeHandler}
            onBlur={validateHoldarNameHandler}
            autoComplete="off"
            error={holdarNameIsValid === false ? true : false}
            sx={styles(holdarNameIsValid)}
            helperText={holdarNameIsValid === false ? "Enter valid name" : ""}
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
            sx={styles(expiryDateIsValid)}
            helperText={expiryDateIsValid === false ? "Enter valid date" : ""}
          />

          <TextField
            label="cvv"
            id="cvv"
            type="text"
            placeholder="1234"
            value={cvvNoState.value}
            onChange={cvvNoChangeHandler}
            onBlur={validateCvvNoHandler}
            fullWidth
            autoComplete="off"
            error={cvvNoIsValid === false ? true : false}
            sx={styles(cvvNoIsValid)}
            helperText={cvvNoIsValid === false ? "Enter valid cvv number" : ""}
          />
        </Box>
      </div>
      <Controller
        returnTo="shipping"
        continueTo="placeOrder"
        onNextPage={props.onPageChange.bind(null, 3)}
        onPreviousPage={props.onPageChange.bind(null, 1)}
      />
    </Box>
  );
};

export default Payment;
