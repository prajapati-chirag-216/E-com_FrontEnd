import { Divider, Typography, TextField, Button, Box } from "@mui/material";
import "./account.styles.scss";
import { useState } from "react";
import { updatePassword } from "../../../utils/api";
import { useDispatch } from "react-redux";
import { setSnackBar } from "../../../store/ui/ui.action";
import { textFeildStyle } from "../../../utils/function";

const AccountSettings = () => {
  const [newPassword, setnewPassWord] = useState("");
  const [currentPass, setCurrentPass] = useState("");

  const [passErr, setPassErr] = useState(false);
  const dispacth = useDispatch();

  const handlePasswordReset = async () => {
    if (!newPassword || !currentPass) {
      setPassErr(true);
      return;
    }

    const passObj = {
      curPass: currentPass,
      newPass: newPassword,
    };

    try {
      const response = await updatePassword(passObj);

      console.log(response);

      if (response?.success) {
        dispacth(
          setSnackBar({
            status: true,
            message: "Password Changed Successfully",
          })
        );
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
        marginTop: "1.5rem",
      }}
    >
      <div className="headerContainer">
        <Typography
          sx={{
            fontSize: "1.8rem",
            letterSpacing: "1px",
            color: "black",
            fontWeight: "550",
          }}
        >
          Password Reset
        </Typography>
      </div>

      <Divider />

      <div className="inputDiv">
        <TextField
          error={passErr === true}
          id="outlined-error"
          label="currunt Password"
          onChange={(e) => setnewPassWord(e.target.value)}
          sx={textFeildStyle(true)}
        />
        <TextField
          error={passErr === true}
          id="outlined-error"
          label="New Password"
          onChange={(e) => setnewPassWord(e.target.value)}
          sx={textFeildStyle(true)}
        />

        <Button
          sx={{
            background: "black",
            "&:hover": { background: "black" },
            borderRadius: 0,
            width: "30rem",
            padding: "1rem",
            letterSpacing: "3px",
            fontSize: "1.1rem",
            marginTop: "1rem",
          }}
          variant="contained"
          onClick={handlePasswordReset}
        >
          Reset Password
        </Button>
      </div>
    </Box>
  );
};

export default AccountSettings;
