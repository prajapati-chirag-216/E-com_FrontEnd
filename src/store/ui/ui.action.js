import { createAction } from "../../utils/Reducer/reducer.helper";
import { ui_types } from "./ui.types";

export const setIsLoading = (boolean) => {
  return createAction(ui_types.SET_ISLOADING, boolean);
};
export const setSearchField = (string) => {
  return createAction(ui_types.SET_SEARCHFIELD, string);
};
export const setSnackBar = (string) => {
  return createAction(ui_types.SET_SNACKBAR, string);
};
export const setModelState = (boolean) => {
  return createAction(ui_types.SET_MODEL_STATE, boolean);
};
export const setUser = (object) => {
  return createAction(ui_types.SET_USER, object);
};
export const setSuccess = (string) => {
  return createAction(ui_types.SET_SUCCESS, string);
};
export const setInitialLoading = (boolean) => {
  return createAction(ui_types.SET_INITIALLOADING, boolean);
}

