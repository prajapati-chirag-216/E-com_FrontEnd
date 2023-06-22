import React from "react";
import Categories from "../../components/Dekstop/Category/Categories";
import Display from "../../components/Dekstop/Display/Display";
import CartSlider from "../../components/Cart/CartSlider/CartSlider";
import "./Deshboard.style.scss";
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart.action";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { uiActions } from "../../mystore/ui-slice";

const Deshboard = () => {
  const cartState = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();
  const closeCartHandler = () => dispatch(setIsCartOpen(false));
  return (
    <div className="container-div">
    
      <Display />
      <Categories />
      <CartSlider status={cartState} onClose={closeCartHandler} />
    </div>
  );
};

export default Deshboard;
