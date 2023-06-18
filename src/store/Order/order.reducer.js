import { ORDERINFO_TYPES } from "./order.types";

const ORDERINFO_INTIAL_STATE = {
  orderInfo: JSON.parse(sessionStorage.getItem("orderInfo")) || {},
};

const orderInfoReducer = (state = ORDERINFO_INTIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ORDERINFO_TYPES.SET_ORDERINFO:
      sessionStorage.setItem("orderInfo", JSON.stringify(payload));
      return {
        ...state,
        orderInfo: payload,
      };
    case ORDERINFO_TYPES.UPDATE_ORDERINFO:
      sessionStorage.setItem(
        "orderInfo",
        JSON.stringify({ ...state.orderInfo, ...payload })
      );
      return {
        ...state,
        orderInfo: { ...state.orderInfo, ...payload },
      };
    default:
      return state;
  }
};

export default orderInfoReducer;
