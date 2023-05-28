import React from "react";
import { Card, Grid, CardContent, Button, Typography } from "@mui/material";
import classes from "./Cards.module.css";
import { useDispatch } from "react-redux";
import {
  setCatagoryId,
  setCatagoryName,
} from "../../../store/catagories/catagories.action";
import { setAddItemToCart } from "../../../store/cart/cart.action";
import { setProductDetails } from "../../../store/product/product.action";

const Cards = (props) => {
  const dispatch = useDispatch();

  const changeitemIdHandler = (product) => {
    if (props.isProduct) {
      dispatch(setAddItemToCart(product));
    } else {
      dispatch(setCatagoryId(product._id));
      dispatch(setCatagoryName(product.name));
    }
  };
  const navigateHandler = (productData) => {
    if (props.isProduct) {
      dispatch(setProductDetails(productData));
    }
    window.open(`${props.location}/${productData._id}`);
  };

  return (
    <Grid
      container
      spacing={8}
      sx={{
        p: { xs: "0 3rem", sm: "0 2rem", md: "0 4rem" },
      }}
    >
      {props.data.map((item) => (
        <Grid item xs={12} sm={6} md={6} lg={4} key={item._id}>
          <Card
            onClick={navigateHandler.bind(null, item)}
            sx={{
              minWidth: { xs: "20rem", sm: "20rem", md: "25rem" },
              height: "40rem",
              display: "flex",
              flexDirection: "column",
              border: "1px solid darkgray",
              borderRadius: "0px",
              transition: "all 300ms",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              userSelect: "none",
              "&:hover > img": {
                transform: "scale(1.15)",
              },
            }}
          >
            <img
              className={classes["item-img"]}
              src={props.isProduct ? item.image[0] : item.image}
              alt=""
            />

            <CardContent
              sx={{
                position: "absolute",
                right: "2rem",
                bottom: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
              }}
            >
              <Typography
                align="right"
                sx={{
                  letterSpacing: "3px",
                  color: "white",
                  textTransform: "uppercase",
                  fontSize: "2rem",
                }}
              >
                {item.name}
              </Typography>
              <Button
                onClick={(event) => {
                  if (props.isProduct) {
                    event.stopPropagation();
                  }
                  changeitemIdHandler(item);
                }}
                sx={{
                  color: "white",
                  width: "15rem",
                  alignSelf: "flex-end",
                  fontSize: "1.2rem",
                  padding: "0.8rem 2rem",
                  backgroundColor: "black",
                  transition: "all 500ms",
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  zIndex: 10,
                  "&:hover": {
                    backgroundColor: "black",
                  },
                  borderRadius: "0rem",
                }}
              >
                {props.isProduct ? "Add To Cart" : "Shop Now"}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
export default Cards;
