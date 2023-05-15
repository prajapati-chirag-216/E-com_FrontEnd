import { catagories_types } from "./catagories.types";
import { createAction } from "../../utils/Reducer/reducer.helper";


export const setCatagories = (catagories) =>{
    return createAction(catagories_types.SET_CATAGORIES,catagories)
}


export const setCatagoryId = (catagoryId) =>{

    return createAction(catagories_types.SET_CATAGORIEID,catagoryId)
}

export const setCatagoryName = (catagoryName) =>{

    return createAction(catagories_types.SET_CATAGORIES_NAME,catagoryName)
}