import { cookieParser } from "../../utils/function";
import { ui_types } from "./ui.types";

const UI_INITIAL_STATE = {
  isLoading: true,
  isLoggedIn: cookieParser()["  "] === "true",
  accessToken: null,
  searchField: "",
  productData: [],
  productDataState: false,
  snackBar: {
    status: false,
    message: "",
  },
};

export const uiReducer = (state = UI_INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ui_types.SET_LOGIN_USER:
      document.cookie = `userAuth=true; max-age=${1000 * 60 * 60 * 24 * 2}`;
      return {
        ...state,
        isLoggedIn: true,
      };
    case ui_types.SET_LOGOUT_USER:
      document.cookie = "userAuth=false; max-age=-60";
      return {
        ...state,
        isLoggedIn: false,
      };
    case ui_types.SET_ACCESS_TOKEN:
      document.cookie = `userAuth=true; max-age=${1000 * 60 * 60 * 24 * 2}`;
      return {
        ...state,
        isLoggedIn: true,
      };
    case ui_types.SET_ISLOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case ui_types.SET_SEARCHFIELD:
      return {
        ...state,
        searchField: payload,
      };
    case ui_types.SET_PRODUCT_DATA:
      return {
        ...state,
        productData: payload,
      };
    case ui_types.SET_PRODUCT_DATA_STATE:
      return {
        ...state,
        productDataState: payload,
      };
    case ui_types.SET_SNACKBAR:
      return {
        ...state,
        snackBar: payload,
      };
    default:
      return state;
  }
};
