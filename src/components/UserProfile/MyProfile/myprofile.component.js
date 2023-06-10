import { TextField, Typography } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { Divider,Button } from '@mui/material'
import { fetchUserProfile } from '../../../utils/api';
import { setModelState, setSnackBar, setUser } from '../../../store/ui/ui.action';
import { useDispatch, useSelector } from 'react-redux';
import SimpleModal from '../../SimpleModel/Model';
import UpdateInfoForm from './Form/updatePersonalInfo';
import './myprofile.styles.scss'
import { selectModelState, selectUser } from '../../../store/ui/ui.selector';

const MyProfile = () => {

    const dispatch = useDispatch();
  
    const user = useSelector(selectUser)
    console.log(user)

    const showModel = useSelector(selectModelState)

    const handleShowModel = () =>{
         
          dispatch(setModelState(true))
    }

    const closeModelHandler = () =>{
         dispatch(setModelState(false))
    }

    useEffect(() => {


        const run = async () => {

            try {
                const data = await fetchUserProfile()
                dispatch(setUser(data.userProfile))

            } catch (err) {
                dispatch(setSnackBar({ status: true, message: 'Somthing Went Wrong!' }))
            }
        }

        run()

    }, [])


    return (

        <Fragment>
            {showModel && (
                <SimpleModal onOpen={showModel} onClose={closeModelHandler}>
                    <UpdateInfoForm />
                </SimpleModal>
            )}

            <div className="myProfilContainer">

                <div className='headerContainer'>

                    <Typography sx={{fontSize:'35px',letterSpacing:'3px'}}>Personal Information</Typography>

                </div>


                <Divider />


               { user && <div className='personalInfoContainer'>
                     

                    <div>
                    <Typography sx={{fontSize:'20px',marginLeft:'3px',marginBottom:'3px'}}>Name</Typography>
                    <div className='infoDiv'>
                        <Typography  sx={{marginLeft:'1rem',fontSize:'2rem'}}> {user.name}</Typography>
                    </div>
                    </div>

                    <div>
                    <Typography sx={{fontSize:'20px',marginLeft:'3px',marginBottom:'3px'}}>Email</Typography>
                    <div className='infoDiv'>
                        <Typography label='Email' sx={{marginLeft:'1rem',fontSize:'2rem'}}>{user.email}</Typography>
                    </div>
                    </div>
                    
                    <div>
                    <Typography sx={{fontSize:'20px',marginLeft:'3px',marginBottom:'3px'}}>Phone No.</Typography>
                    <div className='infoDiv'>
                        <Typography sx={{marginLeft:'1rem',fontSize:'2rem'}}>{user.phoneNo}</Typography>
                    </div>
                    </div>

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
                        onClick={handleShowModel}
                        variant="contained"
                    >
                        Update
                    </Button>


                </div>}


            </div>

        </Fragment>



    )


}


export default MyProfile;