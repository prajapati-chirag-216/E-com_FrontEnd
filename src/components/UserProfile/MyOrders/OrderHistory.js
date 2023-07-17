import React, { Fragment, useEffect, useState } from "react";
import classes from "./OrderHistory.module.css";
import {
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const OrderHistory = (props) => {
  const matches = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const navigateHandler = (id) => navigate(`/orderStatus/${id}`);
  const [totalQuantity, setTotalQuantity] = useState([]);
  useEffect(() => {
    const quantity = props.orderData.map((order) =>
      order.orderedItems.reduce(
        (totalQuantity, item) => totalQuantity + item.quntity,
        0
      )
    );
    setTotalQuantity(quantity);
  }, []);

  return (
    <div className={classes["myOrder-container"]} id="myOrder-container">
      <div className={classes["myOrder-header"]}>
        <Typography
          sx={{
            fontSize: "1.8rem",
            letterSpacing: "1px",
            color: "black",
            fontWeight: "550",
          }}
        >
          Order List
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
            letterSpacing: "1px",
          }}
        >
          stay updated with your orders track your status
        </Typography>
      </div>
      <Box
        sx={{
          height: "fit-content",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "5px",
          },

          "&::-webkit-scrollbar-track": {
            backgroundColor: "rgb(240, 240, 240)",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "20px",
            background: "#76767644",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#d1d1d1",
          },
        }}
      >
        <Grid container spacing={4} sx={{ height: "48rem" }}>
          {props.orderData.map((order, index) => (
            <Grid item xs={6} md={6} sm={12} lg={4} key={order._id}>
              <div className={classes["order-container"]}>
                <div className={classes["order-header"]}>
                  <div>
                    <Typography
                      sx={{
                        fontSize: "1.2rem",
                        letterSpacing: "1px",
                        color: "black",
                        fontWeight: "500",
                      }}
                    >
                      Order #{index + 1}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        letterSpacing: "1px",
                      }}
                    >
                      {moment(order.createdAt).format("D MMM YYYY, h:mm A")}
                    </Typography>
                  </div>
                  <VerifiedIcon
                    sx={{
                      color: "green",
                      fontSize: "1.6rem",
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                  />
                </div>
                <div
                  className={classes["order-details"]}
                  id={`order-detail${index}`}
                >
                  {order.orderedItems.map((itemData, index) => (
                    <div
                      key={itemData.productId._id}
                      className={classes["item-container"]}
                    >
                      <div className={classes["item-image"]}>
                        <img src={itemData.productId.image[0]} />
                      </div>
                      <div className={classes["item-details"]}>
                        <Typography
                          sx={{
                            color: "rgb(50,50,50)",
                            letterSpacing: "1px",
                            fontSize: !matches ? "1.2rem" : "1.1rem",
                          }}
                        >
                          {itemData.productId.name}
                        </Typography>
                        <Typography
                          sx={{
                            letterSpacing: "0.5px",
                            fontSize: !matches ? "1.1rem" : "1rem",
                          }}
                        >
                          {itemData.productId.description.slice(
                            0,
                            !matches ? 50 : 35
                          )}
                          ..
                        </Typography>
                        <div>
                          <Typography
                            sx={{
                              color: "rgb(50,50,50)",
                              letterSpacing: "1px",
                              fontSize: !matches ? "1.2rem" : "1.1rem",
                            }}
                          >
                            ${itemData.productId.price}
                          </Typography>
                          <Typography
                            sx={{
                              color: "rgb(50,50,50)",
                              letterSpacing: "1px",
                              fontSize: !matches ? "1.2rem" : "1.1rem",
                            }}
                          >
                            Qty: {itemData.quntity}
                          </Typography>
                        </div>
                        {index !== order.orderedItems.length - 1 && (
                          <Divider sx={{ marginTop: "1rem" }} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Divider />
                <div className={classes["controller-container"]}>
                  <div>
                    <Typography
                      sx={{
                        fontSize: "1.1rem",
                        fontWeight: "500",
                        letterSpacing: "1px",
                      }}
                    >
                      {totalQuantity[index]} Items
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgb(50,50,50)",
                        letterSpacing: "0.5px",
                        fontSize: "1.25rem",
                        fontWeight: "550",
                      }}
                    >
                      ${order.totalPrice}
                    </Typography>
                  </div>
                  <Button
                    variant="outlined"
                    className={classes["status-btn"]}
                    sx={{
                      color: "green",
                      borderColor: "green",
                      letterSpacing: "1px",
                      fontSize: "0.9rem",
                      borderRadius: "5px",
                      "&:hover": {
                        borderColor: "green",
                        backgroundColor: "green",
                        color: "white",
                      },
                    }}
                    onClick={navigateHandler.bind(null, order._id)}
                  >
                    View status
                  </Button>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default OrderHistory;
