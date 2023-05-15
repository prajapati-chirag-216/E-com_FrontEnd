import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Notification.module.css";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const ModalOverlay = (props) => (
  <div
    className={`${classes.card} ${classes.modal} ${classes.hideMe} ${
      props.status === "invalid" ? classes.invalid : classes.success
    }`}
  >
    <div className={classes.content}>
      <span>
        {props.status === "invalid" ? <ErrorOutlineIcon /> : <TaskAltIcon />}
      </span>
      <span>{props.message}</span>
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
