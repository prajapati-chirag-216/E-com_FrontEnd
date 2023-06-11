import { Divider, Typography,TextField, Button} from '@mui/material'
import './account.styles.scss'
import { useState } from 'react';
import { updatePassword } from '../../../utils/api';
import { useDispatch } from 'react-redux';
import { setSnackBar } from '../../../store/ui/ui.action';

const AccountSettings = () => {

const[newPassword,setnewPassWord] = useState('');
const[currentPass,setCurrentPass] = useState('');

const[passErr,setPassErr] = useState(false);
const dispacth = useDispatch();

const handlePasswordReset = async() =>{

       if(!newPassword || !currentPass){
           setPassErr(true)
           return;
       }

       const passObj = {
          curPass:currentPass,
          newPass:newPassword
       }


       try{
         const response = await updatePassword(passObj)


         console.log(response)
           
           if(response?.success){
             dispacth(setSnackBar({status:true,message:'Password Changed Successfully'}))
           }

       }catch(err){
        throw err
       }
      
}





    return (
        <div className='accountPageContainer'>


            <div className='headerContainer'>
                <Typography sx={{ fontSize: '35px', letterSpacing: '3px' }}>Password Reset</Typography>
            </div>

            <Divider />


            <div className='inputDiv'>

                <TextField
                    error = {passErr === true}
                    id="outlined-error"
                    label="Current Password"
                    onChange={(e) => setCurrentPass(e.target.value)}
                />

                <TextField
                    error = {passErr === true}
                    id="outlined-error"
                    label="New Password"
                    onChange={(e) => setnewPassWord(e.target.value)}
                />

            <Button
                sx={{
                    background: "black",
                    "&:hover": { background: "black" },
                    borderRadius: 0,
                    width: "30rem",
                    height: "4rem",
                    letterSpacing: "3px",
                    fontSize: "1.1rem",
                    "&:active": { transform: "scale(0.9)" },
                }}
                variant="contained"
                onClick={handlePasswordReset}
            >
                Reset Password
            </Button>
            </div>



        </div>
    )
}


export default AccountSettings