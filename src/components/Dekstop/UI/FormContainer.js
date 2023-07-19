import React from "react";
import { Container } from "@mui/system";
const FormContainer = (props) => {
  return (
    <Container
      maxWidth="sm"
      sx={{ marginTop: "8rem", boxShadow: "2px 2px 8px gray" }}
    >
      {props.children}
    </Container>
  );
};

export default FormContainer;
