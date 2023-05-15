import React from "react";
import { Card, Grid, CardContent, Button, Typography } from "@mui/material";
import classes from "./Cards.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setCatagoryId,
  setCatagoryName,
} from "../../../store/catagories/catagories.action";
import { selectCartItems } from "../../../store/cart/cart.selector";
import { setAddItemToCart } from "../../../store/cart/cart.action";
import { setProductDetails } from "../../../store/product/product.action";

const Cards = (props) => {
  console.log(props.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const changeitemIdHandler = (product) => {
    if (props.isProduct) {
      dispatch(setAddItemToCart(cartItems, product));
    } else {
      dispatch(setCatagoryId(product._id));
      dispatch(setCatagoryName(product.name));
      navigate(props.location);
    }
  };
  const navigateHandler = (productData) => {
    if (props.isProduct) {
      navigate(props.location);
      dispatch(setProductDetails(productData));
    }
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

              {/* <a href={props.location} target="_blank" rel="noreferrer"> */}
              <Button
                onClick={changeitemIdHandler.bind(null, item)}
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
                  "&:hover": {
                    backgroundColor: "black",
                  },
                  borderRadius: "0rem",
                }}
              >
                {props.isProduct ? "Add To Cart" : "Shop Now"}
              </Button>
              {/* </a> */}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
export default Cards;
