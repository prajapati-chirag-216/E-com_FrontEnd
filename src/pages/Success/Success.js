import { Link } from "react-router-dom";
import classes from "./Success.module.css";
import { Container } from "@mui/system";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useMediaQuery } from "@mui/material";

const Success = () => {
  const matches = useMediaQuery("(max-width:700px)");
  return (
    <Container
      maxWidth="sm"
      sx={{
        marginTop: "8rem",
        boxShadow: "2px 2px 8px",
        padding: matches ? "1.5rem" : "2rem",
        userSelect: "none",
      }}
    >
      <header className={classes.header}>Order placed</header>
      <hr className={classes.line}></hr>
      <div className={`${classes.success}`}>
        <p>
          you order is placed succesfully.
          <span className={classes.span}>Please check your profile.</span>
        </p>
      </div>
      <Link to="/profile" className={classes.link}>
        <ArrowBackIosIcon
          sx={{
            fontSize: matches ? "0.7rem" : "1rem",
            marginRight: matches ? "0.4rem" : "0.6rem",
          }}
        />
        Back to Sigin
      </Link>
    </Container>
  );
};

export default Success;
