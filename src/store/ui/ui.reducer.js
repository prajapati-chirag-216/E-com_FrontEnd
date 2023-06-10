import { ui_types } from "./ui.types";

const UI_INITIAL_STATE = {
  searchField: "",
  productData: [],
  productDataState: false,
  snackBar: {
    status: false,
    message: "",
  },
  modelState:false,
  user:null
  success: false,
};

export const uiReducer = (state = UI_INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
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
    case ui_types.SET_MODEL_STATE:
      return{
        ...state,
        modelState:payload
      }
    case ui_types.SET_USER:
      return{
        ...state,
        user:payload
      }
    case ui_types.SET_SUCCESS:
      return {
        ...state,
        success: payload,
      };
    default:
      return state;
  }
};
