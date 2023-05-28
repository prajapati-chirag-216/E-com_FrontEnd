import { createAction } from "../../utils/Reducer/reducer.helper";
import { ui_types } from "./ui.types";

export const setIsLoading = (boolean) => {
  return createAction(ui_types.SET_ISLOADING, boolean);
};
export const setLoginUser = () => {
  return createAction(ui_types.SET_LOGIN_USER);
};
export const setLogoutUser = () => {
  return createAction(ui_types.SET_LOGOUT_USER);
};
