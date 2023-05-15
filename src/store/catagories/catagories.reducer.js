import { catagories_types } from "./catagories.types";

export const CATAGORIES_INITIAL_STATE = {

    catagories: [],
    categoryId:'',
    catagoryName:''
}


export const catagoriesReducer = (state =  CATAGORIES_INITIAL_STATE,action) =>{


    const{type,payload} = action;
console.log(payload)
    switch(type){

        case catagories_types.SET_CATAGORIES:
            return{
                ...state,
                   catagories:payload
            }
        case catagories_types.SET_CATAGORIEID:
            return{
                ...state,
                categoryId:payload
            }
        case catagories_types.SET_CATAGORIES_NAME:
            return{
                ...state,
                catagoryName:payload
            }
            default:
                return state
                 
    }
}