import { createAction } from "../../utils/Reducer/reducer.helper";
import { ui_types } from "./ui.types";


export const setIsLoggedIn = (boolean) =>{
    return createAction(ui_types.SET_ISLOGGEDIN,boolean)
}


export const setIsLoading = (boolean) =>{
    return createAction(ui_types.SET_ISLOADING,boolean)
}

