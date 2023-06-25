import { useNavigate, useOutletContext } from "react-router-dom";
import classes from "./Success.module.css";
import { Container } from "@mui/system";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Typography, useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { setClearCart, setIsCartOpen } from "../../store/cart/cart.action";
import { Fragment, useEffect, useState } from "react";
import ConfettiGenerator from "confetti-js";
import "./Success.module.css";

const Success = () => {
  const props = useOutletContext();
  const matches = useMediaQuery("(max-width:700px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateHandler = (location) => {
    navigate(location, { replace: true });
  };

  useEffect(() => {
    const urlArray = window.location.href.split("/");

    if (urlArray[urlArray.length - 1] === "success") {
      const canvasSettings = {
        target: "world",
        max: 200,
        props: ["square", "triangle", "line", "circle"],
        colors: [
          [165, 104, 246],
          [230, 61, 135],
          [0, 199, 228],
          [253, 214, 126],
        ],
        rotate: true,
      };

      const canvas = new ConfettiGenerator(canvasSettings);

      canvas.render();

      setTimeout(() => {
        canvas.clear();
      }, 5000);
    }
  }, [window.location.href]);

  useEffect(() => {
    if (props?.for === "order") {
      dispatch(setClearCart());
      dispatch(setIsCartOpen(false));
    }
  }, [dispatch, props?.for]);
  return (
    <div style={{ position: "relative" }}>
      <canvas style={{ zIndex: "-1" }} id="world"></canvas>
      <Container
        maxWidth="sm"
        sx={{
          transform: { xs: "scale(0.9)", md: "scale(1.4)" },
          boxShadow: "2px 2px 8px",
          padding: matches ? "1.5rem" : "2rem",
          userSelect: "none",
          position: "absolute",
          top: "10rem",
          left: 0,
          right: 0,
        }}
      >
        <header className={classes.header}>
          {props.for === "password"
            ? "Instructions have been Emailed"
            : "Order placed"}
        </header>
        <hr className={classes.line}></hr>
        <div className={`${classes.success}`}>
          <Typography
            sx={{
              fontSize: "1.2rem",
              color: "rgb(100,100,100)",
              letterSpacing: "0.5px",
            }}
          >
            {props.forPasswordReset
              ? "We have sent a link to reset the password to your registered email."
              : "you order is placed succesfully."}
          </Typography>
          <Typography
            sx={{
              fontSize: "1.2rem",
              color: "rgb(50,50,50)",
              letterSpacing: "0.5px",
            }}
          >
            {props.forPasswordReset
              ? "Please check your email and follow the instructions."
              : "Please check your profile."}
          </Typography>
        </div>
        <Typography
          onClick={navigateHandler.bind(
            null,
            props.forPasswordReset ? "/login" : "/myProfile"
          )}
          sx={{
            fontSize: "1.1rem",
            "&:hover": {
              cursor: "pointer",
              color: "black",
            },
            display: "flex",
            alignItems: "center",
            transition: "all 100ms",
          }}
        >
          <ArrowBackIosIcon
            sx={{
              fontSize: matches ? "0.7rem" : "1rem",
              marginRight: matches ? "0.2rem" : "0.4rem",
            }}
          />
          {props.forPasswordReset ? "Back to login" : "Go to Profile"}
        </Typography>
      </Container>
    </div>
  );
};

export default Success;
