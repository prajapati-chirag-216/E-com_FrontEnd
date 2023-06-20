import React, { Fragment, useEffect, useReducer, useState } from "react";
import "./contactus.styles.scss";
import { Card, TextField, Button, Typography } from "@mui/material";
import { Form, useActionData } from "react-router-dom";
import { postUserMessage } from "../../utils/api";
import { setSnackBar } from "../../store/ui/ui.action";
import { store } from "../../store/store";
import { textFeildStyle } from "../../utils/function";
import {
  descriptionReducer,
  emailReducer,
  nameReducer,
  phoneNoReducer,
} from "../../shared/Reducers/InputReducers";
const ContactUs = () => {
  const [nameState, dispatchName] = useReducer(nameReducer, {
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
  const [messageState, dispatchMessage] = useReducer(descriptionReducer, {
    value: "",
    isValid: null,
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const nameChangeHandler = (event) => {
    dispatchName({ type: "USER_INPUT", val: event.target.value });
  };
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };
  const phoneNoChangeHandler = (event) => {
    dispatchPhoneNo({ type: "USER_INPUT", val: event.target.value });
  };
  const messageChangeHandler = (event) => {
    dispatchMessage({ type: "USER_INPUT", val: event.target.value });
  };

  const validateNameHandler = () => dispatchName({ type: "INPUT_BLUR" });
  const validateEmailHandler = () => dispatchEmail({ type: "INPUT_BLUR" });
  const validatePhoneNoHandler = () => dispatchPhoneNo({ type: "INPUT_BLUR" });
  const validateMessageHandler = () => dispatchMessage({ type: "INPUT_BLUR" });

  const { isValid: nameIsValid } = nameState;
  const { isValid: emailIsValid } = emailState;
  const { isValid: phoneNoIsValid } = phoneNoState;
  const { isValid: messageIsValid } = messageState;

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(
        nameIsValid && emailIsValid && phoneNoIsValid && messageIsValid
      );
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [nameIsValid, emailIsValid, phoneNoIsValid, messageIsValid]);

  const validateFormHandler = async (event) => {
    event.preventDefault();
    if (!messageIsValid) {
      document.getElementById("message").focus();
    }
    if (!phoneNoIsValid) {
      document.getElementById("phoneNo").focus();
    }
    if (!emailIsValid) {
      document.getElementById("email").focus();
    }
    if (!nameIsValid) {
      document.getElementById("name").focus();
    }
  };
  return (
    <div className="contactUsContainer">
      <div className="headerContainer">
        <Typography
          align="center"
          sx={{
            color: "rgb(50,50,50)",
            fontSize: "1.6rem",
            fontWeight: "550",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
          }}
        >
          Contact Us
        </Typography>

        <Typography
          align="center"
          sx={{
            letterSpacing: "1px",
            color: "black",
            fontSize: "1.1rem",
          }}
        >
          Feel Free To Call Us at{" "}
          <span className="cridentials-info"> +917405547234 </span>
          Or
          <span className="cridentials-info"> +917487935333 </span>
          <b> (10:00 am to 6:00 pm)</b>
          <br />
          or mail us at
          <span className="cridentials-info"> abcd@examle.com </span>
        </Typography>
      </div>

      <Card
        variant="outlined"
        style={{
          width: "50rem",
          boxShadow: "1px 2px 6px rgb(179, 179, 179)",
          padding: "1rem",
          paddingLeft: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            textDecoration: "underline",
            letterSpacing: "1px",
            fontSize: "1.3rem",
          }}
        >
          Postal Address For Indian Customers:-
        </Typography>
        <Typography
          sx={{
            wordBreak: "break-word",
            fontSize: "1.15rem",
            color: "rgb(60,60,60)",
            lineHeight: "2.1rem",
          }}
        >
          100 AB, 102 AB,
          <br />
          ABCD PHASE 1 (India’s largest textile mall) Some Road,
          <br />
          Opposite Maninagar, Isanpur, Ahmedabad, Pincode - 382443
          <br />
          Gujarat, India
        </Typography>
      </Card>

      <div className="MessageFormContainer">
        <Typography
          variant="h5"
          style={{ textTransform: "uppercase", letterSpacing: "3px" }}
        >
          send us your message
        </Typography>

        <Form method="post" action={"/contactus"} id="messageForm">
          <div className="formContainer">
            <div className="UpperPartContainer">
              <TextField
                style={{ width: "19rem" }}
                name="name"
                id="name"
                label="Your Name"
                value={nameState.value}
                variant="outlined"
                onChange={nameChangeHandler}
                onBlur={validateNameHandler}
                error={nameIsValid === false ? true : false}
                sx={textFeildStyle(nameIsValid)}
                helperText={
                  nameIsValid === false
                    ? "Name should be 5 to 10 charecters long"
                    : ""
                }
              />
              <TextField
                style={{ width: "19rem" }}
                name="email"
                id="email"
                label="Your Email"
                value={emailState.value}
                variant="outlined"
                onChange={emailChangeHandler}
                onBlur={validateEmailHandler}
                error={emailIsValid === false ? true : false}
                sx={textFeildStyle(emailIsValid)}
                helperText={emailIsValid === false ? "Enter valid email" : ""}
              />
            </div>
            <TextField
              name="phone"
              id="phoneNo"
              label="Your Phone(optional)"
              value={phoneNoState.value}
              variant="outlined"
              onChange={phoneNoChangeHandler}
              onBlur={validatePhoneNoHandler}
              error={phoneNoIsValid === false ? true : false}
              sx={textFeildStyle(phoneNoIsValid)}
              helperText={phoneNoIsValid === false ? "Enter valid number" : ""}
            />
            <TextField
              name="message"
              id="message"
              label="Your Message"
              value={messageState.value}
              multiline
              rows={7}
              onChange={messageChangeHandler}
              onBlur={validateMessageHandler}
              error={messageIsValid === false ? true : false}
              sx={textFeildStyle(messageIsValid)}
              helperText={
                messageIsValid === false
                  ? "Minimum criteria does not meet (btw 40-400 words)"
                  : ""
              }
            />

            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                padding: "1rem",
                backgroundColor: "black",
                "&:hover": {
                  backgroundColor: "black",
                },
                borderRadius: "0rem",
              }}
              onClick={!formIsValid ? validateFormHandler : () => {}}
            >
              Send Your Message
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export async function action({ request }) {
  const formData = await request.formData();

  const messageObj = {
    userName: formData.get("name"),
    userEmail: formData.get("email"),
    phonNo: formData.get("phone"),
    message: formData.get("message"),
  };

  try {
    const response = await postUserMessage(messageObj);
    store.dispatch(
      setSnackBar({
        status: true,
        message: "Your Message Has Been Sent Sucssesfully!",
      })
    );
    return response;
  } catch (err) {
    store.dispatch(
      setSnackBar({
        status: true,
        message: "Somthing Went Wrong While Sending Message!",
      })
    );
  }
}

export default ContactUs;
