import { catagories_types } from "./catagories.types";

export const CATAGORIES_INITIAL_STATE = {
  catagories: [],
  categoryId: localStorage.getItem("categoryId") || "",
  catagoryName: localStorage.getItem("catagoryName") || "",
};

export const catagoriesReducer = (state = CATAGORIES_INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case catagories_types.SET_CATAGORIES:
      return {
        ...state,
        catagories: payload,
      };
    case catagories_types.SET_CATAGORIEID:
      localStorage.setItem("categoryId", payload);
      return {
        ...state,
        categoryId: payload,
      };
    case catagories_types.SET_CATAGORIES_NAME:
      localStorage.setItem("catagoryName", payload);
      return {
        ...state,
        catagoryName: payload,
      };
    default:
      return state;
  }
};
