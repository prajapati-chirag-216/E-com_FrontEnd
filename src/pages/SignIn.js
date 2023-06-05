import React, { Fragment } from "react";
import SigninForm from "../components/Dekstop/Form/SigninForm";
import { Container } from "@mui/system";
const SignIn = () => {
  return (
    <Fragment>
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
