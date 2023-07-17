import React, { Fragment } from "react";
import FormContainer from "../components/Dekstop/UI/FormContainer";
import ForgotPasswordForm from "../components/Dekstop/Form/ForgotPasswordForm";
import Logo from "../components/Logo/Logo";
const ForgotPassword = () => {
  return (
    <Fragment>
      <Logo />
      <FormContainer>
        <ForgotPasswordForm />
      </FormContainer>
    </Fragment>
  );
};

export default ForgotPassword;
