import { createAction } from "../../utils/Reducer/reducer.helper";
import { ui_types } from "./ui.types";


export const setIsLoggedIn = (boolean) =>{
    return createAction(ui_types.SET_ISLOGGEDIN,boolean)
}


export const setIsLoading = (boolean) =>{
    console.log(boolean)
    return createAction(ui_types.SET_ISLOADING,boolean)
}


export const setSearchField = (string) =>{
    return createAction(ui_types.SET_SEARCHFIELD,string)
}


export const setProductData = (data) =>{
    return createAction(ui_types.SET_PRODUCT_DATA,data)

}


export const setProductDataState  = (boolean) =>{

    return createAction(ui_types.SET_PRODUCT_DATA_STATE,boolean)
}
