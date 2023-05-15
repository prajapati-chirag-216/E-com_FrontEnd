import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import CartItem from "../CartItem/CartItem";
import image_1 from "../../../assets/display_1.jpg";
import image_2 from "../../../assets/display_2.jpg";
import image_3 from "../../../assets/display_3.jpg";
import classes from "./CartSlider.module.css";
import { Button, Divider, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../../store/cart/cart.selector";

// const cartItems = [
//   { id: "1", name: "shirt", imageUrl: image_1, quntity: 3, price: 30 },
//   { id: "2", name: "shooes", imageUrl: image_2, quntity: 1, price: 10 },
//   { id: "3", name: "shorts", imageUrl: image_3, quntity: 1, price: 15 },
// ];

const CartSlider = (props) => {

const dispatch = useDispatch()
const cartItems = useSelector(selectCartItems)

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
        }}
      />
      <div className={classes["cart-items"]}>
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
