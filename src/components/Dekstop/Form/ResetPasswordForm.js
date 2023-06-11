import React, { Fragment, useReducer } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Form, redirect, useActionData, useParams } from "react-router-dom";
import classes from "./ActionForm.module.css";
import { passwordReducer } from "../../../shared/Reducers/InputReducers";
import { resetPassword } from "../../../utils/api";
import { textFeildStyle } from "../../../utils/function";

const ResetPasswordForm = () => {
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value.trim() });
  };

  const validatePasswordHandler = () =>
    dispatchPassword({ type: "INPUT_BLUR" });

  const { isValid: passwordIsValid } = passwordState;

  const validateFormHandler = async (event) => {
    event.preventDefault();
    if (!passwordIsValid) {
      return document.getElementById("password").focus();
    }
  };
  const params = useParams();

  return (
    <Fragment>
      <div className={classes["action-div"]}>
        <Typography
          fontSize="2rem"
          marginBottom="2rem"
          sx={{ userSelect: "none" }}
        >
          Reset Password
        </Typography>
        <Form
          className={classes["action-form"]}
          method="post"
          action={`/resetPassword/${params.id}`}
        >
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
            style={textFeildStyle(passwordIsValid)}
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
            onClick={!passwordIsValid ? validateFormHandler : () => {}}
          >
            Reset
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};

export async function action({ request, params }) {
  const formData = await request.formData();
  const userData = {
    password: formData.get("password"),
    id: params.id,
  };
  try {
    const response = await resetPassword(userData);
  } catch (err) {
    throw err;
  }
  return redirect("/login");
}

export default ResetPasswordForm;
