
import { filter_types } from "./filter.types"


const FILTER_INITIAL_STATE = {

    sortByHighPrice:false,
    sortByLowPrice:false,
    sortByNewDate:false,
    sortByOldDate:false,
    sortByPopularity:false

}





export const filterReducer = (state =FILTER_INITIAL_STATE,action ) =>{

   const  {type,payload} = action


   switch(type){

 case filter_types.SET_HIGHPRICE_STATE:
    return{
        ...state,
        sortByHighPrice:payload
    }
case filter_types.SET_LOWPRICE_STATE:
    return{
        ...state,
        sortByLowPrice:payload
    }
case filter_types.SET_NEWDATE_STATE:
    return{
        ...state,
        sortByNewDate:payload
    }
case filter_types.SET_OLDDATE_STATE:
    return{
        ...state,
        sortByOldDate:payload
    }
case filter_types.SET_POPULARITY_STATE:
    return{
        ...state,
        sortByPopularity:payload
    }
default:
    return state

   }

}