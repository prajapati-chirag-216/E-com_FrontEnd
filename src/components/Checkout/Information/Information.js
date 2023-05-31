import React from "react";
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
        />
        <TextField
          id="phone"
          label="Phone"
          variant="outlined"
          fullWidth
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
        />
        <div className={classes["multi_inp-div"]}>
          <TextField
            id="firstName"
            label="First name"
            variant="outlined"
            fullWidth
            sx={styles.customTextField}
          />
          <TextField
            id="lastName"
            label="Last name"
            variant="outlined"
            fullWidth
            sx={styles.customTextField}
          />
        </div>
        <TextField
          id="address"
          label="Address"
          placeholder="Appartment, suite, etc.(optional)"
          variant="outlined"
          fullWidth
          sx={styles.customTextField}
        />
        <div className={classes["multi_inp-div"]}>
          <TextField
            id="city"
            label="City"
            variant="outlined"
            fullWidth
            sx={styles.customTextField}
          />
          <TextField
            id="state"
            label="State"
            variant="outlined"
            fullWidth
            sx={styles.customTextField}
          />
          <TextField
            id="pincode"
            label="PIN code"
            variant="outlined"
            fullWidth
            sx={styles.customTextField}
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
      <Controller returnTo="cart" continueTo="shipping" />
    </Box>
  );
};

export default Information;
