import React, { Fragment, useEffect, useReducer, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useParams,
} from "react-router-dom";
import classes from "./ActionForm.module.css";
import { passwordReducer } from "../../../shared/Reducers/InputReducers";
import { resetPassword } from "../../../utils/api";
import Notification from "../UI/Notification";

const ResetPasswordForm = () => {
  const [showNotification, setShowNotification] = useState(false);
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
  const navigate = useNavigate();
  const actionData = useActionData();
  const params = useParams();

  useEffect(() => {
    if (actionData && actionData.response.status === 502) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 4000);
      document.getElementById("password").focus();
    }
    // eslint-disable-next-line
  }, [actionData]);
  return (
    <Fragment>
      {showNotification && (
        <Notification
          status="invalid"
          message={actionData.response.data.message}
        />
      )}
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
            disabled={showNotification}
          >
            Reset
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};

export async function action({ request, params }) {
  let response;
  const formData = await request.formData();
  const userData = {
    password: formData.get("password"),
    id: params.id,
  };
  try {
    response = await resetPassword(userData);
  } catch (err) {
    if (err.response && err.response.status === 502) {
      return err;
    }
    throw err;
  }
  return redirect("/login");
}

export default ResetPasswordForm;
