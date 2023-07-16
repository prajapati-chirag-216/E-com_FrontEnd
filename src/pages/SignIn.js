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
          // boxShadow: "2px 2px 8px",
          boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset'
        }}
      >
        <SigninForm />
      </Container>
    </Fragment>
  );
};

export default SignIn;
