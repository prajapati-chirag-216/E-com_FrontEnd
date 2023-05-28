// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   isLoggedIn: document.cookie.split("=")[1] === "true",
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout(state) {
//       state.isLoggedIn = false;
//       document.cookie = "loggedIn=false; max-age=-60";
//     },
//     login(state) {
//       state.isLoggedIn = true;
//       document.cookie = `loggedIn=true; max-age=${60 * 60 * 24}`;
//     },
//   },
// });

// export const authActions = authSlice.actions;

// export default authSlice.reducer;
