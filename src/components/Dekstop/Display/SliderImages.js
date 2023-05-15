import React, { Fragment } from "react";
import { motion } from "framer-motion";
import classes from "./SliderImages.module.css";
import { Button, Typography } from "@mui/material";

const transition = { type: "twin", duration: 1 };

const SliderImages = (props) => {
  return (
    <Fragment>
      <motion.img
        key={props.index}
        initial={{ opacity: 0, x: 1000 }}
        transition={transition}
        exit={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        src={props.img}
        alt=""
        className={classes["motion-img"]}
      />
      <motion.div
        key={props.text}
        initial={{ opacity: 0, y: 100 }}
        transition={{ type: "twin", duration: 1, delay: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        className={classes["motion-div"]}
      >
        <Typography
          variant="h4"
          sx={{
            letterSpacing: "1px",
            wordSpacing: "5px",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {props.text}
        </Typography>
        <Button
          sx={{
            width: "15rem",
            padding: "0.9rem",
            letterSpacing: "2px",
            fontWeight: "bold",
            fontSize: "1.5rem",
            position: "absolute",
            top: "5rem",
            transition: "all 200ms",
            backgroundColor: "black",
            "&:hover": {
              color: "black",
              backgroundColor: "white",
            },
          }}
          variant="contained"
        >
          Shop {props.label || "Now"}
        </Button>
      </motion.div>
    </Fragment>
  );
};
export default SliderImages;
