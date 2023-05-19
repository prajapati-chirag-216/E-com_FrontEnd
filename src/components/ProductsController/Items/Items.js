import React, { Suspense, useState } from "react";
import Cards from "../../Dekstop/Cards/Cards";
import classes from "./Items.module.css";
import { fetchProduct } from "../../../utils/api";
import { store } from "../../../store/store";
import { selectCatagoriId } from "../../../store/catagories/catagories.selector";
import { Await, useLoaderData } from "react-router-dom";

const Items = () => {
  const loaderDate = useLoaderData();

  return (
    <div className={classes["container-div"]}>
      <Suspense>
        <Await resolve={loaderDate}>
          {(products) => (
            <Cards isProduct={true} location="/viewproduct" data={products} />
          )}
        </Await>
      </Suspense>
    </div>
  );
};
export async function loader() {
  let response;
  const state = store.getState();

  const catagoryId = selectCatagoriId(state);
  try {
    response = await fetchProduct(catagoryId);
  } catch (err) {
    throw err;
  }
  return response;
}
export default Items;
