import React, { Fragment, useEffect, useReducer, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Form, redirect, useActionData } from "react-router-dom";
import classes from "./ActionForm.module.css";
import { emailReducer } from "../../../shared/Reducers/InputReducers";
import { forgotPassword } from "../../../utils/api";
import { store } from "../../../store/store";
import { textFeildStyle } from "../../../utils/function";
import { setSuccess } from "../../../store/ui/ui.action";

const ForgotPasswordForm = () => {
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
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
    if (actionData?.response?.status === 401) {
      document.getElementById("email").focus();
    }
  }, [actionData]);
  return (
    <Fragment>
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
            sx={textFeildStyle(emailIsValid)}
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
    return err;
  }
  store.dispatch(setSuccess({ status: true, for: "password" }));
  return redirect("/success");
}

export default ForgotPasswordForm;
