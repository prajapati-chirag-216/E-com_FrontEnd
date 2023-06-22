import React, { Fragment } from "react";
import { motion } from "framer-motion";
import { Button, Typography } from "@mui/material";
import { fetchSingleCategoryByName } from "../../../utils/api";
import  "./SliderImages.style.scss";

const transition = { type: "twin", duration: 1 };

const SliderImages = (props) => {
  const handleShopButtonClick = async () => {
    try {
      const id = await fetchSingleCategoryByName(props.categoryname);

      if (id) {
        window.open(`/product/${id}`);
      }
    } catch (err) {}
  };

  return (
    <Fragment>
      <div className="img-container">
        <motion.img
          key={props.index}
          initial={{ opacity: 0, x: 1000 }}
          transition={transition}
          exit={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          src={props.img}
          // src='https://res.cloudinary.com/dzpuekeql/image/upload/v1684587879/bagni9injjvd4t53oq6h.jpg'
          alt="unable to load"
          className="motion-img"
        />
      </div>
      <motion.div
        key={props.text}
        initial={{ opacity: 0, y: 100 }}
        transition={{ type: "twin", duration: 1, delay: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="motion-div"
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
          onClick={handleShopButtonClick}
          sx={{
            width: "max-content",
            padding: "1rem",
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
