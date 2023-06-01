import { ORDERINFO_TYPES } from "./order.types";

const ORDERINFO_INTIAL_STATE = {

      orderInfo:{}
}


const orderInfoReducer = (state = ORDERINFO_INTIAL_STATE , action ) =>{

     const {type,payload} = action;

     switch(type){
        case ORDERINFO_TYPES.SET_ORDERINFO:
          return{
            ...state,
            orderInfo:payload
          }
        default:
        return state
     }
}

export default orderInfoReducer