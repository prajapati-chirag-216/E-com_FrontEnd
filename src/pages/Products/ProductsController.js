import React from "react";
import Items from "../../components/ProductsController/Items/Items";
import classes from "./ProductsController.module.css";
import Header from "../../components/ProductsController/Header/Header";
const ProductsController = () => {
  return (
    <div className={classes["container-div"]}>
      <Header />
      <Items />
    </div>
  );
};

export default ProductsController;
