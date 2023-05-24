import { ui_types } from "./ui.types";

const UI_INITIAL_STATE = {
  isLoading: false,
  isLoggedIn: false,
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
    default:
      return state;
  }
};
