import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import { selectSnackBar } from "../../../store/ui/ui.selector";
import { setSnackBar } from "../../../store/ui/ui.action";
import MuiAlert from "@mui/material/Alert";
import { Typography } from "@mui/material";

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SimpleSnackBar = () => {
  const snackBarDetails = useSelector(selectSnackBar);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(
      setSnackBar({
        status: false,
        message: "",
        severity: snackBarDetails.severity,
      })
    );
  };
  return (
    <div>
      <Snackbar
        open={snackBarDetails.status}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        autoHideDuration={60000}
        TransitionComponent={TransitionLeft}
        key="transitionLeft"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackBarDetails.severity}
          sx={{
            width: "100%",
            padding: "0.5rem 1.2rem",
            fontSize: "1.1rem",
            letterSpacing: "1px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.1rem",
              letterSpacing: "1px",
              color: "whitesmoke",
            }}
          >
            {snackBarDetails.message}
          </Typography>
        </Alert>
      </Snackbar>
    </div>
  );
};
export default SimpleSnackBar;
