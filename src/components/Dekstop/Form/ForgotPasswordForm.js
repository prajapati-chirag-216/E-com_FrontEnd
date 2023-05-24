import React, { Fragment, useEffect, useReducer, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Form, redirect, useActionData, useNavigate } from "react-router-dom";
import classes from "./ActionForm.module.css";
import { emailReducer } from "../../../shared/Reducers/InputReducers";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../mystore/ui-slice";
import { forgotPassword } from "../../../utils/api";
import store from "../../../mystore/index";
import Notification from "../UI/Notification";

const ForgotPasswordForm = () => {
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [showNotification, setShowNotification] = useState(false);
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value.trim() });
  };

  const validateEmailHandler = () => dispatchEmail({ type: "INPUT_BLUR" });

  const { isValid: emailIsValid } = emailState;

  const validateFormHandler = async (event) => {
    event.preventDefault();
    if (!emailIsValid) {
      document.getElementById("email").focus();
    }
  };
  const actionData = useActionData();
  useEffect(() => {
    if (actionData && actionData.response.status === 502) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 4000);
      document.getElementById("email").focus();
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
          Forgot Password
        </Typography>
        <Form
          className={classes["action-form"]}
          method="post"
          action="/forgotPassword"
        >
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
          <Button
            variant="contained"
            type="submit"
            sx={{
              fontSize: "1rem",
              backgroundColor: "black",
              "&:hover": { backgroundColor: "black" },
              padding: "0.7rem",
            }}
            onClick={!emailIsValid ? validateFormHandler : () => {}}
            disabled={showNotification}
          >
            Forgot Password
          </Button>
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
  };
  try {
    response = await forgotPassword(userData);
  } catch (err) {
    if (err.response && err.response.status === 502) {
      return err;
    }
    throw err;
  }
  store.dispatch(uiActions.setSuccess(true));
  return redirect("/success");
}

export default ForgotPasswordForm;
