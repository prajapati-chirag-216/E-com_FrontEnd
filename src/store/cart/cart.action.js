import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/Reducer/reducer.helper";

 const addCartItem = (cartItems,product) =>{


   const itemExist = cartItems.find((item) =>{
    return item._id === product._id
   })


   if(itemExist){

    return cartItems.map((item) =>{
        return(
            item._id === product._id?{...item,quntity:item.quntity+1}:item
        )
    })
   }
  return [...cartItems,{...product,quntity:1}]
}

const removeCartItem = (cartItems,itemToBeRemoved) =>{

      if(itemToBeRemoved.quntity === 1){
        return cartItems.filter((item)=>item._id != itemToBeRemoved._id)
      }

      return cartItems.map((item)=>{
        return(
            item._id == itemToBeRemoved._id?{...item,quntity:item.quntity-1}:item
      )
        })
}


const clearCartItem = (cartItems,itemToBeCleared) => {

    return cartItems.filter((item) => item.id != itemToBeCleared.id)
}


export const setIsCartOpen = (boolean) =>{

     return  createAction(CART_ACTION_TYPES.SET_CART_ISOPEN,boolean)
}

export const setAddItemToCart = (cartItems,productToAdd) => {

    const newCartItems = addCartItem(cartItems,productToAdd)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems)
}

export const setRemoveItemFromCart = (cartItems,productToRemove) =>{

    const newCartItems = removeCartItem(cartItems,productToRemove)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems)
}


export const setClearItemFromCart = (cartItems,productToClear) => {

     const newCartItems = clearCartItem(cartItems,productToClear)
     return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems)

}