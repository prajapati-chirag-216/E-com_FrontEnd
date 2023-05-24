import React, { Fragment, useEffect, useReducer, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Form, NavLink, useActionData, useNavigate } from "react-router-dom";
import classes from "./ActionForm.module.css";
import {
  emailReducer,
  passwordReducer,
} from "../../../shared/Reducers/InputReducers";
import { loginUser } from "../../../utils/api";
import { useDispatch } from "react-redux";
import Notification from "../UI/Notification";
import { authActions } from "../../../mystore/auth-slice";
const SigninForm = () => {
  const dispatch = useDispatch();

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value.trim() });
  };
  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value.trim() });
  };

  const validateEmailHandler = () => dispatchEmail({ type: "INPUT_BLUR" });
  const validatePasswordHandler = () =>
    dispatchPassword({ type: "INPUT_BLUR" });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [emailIsValid, passwordIsValid]);

  const validateFormHandler = async (event) => {
    event.preventDefault();
    if (!emailIsValid) {
      document.getElementById("email").focus();
    } else {
      return document.getElementById("password").focus();
    }
  };
  const navigate = useNavigate();
  const actionData = useActionData();
  useEffect(() => {
    if (actionData && actionData.success) {
      dispatch(authActions.login());
      return navigate("/", { replace: true });
    }
    if (actionData && actionData.response.status === 502) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 4000);
      if (actionData.response.data.validityStatus === "email") {
        document.getElementById("email").focus();
      } else {
        document.getElementById("password").focus();
      }
    }
    // eslint-disable-next-line
  }, [actionData]);
  return (
    <Fragment>
      {showNotification && (
        <Notification
          message={actionData.response.data.message}
          status="invalid"
        />
      )}
      <div className={classes["action-div"]}>
        <Typography
          fontSize="2rem"
          marginBottom="2rem"
          sx={{ userSelect: "none" }}
        >
          Login
        </Typography>
        <Form className={classes["action-form"]} method="post" action="/login">
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
            autoComplete="off"
            error={emailIsValid === false ? true : false}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
            error={passwordIsValid === false ? true : false}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{
              fontSize: "1rem",
              backgroundColor: "black",
              "&:hover": { backgroundColor: "black" },
              padding: "0.7rem",
            }}
            onClick={!formIsValid ? validateFormHandler : () => {}}
            disabled={showNotification}
          >
            SignIn
          </Button>
          <NavLink to="/forgotPassword" className={classes.link}>
            Forgot Password?
          </NavLink>
        </Form>
      </div>
    </Fragment>
  );
};

export async function action({ request }) {
  let response;
  const formData = await request.formData();
  const userData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  try {
    response = await loginUser(userData);
  } catch (err) {
    if (err.response && err.response.status === 502) {
      return err;
    }
    throw err;
  }
  return response;
}

export default SigninForm;
