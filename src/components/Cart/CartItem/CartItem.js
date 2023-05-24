import { useRef, useState } from "react";
import { Button, Divider, Typography } from "@mui/material";
import classes from "./CartItem.module.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../../store/cart/cart.selector";
import {
  setAddItemToCart,
  setChangeItemQuantityFromCart,
  setClearItemFromCart,
  setRemoveItemFromCart,
} from "../../../store/cart/cart.action";

const CartItem = (props) => {
  const { name, quntity, image, price } = props.product;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const inputRef = useRef();
  const [itemQuantity, setItemQuantity] = useState(quntity);

  const increaseQuantityHandler = () => {
    dispatch(setAddItemToCart(props.product));
  };
  const decreaseQuantityHandler = () => {
    dispatch(setRemoveItemFromCart(cartItems, props.product));
  };

  const clearItemHandler = () => {
    dispatch(setClearItemFromCart(cartItems, props.product));
  };
  const addQuantityHandler = () => {
    const val = +inputRef.current.value;
    if (val < 0) return;
    dispatch(setChangeItemQuantityFromCart(cartItems, props.product, val));
  };

  return (
    <div className={classes["cart-item-container"]}>
      <div className={classes["img-container"]}>
        <img src={image[0]} alt={`${name}`} />
      </div>
      <div className={classes["item-details"]}>
        <div className={classes["item-description"]}>
          <Typography
            sx={{
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontSize: "1.2rem",
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              letterSpacing: "2px",
            }}
          >
            {price} $
          </Typography>
        </div>
        <div className={classes["controll-div"]}>
          <div className={classes["input-div"]}>
            <RemoveIcon
              sx={{ cursor: "pointer", color: "rgb(58, 58, 58)" }}
              onClick={decreaseQuantityHandler}
            />
            <input
              ref={inputRef}
              value={quntity}
              onChange={addQuantityHandler}
              type="number"
              min="0"
            />
            <AddIcon
              sx={{ cursor: "pointer", color: "rgb(58, 58, 58)" }}
              onClick={increaseQuantityHandler}
            />
          </div>
          <div className={classes["remove-btn"]}>
            <span onClick={clearItemHandler}>remove</span>
            <Divider
              sx={{
                marginTop: "0.3rem",
                background: "black",
                transition: "all 800ms",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
