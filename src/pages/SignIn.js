import React, { Fragment } from "react";
import SigninForm from "../components/Dekstop/Form/SigninForm";
import { Container } from "@mui/system";
import Logo from "../components/Logo/Logo";
const SignIn = () => {
  return (
    <Fragment>
      <Logo />
      <Container
        maxWidth="sm"
        sx={{
          transform: { xs: "scale(0.9)", md: "scale(1)" },
          marginTop: "8rem",
          boxShadow: "2px 2px 8px",
        }}
      >
        <SigninForm />
      </Container>
    </Fragment>
  );
};

export default SignIn;
