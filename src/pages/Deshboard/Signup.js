import React, { Fragment } from "react";
import SignupForm from "../../components/Dekstop/Form/SignupForm";
import { Container } from "@mui/system";
import Notification from "../../components/Dekstop/UI/Notification";
import { Typography } from "@mui/material";
import '../signIn.style.scss'
const Signup = () => {
  
  return (
    <Fragment>
     
      <div className="LoginPageHeaderContainer" >
           <Typography sx={{letterSpacing:{xs:'1px',md:'4px'},fontSize:{xs:'4rem',md:'6rem'}}}variant="h1">shop<span>Z</span>ee</Typography>
       </div>
      <Container
        maxWidth="sm"
        sx={{transform:{xs:'scale(0.9)',md:'scale(1)'}, marginTop: "3rem", boxShadow: "2px 2px 8px" }}
      >
        <SignupForm />
      </Container>
    </Fragment>
  );
};

export default Signup;
