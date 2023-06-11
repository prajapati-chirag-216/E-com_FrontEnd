import { Box, Grid, TextField, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { Divider, Button } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { fetchUserProfile } from "../../../utils/api";
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

const MyProfile = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const showModel = useSelector(selectModelState);

  const handleShowModel = () => {
    dispatch(setModelState(true));
  };

  const closeModelHandler = () => {
    dispatch(setModelState(false));
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "1rem",
        marginTop: "1.5rem",
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
          <Typography sx={{ width: "40rem" }}>
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
              xs={4}
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
              xs={4}
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
              xs={4}
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
              width: "20rem",
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
