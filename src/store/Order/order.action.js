import { createAction } from "../../utils/Reducer/reducer.helper";
import { ORDERINFO_TYPES } from "./order.types";

export const setOrderInfo = (data) => {
  return createAction(ORDERINFO_TYPES.SET_ORDERINFO, data);
};
export const updateOrderInfo = (data) => {
  return createAction(ORDERINFO_TYPES.UPDATE_ORDERINFO, data);
};
