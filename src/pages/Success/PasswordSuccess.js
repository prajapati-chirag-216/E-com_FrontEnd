import { Link } from "react-router-dom";
import classes from "./Success.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Fragment } from "react";
const Success = () => {
  return (
    <Fragment>
      <header className={classes.header}>Instructions have been Emailed</header>
      <hr className={classes.line}></hr>
      <div className={`${classes.success} centered`}>
        <p>
          We have sent a link to reset the password to your registered email.
          <span className={classes.span}>
            Please check your email and follow the instructions.
          </span>
        </p>
      </div>
      <Link to="/admin/signin" className={classes.link}>
        <FontAwesomeIcon icon={faAngleLeft} /> Back to Sigin
      </Link>
    </Fragment>
  );
};

export default Success;
