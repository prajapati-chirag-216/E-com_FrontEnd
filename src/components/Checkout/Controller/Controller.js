import React from "react";
import classes from "./Controller.module.css";
import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { makeOrder } from "../../../utils/api";
import { useSelector } from "react-redux";
import { selectCartItems, selectNewCartTotal } from "../../../store/cart/cart.selector";
const Controller = (props) => {
 
  const cartItems = useSelector(selectCartItems)
  const total = useSelector(selectNewCartTotal)
  
  const handleSubmitAction = async() =>{
    
    // console.log(1)

    console.log(props.isShippingInfo)
    if(props.isShippingInfo){

      
      
      const {country , email ,phone, firstName, lastName, address, city ,state, pin} = props
            
      console.log(country)
      console.log(email)
      console.log(phone)
      console.log(firstName)
      console.log(lastName)
      console.log(address)
      console.log(city)
      console.log(state)
      console.log(pin)

       
      if(!country || !email || !phone || !firstName || !lastName || !address || !city || !state || !pin){
          return;
      }
      else{

         let newCartItems  = cartItems.map((item) => {
          
          return{
            productId:item._id,
            quntity:item.quntity
          }})

         console.log(newCartItems)

      const orderObj = {

         contactInformation:{
             email:email,
             phoneNumber:phone
               
           },

           shippingAddress:{

            country:country,
            userName: firstName + ' ' + lastName,
            address:address,
            city:city,
            state:state,
            pinNumber:pin       

           },
          orderedItems:newCartItems,
          totalPrice:total

      }

      let result;
 
       try{

        result = await makeOrder(orderObj)

        console.log(result)

       }catch(err)
       {
         throw err;
       }
         
         
           return result      
           
        }
  }

  }
  return (
    <div className={classes["controll-div"]}>
      <span>
        <ArrowBackIosIcon fontSize="small" /> Return to {props.returnTo}
      </span>
      <Button
        variant="contained"
        sx={{
          fontSize: "1.2rem",
          letterSpacing: "2px",
          backgroundColor: "black",
          "&:hover": {
            backgroundColor: "black",
          },
          padding: "1rem",
        }}
        onClick={()=>handleSubmitAction()}
      >
        Continue to {props.continueTo}
      </Button>
    </div>
  );
};

export default Controller;
