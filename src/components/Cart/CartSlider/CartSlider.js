import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import CartItem from "../CartItem/CartItem";
import classes from "./CartSlider.module.css";
import { Button, Divider, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../../store/cart/cart.selector";

const CartSlider = (props) => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

const checkOuthandler = () =>{


window.open('/checkout','_blank')
  navigate('/checkout')
     
}


  return (
    <div
      className={`${classes["cart-dropdown-container"]}
        ${props.status ? "" : classes["hide"]}`}
    >
      <div className={classes["header-div"]}>
        <Typography
          sx={{
            letterSpacing: "5px",
            fontSize: "1.5rem",
            textTransform: "uppercase",
            color: "#5a5a5c",
            alignSelf: "center",
          }}
        >
          Cart
        </Typography>
        <CloseIcon
          sx={{ alignSelf: "center", fontSize: "1.8rem", cursor: "pointer" }}
          onClick={props.onClose}
        />
      </div>
      <Divider
        sx={{
          width: "100rem",
          transform: "translateX(-10rem)",
          backgroundColor: "rgb(240, 240, 240)",
          display: "flex",
          flexDirection: "column",
        }}
      />

      <div className={classes["cart-items"]}>
        {cartItems.length == 0 && (
          <Typography
            variant="h5"
            align="center"
            sx={{
              color: "gray",
              letterSpacing: "2px",
              textTransform: "uppercase",
              margin: "auto",
            }}
          >
            Cart Is Empty !
          </Typography>
        )}
        {cartItems.map((product) => {
          return <CartItem key={product._id} product={product} />;
        })}
      </div>
      <div className={classes["button-div"]}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            padding: "1rem",
            backgroundColor: "black",
            "&:hover": {
              backgroundColor: "black",
            },
            borderRadius: "0rem",
          }}
          onClick={checkOuthandler}
        >
          Go to CheckOut
        </Button>
      </div>
    </div>
  );
};
const CartDropdown = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <CartSlider status={props.status} onClose={props.onClose} />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default CartDropdown;
