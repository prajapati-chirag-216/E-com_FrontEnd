// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   products: [],
//   updateProductId: "",
//   addModelState: false,
//   updateModelState: false,
//   fetchProductData: { status: true, activity: "Fetching.." },
// };

// const productSlice = createSlice({
//   name: "product",
//   initialState,
//   reducers: {
//     setProducts(state, action) {
//       if (action.payload.type === "DELETE") {
//         let filteredProducts = [...state.products];
//         filteredProducts = filteredProducts.filter(
//           (product) => product._id !== action.payload.productId
//         );
//         state.products = filteredProducts;
//       } else if (action.payload.type === "UPDATE") {
//         let filteredProducts = [...state.products];
//         filteredProducts = filteredProducts.filter(
//           (product) => product._id !== action.payload.updatedProduct._id
//         );
//         state.products = [...filteredProducts, action.payload.updatedProduct];
//       } else if (action.payload.type === "ADD") {
//         state.products = [...state.products, action.payload.newProduct];
//       } else {
//         state.products = action.payload;
//       }
//     },
//     setFetchProductData(state, action) {
//       state.fetchProductData.status = action.payload.status;
//       state.fetchProductData.activity = action.payload.activity;
//     },
//     setUpdateProductId(state, action) {
//       state.updateProductId = action.payload;
//     },
//     setAddModelState(state, action) {
//       state.addModelState = action.payload;
//     },
//     setUpdateModelState(state, action) {
//       state.updateModelState = action.payload;
//     },
//   },
// });

// export const productActions = productSlice.actions;

// export default productSlice.reducer;
