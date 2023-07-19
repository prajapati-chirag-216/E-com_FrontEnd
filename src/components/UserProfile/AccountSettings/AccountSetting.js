import {
  Divider,
  Typography,
  TextField,
  Button,
  Box,
  useMediaQuery,
} from "@mui/material";
import "./account.styles.scss";
import { useEffect, useReducer, useState } from "react";
import { updatePassword } from "../../../utils/api";
import { useDispatch } from "react-redux";
import { setSnackBar } from "../../../store/ui/ui.action";
import { textFeildStyle } from "../../../utils/function";
import { passwordReducer } from "../../../shared/Reducers/InputReducers";

const AccountSettings = () => {
  const [currentPasswordState, dispatchCurrentPassword] = useReducer(
    passwordReducer,
    {
      value: "",
      isValid: null,
    }
  );
  const [newPasswordState, dispatchNewPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const currentPasswordChangeHandler = (event) => {
    dispatchCurrentPassword({
      type: "USER_INPUT",
      val: event.target.value.trim(),
    });
  };
  const newPasswordChangeHandler = (event) => {
    dispatchNewPassword({ type: "USER_INPUT", val: event.target.value.trim() });
  };

  const validateCurrentPasswordHandler = () =>
    dispatchCurrentPassword({ type: "INPUT_BLUR" });
  const validateNewPasswordHandler = () =>
    dispatchNewPassword({ type: "INPUT_BLUR" });

  const { isValid: currentPasswordIsValid } = currentPasswordState;
  const { isValid: newPasswordIsValid } = newPasswordState;
  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(currentPasswordIsValid && newPasswordIsValid);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [currentPasswordIsValid, newPasswordIsValid]);

  const validateFormHandler = async (event) => {
    event.preventDefault();
    if (!newPasswordIsValid) {
      document.getElementById("newPassword").focus();
    }
    if (!currentPasswordIsValid) {
      document.getElementById("currentPassword").focus();
    }
  };

  const dispacth = useDispatch();

  const handlePasswordReset = async () => {
    const passObj = {
      curPass: currentPasswordState.value,
      newPass: newPasswordState.value,
    };
    try {
      const response = await updatePassword(passObj);
      if (response?.success) {
        dispacth(
          setSnackBar({
            status: true,
            message: "Password Changed Successfully",
          })
        );
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
        marginTop: "1.5rem",
        width: "100%",
      }}
    >
      <div className="headerContainer">
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "1.8rem",
            letterSpacing: "1px",
            color: "black",
            fontWeight: "550",
          }}
        >
          Password Reset
        </Typography>
      </div>

      <Divider />

      <div className="inputDiv">
        <TextField
          id="currentPassword"
          label="current Password"
          onChange={currentPasswordChangeHandler}
          onBlur={validateCurrentPasswordHandler}
          value={currentPasswordState.value}
          error={currentPasswordIsValid == false ? true : false}
          sx={textFeildStyle(currentPasswordIsValid)}
          helperText={
            currentPasswordIsValid === false
              ? "Enter valid current password"
              : ""
          }
        />
        <TextField
          id="newPassword"
          label="New Password"
          onChange={newPasswordChangeHandler}
          onBlur={validateNewPasswordHandler}
          value={newPasswordState.value}
          error={newPasswordIsValid == false ? true : false}
          sx={textFeildStyle(newPasswordIsValid)}
          helperText={
            newPasswordIsValid == false ? "Enter valid new password" : ""
          }
        />

        <Button
          sx={{
            background: "black",
            "&:hover": { background: "black" },
            borderRadius: 0,
            width: "30rem",
            padding: "1rem",
            letterSpacing: "3px",
            fontSize: "1.1rem",
            marginTop: "1rem",
          }}
          variant="contained"
          onClick={formIsValid ? handlePasswordReset : validateFormHandler}
        >
          Reset Password
        </Button>
      </div>
    </Box>
  );
};

export default AccountSettings;
