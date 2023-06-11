import React, { useReducer, useState, useEffect, useRef } from "react";
import classes from "./Information.module.css";
import { Box, TextField, Typography, MenuItem } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import Controller from "../Controller/Controller";
import {
  nameReducer,
  emailReducer,
  phoneNoReducer,
  generalReducer,
  pinCodeReducer,
} from "../../../shared/Reducers/InputReducers";
import { textFeildStyle } from "../../../utils/function";

const Information = (props) => {
  const countryRef = useRef();
  const stateRef = useRef();
  const navigate = useNavigate();
  const navigateHandler = () => navigate("/cart");
  const [firstNameState, dispatchFirstName] = useReducer(nameReducer, {
    value: "",
    isValid: null,
  });
  const [lastNameState, dispatchLastName] = useReducer(nameReducer, {
    value: "",
    isValid: null,
  });
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [phoneNoState, dispatchPhoneNo] = useReducer(phoneNoReducer, {
    value: "",
    isValid: null,
  });
  const [cityNameState, dispatchCityName] = useReducer(generalReducer, {
    value: "",
    isValid: null,
  });
  const [addressState, dispatchAddress] = useReducer(generalReducer, {
    value: "",
    isValid: null,
  });
  const [pinCodeState, dispatchPinCode] = useReducer(pinCodeReducer, {
    value: "",
    isValid: null,
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [InformationDetails, setInformationDetails] = useState(null);

  const firstNameChangeHandler = (event) => {
    dispatchFirstName({ type: "USER_INPUT", val: event.target.value });
  };
  const lastNameChangeHandler = (event) => {
    dispatchLastName({ type: "USER_INPUT", val: event.target.value });
  };
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };
  const phoneNoChangeHandler = (event) => {
    dispatchPhoneNo({ type: "USER_INPUT", val: event.target.value });
  };
  const cityNameChangeHandler = (event) => {
    dispatchCityName({ type: "USER_INPUT", val: event.target.value });
  };
  const addressChangeHandler = (event) => {
    dispatchAddress({ type: "USER_INPUT", val: event.target.value });
  };
  const pinCodeChangeHandler = (event) => {
    dispatchPinCode({ type: "USER_INPUT", val: event.target.value, length: 6 });
  };

  const validateEmailHandler = () => dispatchEmail({ type: "INPUT_BLUR" });
  const validatePhoneNoHandler = () => dispatchPhoneNo({ type: "INPUT_BLUR" });
  const validateFirstNameHandler = () =>
    dispatchFirstName({ type: "INPUT_BLUR" });
  const validateLastNameHandler = () =>
    dispatchLastName({ type: "INPUT_BLUR" });
  const validateCityNameHandler = () =>
    dispatchCityName({ type: "INPUT_BLUR" });
  const validateAddressHandler = () => dispatchAddress({ type: "INPUT_BLUR" });
  const validatePinCodeHandler = () => dispatchPinCode({ type: "INPUT_BLUR" });

  const { isValid: emailIsValid } = emailState;
  const { isValid: phoneNoIsValid } = phoneNoState;
  const { isValid: firstNameIsValid } = firstNameState;
  const { isValid: lastNameIsValid } = lastNameState;
  const { isValid: cityNameIsValid } = cityNameState;
  const { isValid: addressIsValid } = addressState;
  const { isValid: pinCodeIsValid } = pinCodeState;
  useEffect(() => {
    const timer = setTimeout(() => {
      const formValidity =
        emailIsValid &&
        phoneNoIsValid &&
        firstNameIsValid &&
        lastNameIsValid &&
        addressIsValid &&
        cityNameIsValid &&
        pinCodeIsValid;
      setFormIsValid(formValidity);
      if (formValidity) {
        const InformationDetails = {
          contactInformation: {
            email: emailState.value,
            phoneNumber: phoneNoState.value,
          },
          shippingAddress: {
            country: countryRef.current.value,
            userName: firstNameState.value + " " + lastNameState.value,
            address: addressState.value,
            city: cityNameState.value,
            state: stateRef.current.value,
            pinNumber: pinCodeState.value,
          },
        };
        setInformationDetails(InformationDetails);
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [
    emailIsValid,
    phoneNoIsValid,
    firstNameIsValid,
    lastNameIsValid,
    addressIsValid,
    cityNameIsValid,
    pinCodeIsValid,
  ]);

  const validateFormHandler = async (event) => {
    // event.preventDefault();
    if (!emailIsValid) {
      document.getElementById("email").focus();
    } else if (!phoneNoIsValid) {
      document.getElementById("phoneNo").focus();
    } else if (!firstNameIsValid) {
      document.getElementById("firstName").focus();
    } else if (!lastNameIsValid) {
      document.getElementById("lastName").focus();
    } else if (!addressIsValid) {
      document.getElementById("address").focus();
    } else if (!cityNameIsValid) {
      document.getElementById("city").focus();
    } else {
      document.getElementById("pincode").focus();
    }
  };

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
      <div className={classes["details-div"]}>
        <div className={classes["title-div"]}>
          <Typography
            sx={{
              color: "rgb(57, 56, 56)",
              fontSize: "1.4rem",
              letterSpacing: "1px",
            }}
          >
            Contact Information
          </Typography>
          {/* {isLoggedIn && (
            <Typography
              sx={{
                color: "gray",
                fontSize: "1.1rem",
                cursor: "pointer",
              }}
            >
              Already have an account?
              <NavLink className={classes["link"]}>Login</NavLink>
            </Typography>
          )} */}
        </div>
        <form className={classes["form-container"]}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
            fullWidth
            autoComplete="off"
            autoCapitalize="off"
            error={emailIsValid === false ? true : false}
            sx={textFeildStyle(emailIsValid)}
            helperText={emailIsValid === false ? "Enter valid email" : ""}
          />
          <TextField
            id="phoneNo"
            label="PhoneNo"
            value={phoneNoState.value}
            onChange={phoneNoChangeHandler}
            onBlur={validatePhoneNoHandler}
            variant="outlined"
            fullWidth
            error={phoneNoIsValid === false ? true : false}
            sx={textFeildStyle(phoneNoIsValid)}
            helperText={phoneNoIsValid === false ? "Enter valid phoneNo" : ""}
          />
        </form>
      </div>
      <div className={classes["details-div"]}>
        <Typography
          sx={{
            color: "rgb(57, 56, 56)",
            fontSize: "1.4rem",
            letterSpacing: "1px",
            marginBottom: "0.3rem",
          }}
        >
          Shipping address
        </Typography>
        <form className={classes["form-container"]}>
          <TextField
            id="country"
            label="Country/region"
            variant="outlined"
            inputRef={countryRef}
            fullWidth
            select
            defaultValue="India"
            sx={textFeildStyle(true)}
          >
            {["India", "france"].map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <div className={classes["multi_inp-div"]}>
            <TextField
              id="firstName"
              label="First name"
              variant="outlined"
              fullWidth
              value={firstNameState.value}
              onChange={firstNameChangeHandler}
              onBlur={validateFirstNameHandler}
              error={firstNameIsValid === false ? true : false}
              sx={textFeildStyle(firstNameIsValid)}
              helperText={
                firstNameIsValid === false ? "Enter valid firstName" : ""
              }
            />
            <TextField
              id="lastName"
              label="Last name"
              variant="outlined"
              fullWidth
              value={lastNameState.value}
              onChange={lastNameChangeHandler}
              onBlur={validateLastNameHandler}
              error={lastNameIsValid === false ? true : false}
              sx={textFeildStyle(lastNameIsValid)}
              helperText={
                lastNameIsValid === false ? "Enter valid lastName" : ""
              }
            />
          </div>
          <TextField
            id="address"
            label="Address"
            placeholder="Appartment, suite, etc.(optional)"
            variant="outlined"
            fullWidth
            value={addressState.value}
            onChange={addressChangeHandler}
            onBlur={validateAddressHandler}
            error={addressIsValid === false ? true : false}
            sx={textFeildStyle(addressIsValid)}
            helperText={addressIsValid === false ? "Enter valid Address" : ""}
          />
          <div className={classes["multi_inp-div"]}>
            <TextField
              id="city"
              label="City"
              variant="outlined"
              fullWidth
              value={cityNameState.value}
              onChange={cityNameChangeHandler}
              onBlur={validateCityNameHandler}
              error={cityNameIsValid === false ? true : false}
              sx={textFeildStyle(cityNameIsValid)}
              helperText={cityNameIsValid === false ? "Enter valid city" : ""}
            />
            <TextField
              id="state"
              label="State"
              variant="outlined"
              inputRef={stateRef}
              fullWidth
              select
              sx={textFeildStyle(true)}
              defaultValue="Gujrat"
            >
              {["Gujrat", "Mumbai", "Delhi"].map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="pincode"
              label="PIN code"
              variant="outlined"
              fullWidth
              value={pinCodeState.value}
              onChange={pinCodeChangeHandler}
              onBlur={validatePinCodeHandler}
              error={pinCodeIsValid === false ? true : false}
              sx={textFeildStyle(pinCodeIsValid)}
              helperText={
                pinCodeIsValid === false ? "Enter valid PIN code" : ""
              }
            />
          </div>
        </form>
      </div>
      <Controller
        informationDetails={InformationDetails}
        returnTo="cart"
        continueTo="Continue to shipping"
        onNextPage={props.onPageChange.bind(null, 1)}
        onValidateForm={validateFormHandler}
        formIsValid={formIsValid}
        onPreviousPage={navigateHandler}
      />
    </Box>
  );
};

export default Information;
