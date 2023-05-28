import { ui_types } from "./ui.types";

const UI_INITIAL_STATE = {
  isLoading: true,
  isLoggedIn: false,
  searchField:'',
  productData:[],
  productDataState:false
};

export const uiReducer = (state = UI_INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ui_types.SET_ISLOGGEDIN:
      return {
        ...state,
        isLoggedIn: payload,
      };
    case ui_types.SET_ISLOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case ui_types.SET_SEARCHFIELD:
      return{
        ...state,
        searchField:payload
      }
      case ui_types.SET_PRODUCT_DATA:
        return{
          ...state,
          productData:payload
        }
      case ui_types.SET_PRODUCT_DATA_STATE:
        return{
          ...state,
          productDataState:payload
        }
    default:
      return state;
  }
};
