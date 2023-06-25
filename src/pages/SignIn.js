import React, { Fragment } from "react";
import SigninForm from "../components/Dekstop/Form/SigninForm";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import './signIn.style.scss'
const SignIn = () => {
  return (
    <Fragment>

       <div className="LoginPageHeaderContainer" >
           <Typography sx={{letterSpacing:{xs:'1px',md:'4px'},fontSize:{xs:'4rem',md:'6rem'}}}variant="h1">shop<span>Z</span>ee</Typography>
       </div>
      
      <Container
        maxWidth="sm"
        sx={{ transform:{xs:'scale(0.9)',md:'scale(1)'},marginTop: "8rem", boxShadow: "2px 2px 8px" }}
      >
        <SigninForm />
      </Container>
    </Fragment>
  );
};

export default SignIn;
