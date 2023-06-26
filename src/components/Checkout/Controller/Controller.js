import React, { useState } from "react";
import classes from "./Controller.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { makeOrder } from "../../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectNewCartTotal,
} from "../../../store/cart/cart.selector";
import {
  setOrderInfo,
  updateOrderInfo,
} from "../../../store/Order/order.action";
import StatusButton from "../../../shared/components/StatusButton/StatusButton";
import { selectOrderInfo } from "../../../store/Order/order.selector";
import {
  setAddItemToCart,
  setEmptyCart,
} from "../../../store/cart/cart.action";
const Controller = (props) => {
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectNewCartTotal);
  const order = useSelector(selectOrderInfo);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitAction = async () => {
    if (!props.formIsValid) {
      return props.onValidateForm();
    }
    setIsLoading(true);
    if (props.informationDetails) {
      dispatch(setOrderInfo(props.informationDetails));
    } else if (props.shippingMethod) {
      dispatch(updateOrderInfo({ shippingMethod: props.shippingMethod }));
    } else if (props.paymentDetails) {
      let newCartItems = cartItems.map((item) => {
        return {
          productId: item._id,
          quntity: item.quntity,
        };
      });

      order.orderedItems = newCartItems;
      order.totalPrice = total;
      try {
        await makeOrder(order);
      } catch (err) {
        throw err;
      }
      dispatch(setOrderInfo({}));
    }
    props.onNextPage();
    setIsLoading(false);
  };
  return (
    <div className={classes["controll-div"]}>
      <span onClick={props.onPreviousPage}>
        <ArrowBackIosIcon fontSize="small" /> Return to {props.returnTo}
      </span>
      <StatusButton
        isLoading={isLoading}
        onClick={handleSubmitAction}
        style={{
          fontSize: "1.2rem",
          letterSpacing: "2px",
          backgroundColor: "black",
          "&:hover": {
            backgroundColor: "black",
          },
        }}
      >
        {isLoading ? "" : `${props.continueTo}`}
      </StatusButton>
    </div>
  );
};

export default Controller;
