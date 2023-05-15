import React, { Fragment } from "react";
import SigninForm from "../components/Dekstop/Form/SigninForm";
import { Container } from "@mui/system";
import { useSelector } from "react-redux";
import Notification from "../components/Dekstop/UI/Notification";
const SignIn = () => {
  const notification = useSelector((state) => state.ui.notification);
  return (
    <Fragment>
      {notification.status && (
        <Notification message={notification.message} status="success" />
      )}
      <Container
        maxWidth="sm"
        sx={{ marginTop: "8rem", boxShadow: "2px 2px 8px" }}
      >
        <SigninForm />
      </Container>
    </Fragment>
  );
};

export default SignIn;
