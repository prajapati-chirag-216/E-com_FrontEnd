import React, { useState, useRef } from "react";
import { Button, TextField, Typography, useMediaQuery } from "@mui/material";
import AddPhotoAlternate from "@mui/icons-material/AddPhotoAlternate";
import  "./updateInfo.styel.scss";
import { useDispatch, useSelector } from "react-redux";
import './updateInfo.styel.scss'
import { setModelState, setSnackBar, setUser } from "../../../../store/ui/ui.action";
import { UpdateUserInformation } from "../../../../utils/api";


const UpdateInfoForm = ({ action }) => {
    const dispatch = useDispatch();


    const matches = useMediaQuery("(max-width:700px)");
    const [name,setName] = useState('')
    const[email,setEmail] = useState('')
    const[phone,setPhone] = useState('');





    const handleProductAction = async (event) => {
        event.preventDefault();


        let UserInfoObj = {
            name : name,
            email : email,
            phoneNo :phone,
        }


        let updateObj = {};
        for (let key in UserInfoObj) {
            if (UserInfoObj[key]) {
                updateObj[key] = UserInfoObj[key];
            }
        }
        try {
            dispatch(setModelState(false));
          
           const res =  await UpdateUserInformation(updateObj)

            dispatch(setUser(res))
       
           dispatch(setSnackBar({status:true,message:'Your Information Updated Successfully!'}))
        } catch (err) {
              dispatch(setSnackBar({status:true,message:'Somthing Went Wrong!'}))
        }

    };
    return (
        <div>
            <form
                className="product-form"
                onSubmit={handleProductAction}
                method="post"
            >
                <TextField
                    onChange={(e) => setName(e.target.value)}
                    id="outlined-basic"
                    label="Your Name"
                    name="name"
                    variant="outlined"
                    fullWidth={true}
                    autoComplete="off"
                />
                <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    id="outlined-basic"
                    label="Email"
                    name="email"
                    variant="outlined"
                    fullWidth={true}
                    autoComplete="off"
                />

                <TextField
                    onChange={(e) => setPhone(e.target.value)}
                    id="outlined-basic"
                    label="Phone"
                    name="phone"
                    variant="outlined"
                    fullWidth={true}
                    autoComplete="off"
                />

                <Button
                    variant="contained"
                    type="submit"
                    sx={{
                        backgroundColor: "black",
                        padding: matches ? "0.6rem" : "0.8rem",
                        borderRadius: "4px",
                        fontSize: matches ? "0.8rem" : "1rem",
                        "&:hover": { backgroundColor: "black" },
                    }}
                >
                    Update Personal Information
                </Button>
            </form>
        </div>
    );
};

export default UpdateInfoForm;
