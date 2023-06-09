import { Divider, Typography,TextField, Button} from '@mui/material'
import './account.styles.scss'
import { useState } from 'react';

const AccountSettings = () => {

const[newPassword,setnewPassWord] = useState('');
const[passErr,setPassErr] = useState(false);

const handlePasswordReset = () =>{

       if(!newPassword){
           setPassErr(true)
           return;
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