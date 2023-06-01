import { createSelector } from "reselect";

const orderReducerSlice = (state) => state.order;


export const selectOrderInfo = createSelector(

 [orderReducerSlice],
 (order) => order.orderInfo

)