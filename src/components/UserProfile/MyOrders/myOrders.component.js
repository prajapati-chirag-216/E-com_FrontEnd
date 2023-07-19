import React from "react";
import { fetchUserOrders } from "../../../utils/api";
import { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import classes from "./myOrders.module.css";
import OrderHistory from "./OrderHistory";
import CircularProgress from "@mui/material/CircularProgress";
const MyOrders = () => {
  const [userOrder, setUserOrder] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const userOrder = await fetchUserOrders();
        setUserOrder(userOrder);
        setIsLoading(false);
      } catch (err) {
        throw err;
      }
    };
    run();
  }, []);
  if (isLoading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20%",
          marginBottom: "20%",
          position: "relative",
        }}
      >
        <CircularProgress
          sx={{
            color: "black",
            margin: "auto",
            scale: "1.2",
          }}
        />
      </Container>
    );
  }
  return (
    <div className={classes["order-container"]}>
      {userOrder?.success && !isLoading ? (
        <OrderHistory orderData={userOrder?.data || []} />
      ) : (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10rem",
          }}
        >
          {isLoading ? (
            <CircularProgress sx={{ color: "black" }} />
          ) : (
            <Typography
              style={{
                fontSize: "2rem",
                letterSpacing: "3px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Waiting for your orders..
            </Typography>
          )}
        </Container>
      )}
    </div>
  );
};

export default MyOrders;
