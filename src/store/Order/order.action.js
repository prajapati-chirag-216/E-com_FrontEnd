import { createAction } from "../../utils/Reducer/reducer.helper"
import { ORDERINFO_TYPES } from "./order.types"

export const setorderInfo = (data) =>{

     return createAction(ORDERINFO_TYPES.SET_ORDERINFO,data)
}