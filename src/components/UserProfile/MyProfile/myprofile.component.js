import { Box, Grid, TextField, Typography, useMediaQuery } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { Divider, Button } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { addCartItems, fetchUserProfile, logoutUser } from "../../../utils/api";
import {
  setModelState,
  setSnackBar,
  setUser,
} from "../../../store/ui/ui.action";
import { useDispatch, useSelector } from "react-redux";
import SimpleModal from "../../SimpleModel/Model";
import UpdateInfoForm from "./Form/updatePersonalInfo";
import "./myprofile.styles.scss";
import { selectModelState, selectUser } from "../../../store/ui/ui.selector";
import { setClearCart } from "../../../store/cart/cart.action";
import { selectCartItems } from "../../../store/cart/cart.selector";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const matches = useMediaQuery("(max-width:500px)");
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const showModel = useSelector(selectModelState);

  const handleShowModel = () => {
    dispatch(setModelState(true));
  };

  const closeModelHandler = () => {
    dispatch(setModelState(false));
  };

  const logoutHandler = async () => {
    try {
      await addCartItems(cartItems);
      await logoutUser();
    } catch (err) {
      throw err;
    }
    dispatch(setClearCart());
    dispatch(
      setSnackBar({
        status: true,
        severity: "success",
        message: "Logged out successfully",
      })
    );

    window.history.replaceState({}, document.title, "/login");

    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const run = async () => {
      try {
        const data = await fetchUserProfile();
        dispatch(setUser(data.userProfile));
      } catch (err) {
        dispatch(
          setSnackBar({ status: true, message: "Somthing Went Wrong!" })
        );
      }
    };

    run();
  }, []);
  // const logoutHandler = async () => {
  //   try {
  //     await addCartItems(cartItems);
  //     await logoutUser();
  //   } catch (err) {
  //     throw err;
  //   }
  //   dispatch(setClearCart());
  //   dispatch(
  //     setSnackBar({
  //       status: true,
  //       severity: "success",
  //       message: "Logged out successfully",
  //     })
  //   );
  //   window.history.replaceState({}, document.title, "/login");
  //   navigate("/login", { replace: true });
  // };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "1rem",
        marginTop: "1.5rem",
        width: "100%",
      }}
    >
      {showModel && (
        <SimpleModal onOpen={showModel} onClose={closeModelHandler}>
          <UpdateInfoForm />
        </SimpleModal>
      )}

      <div className="headerContainer">
        <div>
          <Typography
            sx={{
              fontSize: "1.8rem",
              letterSpacing: "1px",
              color: "black",
              fontWeight: "550",
            }}
          >
            Personal Information
          </Typography>
          <Typography sx={{ maxWidth: "40rem", wordBreak: "break-word" }}>
            Manage your personal information including Phone number and email
            address where you can be connected
          </Typography>
        </div>
        <Button
          sx={{
            backgroundColor: "black",
            color: "white",
            padding: "0.5rem",
            width: "8rem",
            "&:hover": {
              backgroundColor: "red",
            },
            float: "right",
          }}
          onClick={logoutHandler}
        >
          Sign out
        </Button>
      </div>

      <Divider />

      {user && (
        <Fragment>
          <Grid container gap={3}>
            <Grid
              item
              lg={3}
              md={4}
              sm={6}
              xs={12}
              sx={{
                borderRadius: "1rem",
                border: "1px solid rgb(213, 213, 213)",
                padding: "1rem",
              }}
            >
              <div className="personalInfoContainer">
                <div className="infoHeaderContainer">
                  <Typography
                    sx={{
                      fontSize: "1.3rem",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    Name
                  </Typography>
                  <AccountCircleOutlinedIcon sx={{ color: "gray" }} />
                </div>
                <Typography sx={{ fontSize: "1.2rem", letterSpacing: "1px" }}>
                  {user.name}
                </Typography>
              </div>
            </Grid>
            <Grid
              item
              lg={3}
              md={4}
              sm={6}
              xs={12}
              sx={{
                borderRadius: "1rem",
                border: "1px solid rgb(213, 213, 213)",
                padding: "1rem",
              }}
            >
              <div className="personalInfoContainer">
                <div className="infoHeaderContainer">
                  <Typography
                    sx={{
                      fontSize: "1.3rem",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    Email
                  </Typography>
                  <EmailOutlinedIcon sx={{ color: "gray" }} />
                </div>
                <Typography sx={{ fontSize: "1.2rem", letterSpacing: "1px" }}>
                  {user.email}
                </Typography>
              </div>
            </Grid>
            <Grid
              item
              lg={3}
              md={4}
              sm={6}
              xs={12}
              sx={{
                borderRadius: "1rem",
                border: "1px solid rgb(213, 213, 213)",
                padding: "1rem",
              }}
            >
              <div className="personalInfoContainer">
                <div className="infoHeaderContainer">
                  <Typography
                    sx={{
                      fontSize: "1.3rem",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    Phone No.
                  </Typography>
                  <LocalPhoneOutlinedIcon sx={{ color: "gray" }} />
                </div>
                <Typography sx={{ fontSize: "1.2rem", letterSpacing: "1px" }}>
                  {user.phoneNo}
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Button
            sx={{
              background: "black",
              "&:hover": { background: "black" },
              borderRadius: 0,
              width: !matches ? "20rem" : "100%",
              padding: "1rem",
              letterSpacing: "3px",
              fontSize: "1.1rem",
              marginTop: "1rem",
            }}
            onClick={handleShowModel}
            variant="contained"
          >
            Update
          </Button>
        </Fragment>
      )}
    </Box>
  );
};

export default MyProfile;
