import React, { Fragment } from "react";
import SignupForm from "../components/Dekstop/Form/SignupForm";
import { Container } from "@mui/system";
import Logo from "../components/Logo/Logo";
const Signup = () => {
  return (
    <Fragment>
      <Logo />
      <Container
        maxWidth="sm"
        sx={{
          transform: { xs: "scale(0.9)", md: "scale(1)" },
          marginTop: "3rem",
          boxShadow: "2px 2px 8px",
        }}
      >
        <SignupForm />
      </Container>
    </Fragment>
  );
};

export default Signup;
