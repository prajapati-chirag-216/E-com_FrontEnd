import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Notification.module.css";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

const ModalOverlay = (props) => (
  <div
    className={`${classes.card} ${classes.modal} ${classes.hideMe} ${
      props.status === "invalid" ? classes.invalid : classes.success
    }`}
  >
    <div className={classes.content}>
      {props.status === "invalid" ? (
        <CancelRoundedIcon sx={{ fill: "rgb(233, 100, 100)" }} />
      ) : (
        <TaskAltIcon />
      )}
      <span
        className={
          props.status === "invalid"
            ? classes["invalid-msg"]
            : classes["success-msg"]
        }
      >
        {props.message}
      </span>
    </div>
  </div>
);

const Notification = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          status={props.status}
        />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default Notification;
