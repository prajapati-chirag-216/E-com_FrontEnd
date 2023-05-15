import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import uiReducer from "./ui-slice";
import productReducer from "./product-slice";

const store = configureStore({
  reducer: { auth: authReducer, ui: uiReducer, product: productReducer },
});
export default store;
