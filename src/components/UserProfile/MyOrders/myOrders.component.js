import { fetchUserOrders, fetchUserProfile } from "../../../utils/api"
import { setSnackBar } from "../../../store/ui/ui.action"
import * as React from "react";
import { useState, useEffect, memo, Fragment } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Typography } from "@mui/material";
import OrderTable from "./orderTable";



const MyOrders = () =>{



const[userOrder,setUserOrder] = useState()
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
 

              {userOrder ? <OrderTable orderData={userOrder}/>:
                 <Typography style={{fontSize:'3rem',marginTop:'10rem',letterSpacing:'3px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                  Waiting For Your Orders 😊 !
                </Typography>}
      

       
            </div>
      )
 


          
      
}


export default MyOrders