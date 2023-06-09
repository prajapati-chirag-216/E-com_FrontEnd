import React, { Fragment, useEffect, useReducer, useState } from "react";
import { Button, TextField, Typography ,CircularProgress} from "@mui/material";
import { Form, NavLink, useActionData, useNavigate } from "react-router-dom";
import classes from "./ActionForm.module.css";
import {
  emailReducer,
  passwordReducer,
} from "../../../shared/Reducers/InputReducers";
import { loginUser } from "../../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setUpdateCart } from "../../../store/cart/cart.action";
import { setIsLoading, setSnackBar } from "../../../store/ui/ui.action";
import { textFeildStyle } from "../../../utils/function";
import StatusButton from "../../../shared/components/StatusButton/StatusButton";
import { selectIsLoading } from "../../../store/ui/ui.selector";
import {store} from '../../../store/store'
const SigninForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading)

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const [formIsValid, setFormIsValid] = useState(false);

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
    if (!passwordIsValid) {
      document.getElementById("password").focus();
    }
    if (!emailIsValid) {
      document.getElementById("email").focus();
    }
  };
  const navigate = useNavigate();
  const actionData = useActionData();
  useEffect(() => {
    if (actionData && actionData.success) {
      dispatch(setUpdateCart(actionData.cartItems));
      dispatch(
        setSnackBar({
          status: true,
          message: "logged in Successfully",
          severity: "success",
        })
      );
      return navigate("/", { replace: true });
    }
    if (actionData?.response?.status === 401) {
      if (actionData.response?.data?.validityStatus === "email") {
        document.getElementById("email").focus();
      } else {
        document.getElementById("password").focus();
      }
    }
    // eslint-disable-next-line
  }, [actionData]);
  return (
    <Fragment>
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
            sx={textFeildStyle(emailIsValid)}
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
            sx={textFeildStyle(passwordIsValid)}
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
            disabled={isLoading === true}
          >
            {isLoading ?<CircularProgress color="inherit" size={33} />: 'SignIn'}
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
  store.dispatch(setIsLoading(true))
  const formData = await request.formData();
  const userData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  try {
    response = await loginUser(userData);
    store.dispatch(setIsLoading(false))
  } catch (err) {
  
      // if(err.response.statusText === "Unauthorized"){
         store.dispatch(setIsLoading(false))
      // }
    return err;
  }
  return response;
}

export default SigninForm;
