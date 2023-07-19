import React, { useEffect, useState } from "react";
import { memo } from "react";
import { Box, Container, Divider, Typography } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { styled } from "@mui/material/styles";
import StepLabel from "@mui/material/StepLabel";
import PropTypes from "prop-types";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import DoorBackIcon from "@mui/icons-material/DoorBack";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import CircularProgress from "@mui/material/CircularProgress";

import { useLocation } from "react-router-dom";
import { fetchOrder } from "../../../utils/api";
import classes from "./OrderStatus.module.css";
import moment from "moment";
import { useMediaQuery } from "@mui/material";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <PendingActionsIcon />,
    2: <DeliveryDiningIcon />,
    3: <DoorBackIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = ["Pending", "Shipped", "Reaching Your Door"];

const OrderStatus = () => {
  const tabMatches = useMediaQuery("(max-width:1100px)");
  const phoneMatches = useMediaQuery("(max-width:800px)");

  const [orderDetails, setOrderDetails] = useState(null);
  const location = useLocation();
  const Text_Color = {
    DeliveryStatus: {
      Pending: "red",
      Shipped: "gray",
      "Out For Delivery": "green",
    },

    TransactionId: "blue",
  };
  const font_weight = {
    DeliveryStatus: "700",
  };
  const typographyStyle = {
    fontSize: !tabMatches ? "1.2rem" : "1.1rem",
    letterSpacing: "1px",
    color: "rgb(80,80,80)",
  };
  useEffect(() => {
    const fetch = async () => {
      const url = location.pathname.split("/");
      const orderId = url[url.length - 1];
      const res = await fetchOrder(orderId);
      return res;
    };
    fetch()
      .then((res) => {
      
        const totalQuantity = res[0].orderedItems.reduce(
          (totalQuantity, item) => totalQuantity + item.quntity,
          0
        );
        setOrderDetails({ ...res[0], totalQuantity });
      })
      .catch((err) => {
        throw err;
      });
  }, []);
  if (!orderDetails || orderDetails.length == 0)
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "3rem",
        }}
      >
        <CircularProgress sx={{ color: "black" }} />
      </Container>
    );
  return (
    <Box
      sx={{
        width: "90%",
        padding: "1rem",
        marginTop: "3rem",
        marginBottom: "5rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <div className={classes["status-header"]}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <Typography
            align="center"
            sx={{
              fontSize: "1.8rem",
              letterSpacing: "2px",
              color: "rgb(50,50,50)",
              fontWeight: "550",
              flexGrow: 1,
              marginLeft: "12rem",
            }}
          >
            Your Order Status
          </Typography>
          <Typography
            sx={{
              marginLeft: "auto",
              width: "fit-content",
              letterSpacing: "2px",
            }}
          >
            {moment(orderDetails.createdAt).format("D MMM YYYY, h:mm A")}
          </Typography>
        </Box>
        <Stepper
          style={{ width: "80%" }}
          alternativeLabel
          activeStep={
            orderDetails.deliveryStatus === "Pending"
              ? 0
              : orderDetails.deliveryStatus === "Shipped"
              ? 1
              : 2
          }
          connector={<ColorlibConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div className={classes["order-container"]}>
        <div className={classes["items-container"]}>
          {orderDetails &&
            orderDetails.orderedItems.map((item) => {
              return (
                <div
                  key={item.productId._id}
                  className={classes["item-data-container"]}
                >
                  <div className={classes["item-img"]}>
                    <img src={item.productId.image[0].imageLink} />
                  </div>
                  <div className={classes["item-details"]}>
                    <Typography
                      sx={{
                        color: "black",
                        fontSize: !tabMatches ? "1.3rem" : "1.2rem",
                        letterSpacing: "1px",
                      }}
                    >
                      {item.productId.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: !tabMatches ? "1.1rem" : "1rem",

                        letterSpacing: "1px",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {item.productId.description.slice(
                        0,
                        !phoneMatches ? (!tabMatches ? 150 : 120) : 60
                      )}
                      ..
                    </Typography>
                    <div>
                      <Typography
                        sx={{
                          color: "black",
                          fontSize: !tabMatches ? "1.2rem" : "1.1rem",

                          letterSpacing: "1px",
                        }}
                      >
                        ${item.productId.price}
                      </Typography>
                      <Typography
                        sx={{
                          color: "black",
                          fontSize: !tabMatches ? "1.2rem" : "1.1rem",

                          letterSpacing: "1px",
                        }}
                      >
                        Qty: {item.quntity}
                      </Typography>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className={classes["order-details"]}>
          <div className={classes["order-address"]}>
            <Typography
              sx={{
                fontSize: !tabMatches ? "1.5rem" : "1.3rem",
                color: "black",
                marginBottom: "1rem",
                letterSpacing: "1px",
              }}
            >
              Shipping Address
            </Typography>
            <Typography sx={typographyStyle}>
              {orderDetails.shippingAddress.userName}
            </Typography>
            <Typography sx={typographyStyle}>
              {orderDetails.shippingAddress.address},{" "}
              {orderDetails.shippingAddress.city},{" "}
              {orderDetails.shippingAddress.state},{" "}
              {orderDetails.shippingAddress.country}{" "}
              {orderDetails.shippingAddress.pinNumber}
            </Typography>
          </div>
          <div className={classes["order-bill"]}>
            <Typography
              sx={{
                fontSize: !tabMatches ? "1.5rem" : "1.3rem",
                color: "black",
                marginBottom: "1rem",
                letterSpacing: "1px",
              }}
            >
              Order Summary
            </Typography>
            <div>
              <Typography sx={typographyStyle}>total Items</Typography>
              <Typography sx={typographyStyle}>
                {orderDetails.totalQuantity}
              </Typography>
            </div>
            <div>
              <Typography sx={typographyStyle}>Delivary charges</Typography>
              <Typography sx={typographyStyle}>free</Typography>
            </div>
            <div>
              <Typography sx={typographyStyle}>subTotal</Typography>
              <Typography sx={typographyStyle}>
                $ {orderDetails.totalPrice}
              </Typography>
            </div>
            <div>
              <Typography sx={typographyStyle}>Payment Method</Typography>
              <Typography sx={typographyStyle}>
                {orderDetails.shippingMethod}
              </Typography>
            </div>
            <Divider
              sx={{
                margin: !tabMatches ? "1rem 0 1rem 0" : "0.5rem 0 0.5rem 0",
              }}
            />
            <div>
              <Typography
                sx={{
                  ...typographyStyle,
                  color: "rgb(80,80,80)",
                  fontWeight: "550",
                  fontSize: !tabMatches ? "1.3rem" : "1.2rem",
                  letterSpacing: "0.5px",
                }}
              >
                Grand total
              </Typography>
              <Typography
                sx={{
                  ...typographyStyle,
                  color: "rgb(80,80,80)",
                  fontWeight: "550",
                  fontSize: !tabMatches ? "1.3rem" : "1.2rem",
                  letterSpacing: "0.5px",
                }}
              >
                $ {orderDetails.totalPrice}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default memo(OrderStatus);
