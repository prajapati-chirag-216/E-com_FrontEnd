import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import OrderTable from "./orderTable";
import { fetchUserOrders } from "../../../utils/api"



const MyOrders = () =>{



const[userOrder,setUserOrder] = useState({})
const dispatch = useDispatch();


useEffect(()=>{


    const run = async() =>{
          
        try{
            const userOrder = await fetchUserOrders();
            
             console.log(userOrder)
             
             setUserOrder(userOrder)
        }catch(err){
            throw err
        }
    } 

     run()
},[])

     


      return(

         
            <div>
 

              {userOrder.success ? <OrderTable orderData={userOrder.data}/>:
                 <Typography style={{fontSize:'3rem',marginTop:'10rem',letterSpacing:'3px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                  Waiting For Your Orders 😊 !
                </Typography>}
      

       
            </div>
      )
 


          
      
}


export default MyOrders