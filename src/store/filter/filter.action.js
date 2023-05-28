import { createAction } from "../../utils/Reducer/reducer.helper";
import { filter_types } from "./filter.types";


export const setSortByHighPrice = (boolean) =>{
    return createAction(filter_types.SET_HIGHPRICE_STATE,boolean)
}
export const setSortByLowPrice = (boolean) =>{
    return createAction(filter_types.SET_LOWPRICE_STATE,boolean)
}
export const setSortByNewDate = (boolean) =>{
    return createAction(filter_types.SET_NEWDATE_STATE,boolean)
}
export const setSortByOldDate = (boolean) =>{
    return createAction(filter_types.SET_OLDDATE_STATE,boolean)
}
export const setSortByPopularity = (boolean) =>{
    return createAction(filter_types.SET_POPULARITY_STATE,boolean)
}




