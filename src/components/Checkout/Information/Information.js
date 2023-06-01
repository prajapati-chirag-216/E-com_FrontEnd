import React from "react";
import { useState } from "react";
import classes from "./Information.module.css";
import { Box, TextField, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import Controller from "../Controller/Controller";



const styles = {
  customTextField: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
    "& .MuiInputLabel-root": {
      color: "gray",
      letterSpacing: "1px",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "black",
    },
  },
};

const Information = () => {


  const[country,setCountry] = useState('');
  const [email,setEmail] = useState('');
  const[phone,setPhone] = useState('');
  const[firstName,setFirstName] = useState('');
  const[lastName,setLastName] = useState('');
  const[address,setAddress] = useState('');
  const[city,setCity] = useState('');
  const[state,setState] = useState('');
  const[pin,setPin] = useState('');


  const handlePhoneNumbe = (value) =>{
         let num = value.replace(/\s/g,'').replace(/\D/g,'');
         setPhone(num)
  }


  const handleCityName = (value) =>{

      let name = value.replace(/\s/g,'').replace(/\d/g,'')
      setCity(name)
  }


  const handleStateName = (value) =>{

    let name = value.replace(/\s/g,'').replace(/\d/g,'')
    setState(name)
}


const handleFirstName = (value) =>{

  let name = value.replace(/\s/g,'').replace(/\d/g,'')
  setFirstName(name)
}


const handleLastName = (value) =>{

  let name = value.replace(/\s/g,'').replace(/\d/g,'')
  setLastName(name)
}


const handlePin = (value) =>{

  let name = value.replace(/\s/g,'').replace(/\D/g,'')
  setPin(name)
}





  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: "4rem",
        flexDirection: "column",
        paddingBottom: "5rem",
      }}
    >
      <div className={classes["details-div"]}>
        <div className={classes["title-div"]}>
          <Typography
            sx={{
              color: "rgb(57, 56, 56)",
              fontSize: "1.4rem",
              letterSpacing: "1px",
            }}
          >
            Contact Information
          </Typography>
          <Typography
            sx={{
              color: "gray",
              fontSize: "1.1rem",
              cursor: "pointer",
            }}
          >
            Already have an account?{" "}
            <NavLink className={classes["link"]}>Log in</NavLink>
          </Typography>
        </div>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          autoComplete="off"
          autoCapitalize="off"
          sx={styles.customTextField}
          onChange={(event)=>setEmail(event.target.value)}
        />
        <TextField
          id="phone"
          label="Phone"
          variant="outlined"
          fullWidth
          onChange={(event)=>handlePhoneNumbe(event.target.value)}
          sx={styles.customTextField}
        />
      </div>
      <div className={classes["details-div"]}>
        <Typography
          sx={{
            color: "rgb(57, 56, 56)",
            fontSize: "1.4rem",
            letterSpacing: "1px",
            marginBottom: "0.3rem",
          }}
        >
          Shipping address
        </Typography>
        <TextField
          id="region"
          label="Country/region"
          variant="outlined"
          fullWidth
          sx={styles.customTextField}
          onChange={(event)=>setCountry(event.target.value)}

        />
        <div className={classes["multi_inp-div"]}>
          <TextField
            id="firstName"
            label="First name"
            variant="outlined"
            fullWidth
            sx={styles.customTextField}
          onChange={(event)=>handleFirstName(event.target.value)}
          />
          <TextField
            id="lastName"
            label="Last name"
            variant="outlined"
            fullWidth
            sx={styles.customTextField}
          onChange={(event)=>handleLastName(event.target.value)}

          />
        </div>
        <TextField
          id="address"
          label="Address"
          placeholder="Appartment, suite, etc.(optional)"
          variant="outlined"
          fullWidth
          sx={styles.customTextField}
          onChange={(event)=>setAddress(event.target.value)}

        />
        <div className={classes["multi_inp-div"]}>
          <TextField
            id="city"
            label="City"
            variant="outlined"
            fullWidth
            sx={styles.customTextField}
          onChange={(event)=>handleCityName(event.target.value)}

          />
          <TextField
            id="state"
            label="State"
            variant="outlined"
            fullWidth
            sx={styles.customTextField}
          onChange={(event)=>handleStateName(event.target.value)}

          />
          <TextField
            id="pincode"
            label="PIN code"
            variant="outlined"
            fullWidth
            sx={styles.customTextField}
          onChange={(event)=>handlePin(event.target.value)}

          />
        </div>
        <TextField
          id="phone"
          label="Phone"
          variant="outlined"
          fullWidth
          type="tel"
          sx={styles.customTextField}
        />
      </div>
      <Controller 
      
      isShippingInfo={true}
      country={country}
       email={email}
      phone={phone}
      firstName={firstName}
      lastName={lastName}
      address={address}
      city={city}
      state={state}
      pin={pin}  
      returnTo="cart" continueTo="shipping" />
    </Box>
  );
};

export default Information;
