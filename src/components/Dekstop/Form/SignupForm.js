import React, { Fragment, useEffect, useReducer, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  IconButton,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Form, NavLink, useActionData, useNavigate } from "react-router-dom";
import classes from "./ActionForm.module.css";
import {
  nameReducer,
  emailReducer,
  passwordReducer,
  phoneNoReducer,
} from "../../../shared/Reducers/InputReducers";
// import { useDispatch } from "react-redux";
import Notification from "../UI/Notification";
import { signupUser } from "../../../utils/api";
const SignupForm = () => {
  // const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [nameState, dispatchName] = useReducer(nameReducer, {
    value: "",
    isValid: null,
  });
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const [phoneNoState, dispatchPhoneNo] = useReducer(phoneNoReducer, {
    value: "",
    isValid: null,
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const nameChangeHandler = (event) => {
    dispatchName({ type: "USER_INPUT", val: event.target.value.trim() });
  };
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value.trim() });
  };
  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value.trim() });
  };
  const phoneNoChangeHandler = (event) => {
    dispatchPhoneNo({ type: "USER_INPUT", val: event.target.value.trim() });
  };

  const validateNameHandler = () => dispatchName({ type: "INPUT_BLUR" });
  const validateEmailHandler = () => dispatchEmail({ type: "INPUT_BLUR" });
  const validatePasswordHandler = () =>
    dispatchPassword({ type: "INPUT_BLUR" });
  const validatePhoneNoHandler = () => dispatchPhoneNo({ type: "INPUT_BLUR" });

  const { isValid: nameIsValid } = nameState;
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  const { isValid: phoneNoIsValid } = phoneNoState;

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(
        nameIsValid && emailIsValid && passwordIsValid && phoneNoIsValid
      );
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [nameIsValid, emailIsValid, passwordIsValid, phoneNoIsValid]);

  const validateFormHandler = async (event) => {
    event.preventDefault();
    if (!nameIsValid) {
      document.getElementById("fullName").focus();
    } else if (!emailIsValid) {
      document.getElementById("email").focus();
    } else if (!passwordIsValid) {
      document.getElementById("password").focus();
    } else {
      document.getElementById("phoneNo").focus();
    }
  };
  const navigate = useNavigate();
  const actionData = useActionData();
  useEffect(() => {
    if (actionData && actionData.success) {
      // dispatch(authActions.login());
      return navigate("/home", { replace: true });
    }
    if (actionData && !actionData.emailIsValid) {
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
        <Notification message="e-mail is already registered" status="invalid" />
      )}
      <div className={classes["action-div"]}>
        <Typography
          fontSize="2rem"
          marginBottom="2rem"
          sx={{ userSelect: "none" }}
        >
          Register
        </Typography>
        <Form className={classes["action-form"]} method="post" action="/signup">
          <TextField
            id="fullName"
            name="fullName"
            label="Full Name"
            variant="outlined"
            fullWidth
            value={nameState.value}
            onChange={nameChangeHandler}
            onBlur={validateNameHandler}
            autoComplete="off"
            error={nameIsValid === false ? true : false}
          />
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
          <FormControl>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              value={passwordState.value}
              type={showPassword ? "text" : "password"}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
              error={passwordIsValid === false ? true : false}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <TextField
            id="phoneNo"
            name="phoneNo"
            label="Phone No"
            variant="outlined"
            fullWidth
            sx={{
              "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                {
                  WebkitAppearance: "none",
                  margin: 0,
                },
            }}
            value={phoneNoState.value}
            onChange={phoneNoChangeHandler}
            onBlur={validatePhoneNoHandler}
            autoComplete="off"
            type="number"
            error={phoneNoIsValid === false ? true : false}
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
            Signup
          </Button>
          <Typography
            align="center"
            variant="h6"
            sx={{
              letterSpacing: "2px",
              fontSize: "1rem",
              textTransform: "capitalize",
              color: "gray",
            }}
          >
            Already Have An Account?{" "}
            <NavLink to="/login" className={classes.link}>
              Signin
            </NavLink>
          </Typography>
        </Form>
      </div>
    </Fragment>
  );
};
export async function action({ request }) {
  let response;
  const formData = await request.formData();
  const userData = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    phoneNo: formData.get("phoneNo"),
  };
  try {
    response = await signupUser(userData);
  } catch (err) {
    if (
      err.response.data.code === 11000 &&
      err.response.data.keyPattern.email === 1
    ) {
      return { emailIsValid: false };
    }
    throw err;
  }
  return response;
}
export default SignupForm;
