import React, { useState } from "react";
import classes from "./Controller.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { makeOrder } from "../../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { ArrowRight } from "@mui/icons-material";
import {
  selectCartItems,
  selectNewCartTotal,
} from "../../../store/cart/cart.selector";
import {
  setOrderInfo,
  updateOrderInfo,
} from "../../../store/Order/order.action";
import StatusButton from "../../../shared/components/StatusButton/StatusButton";
const Controller = (props) => {
  const cartItems = useSelector(selectCartItems);
  // const total = useSelector(selectNewCartTotal);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState({ status: false });

  const handleSubmitAction = async () => {
    if (!props.formIsValid) {
      return props.onValidateForm();
    }
    setIsLoading({ status: true });
    if (props.informationDetails) {
      dispatch(setOrderInfo(props.informationDetails));
    } else if (props.shippingMethod) {
      dispatch(updateOrderInfo({ shippingMethod: props.shippingMethod }));
    } else if (props.paymentDetails) {
      console.log(props.paymentDetails);
      // let newCartItems = cartItems.map((item) => {
      //   return {
      //     productId: item._id,
      //     quntity: item.quntity,
      //   };
      // });
      // try {
      //   const res = await makeOrder(props.orderDetails);
      // } catch (err) {
      //   throw err;
      // }
    }
    setIsLoading({ status: false });
    props.onNextPage();
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
        {isLoading.status ? "" : `${props.continueTo}`}
      </StatusButton>
    </div>
  );
};

export default Controller;
