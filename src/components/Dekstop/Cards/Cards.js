import React, { Fragment, useEffect, useRef, useState } from "react";
import { Card, Grid, CardContent, Button, Typography } from "@mui/material";
import classes from "./Cards.module.css";
import { useDispatch, useSelector } from "react-redux";


import {
  setCatagoryId,
  setCatagoryName,
} from "../../../store/catagories/catagories.action";
import { setAddItemToCart } from "../../../store/cart/cart.action";
import { setProductDetails } from "../../../store/product/product.action";
import { selectIsLoading, selectSearchField } from "../../../store/ui/ui.selector";
import { fetchDataByName } from "../../../utils/api";
import { setIsLoading } from "../../../store/ui/ui.action";
import LoadingSpinner from "../UI/LoadingSpinner";
const style = {
  card: {
    width: { xs: "23rem", md: "35rem" },
    height: {xs:'30rem',md:'40rem'},
    display: "flex",
    flexDirection: "column",
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px',
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
   const isLoading = useSelector(selectIsLoading)
   const [isLoaded,setIsLoaded] = useState(false)
   const imageElementRef = useRef(null);
  const actualImgSrc = imageElementRef.current?.getAttribute('data-src');
  console.log(actualImgSrc)

  useEffect(() => {
  
    dispatch(setIsLoading(false))
    setData(props.data);
  }, [props.data]);

  useEffect(() => {
    dispatch(setIsLoading(false))
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
    <Fragment>
   
    <Grid
    container
    spacing={8}
    sx={{
      p: { xs: "5rem", md: "0 4rem" },
      columnGap:{xs: props.isProduct?'2rem':'0rem',md:'0rem'},
      marginLeft:{xs:props.isProduct?'-105px':'-64px'}
    }}
    >
          {isLoading && <LoadingSpinner/>}
      {filteredData.length !== 0 ? (
        filteredData.map((item) =>        {

          console.log(item,'on')

       return (   <Grid  sx={{flex:1,width:{xs:'22rem',display:'flex',flexDirection:'column'},paddingLeft:{xs:props.isProduct?'30px':'64px'}}}item xs={12} sm={6} md={6} lg={4} key={item._id}>
            <Card onClick={navigateHandler.bind(null, item)} sx={style.card}>
              
              <img
                onLoad={()=>{
                   setIsLoaded(true)
                }}
                ref={imageElementRef}
                id='listImages'
                className={classes["item-img"]}
                src={props.isProduct ? isLoaded ? item.image[0].imageLink : item.image[0].blurImg :  isLoaded ? item.image : item.blurImg}
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
            {props.isProduct && (
              <div className={classes["item_details-div"]}>
                <Typography
                  sx={{
                    fontSize:{xs:'0.8rem',md:"1rem"},
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
          
       )})
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
    </Fragment>
  );
};
export default Cards;
