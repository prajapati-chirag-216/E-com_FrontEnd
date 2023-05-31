import React, { useEffect, useState } from "react";
import { Card, Grid, CardContent, Button, Typography } from "@mui/material";
import classes from "./Cards.module.css";
import { useDispatch, useSelector } from "react-redux";

import {
  setCatagoryId,
  setCatagoryName,
} from "../../../store/catagories/catagories.action";
import { setAddItemToCart } from "../../../store/cart/cart.action";
import { setProductDetails } from "../../../store/product/product.action";
import { selectSearchField } from "../../../store/ui/ui.selector";
import { fetchDataByName } from "../../../utils/api";
const style = {
  card: {
    minWidth: { xs: "20rem", sm: "20rem", md: "25rem" },
    height: "40rem",
    display: "flex",
    flexDirection: "column",
    border: "1px solid rgb(190, 190, 190)",
    borderBottom: "none",
    borderRadius: "0px",
    transition: "all 300ms",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    userSelect: "none",
    "&:hover > img": {
      transform: "scale(1.15)",
    },
    "&::before": {
      content: "''",
      position: "absolute",
      top: "50%", // Adjust this value to control the spread of the shadow
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent)", // Shadow gradient
      pointerEvents: "none",
      zIndex: 1,
    },
    "&::after": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(80, 80, 80, 0.15)", // Light gray with 0.3 opacity
      pointerEvents: "none", // Allow clicking through the overlay
      zIndex: 2,
    },
  },
  button: {
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
  },
};
const Cards = (props) => {
  const dispatch = useDispatch();

  const [data, setData] = useState(props.data);
  const [filteredData, setfilteredData] = useState(props.data);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  useEffect(() => {
    setfilteredData(data);
  }, [data]);

  const searchByNameString = useSelector(selectSearchField);

  useEffect(() => {
    const getFilteredData = async () => {
      if (searchByNameString === "") {
        setfilteredData(props.data);
      } else {
        let filteredData;
        filteredData = await fetchDataByName(searchByNameString, props.data);
        setfilteredData(filteredData);
      }
    };

    getFilteredData();
  }, [searchByNameString]);

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
      {filteredData.length !== 0 ? (
        filteredData.map((item) => (
          <Grid item xs={12} sm={6} md={6} lg={4} key={item._id}>
            <Card onClick={navigateHandler.bind(null, item)} sx={style.card}>
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
                  zIndex: 10,
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
                  sx={style.button}
                >
                  {props.isProduct ? "Add To Cart" : "Shop Now"}
                </Button>
              </CardContent>
            </Card>
            {console.log(item)}
            {props.isProduct && (
              <div className={classes["item_details-div"]}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: "rgb(80,80,80)",
                    width: "fit-content",
                    textAlign: "center",
                  }}
                >
                  {item.description.split(".")[0]}
                </Typography>
                <Typography sx={{ fontSize: "1.2rem", letterSpacing: "1px" }}>
                  $ {item.price}
                </Typography>
              </div>
            )}
          </Grid>
        ))
      ) : (
        <Typography
          sx={{
            fontSize: "1.5rem",
            letterSpacing: "3px",
            margin: "10rem auto",
            color: "darkgray",
          }}
        >{`No Search Result for ${searchByNameString}`}</Typography>
      )}
    </Grid>
  );
};
export default Cards;
