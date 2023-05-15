import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartState: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCartState(state, action) {
      state.cartState = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
