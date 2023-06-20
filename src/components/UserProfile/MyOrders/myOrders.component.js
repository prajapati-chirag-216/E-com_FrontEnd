import { fetchUserOrders } from "../../../utils/api";
import * as React from "react";
import { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import OrderTable from "./orderTable";
import LoadingSpinner from "../../Dekstop/UI/LoadingSpinner";

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
          marginTop: "3rem",
        }}
      >
        <LoadingSpinner />
      </Container>
    );
  }
  return (
    <div>
      {userOrder?.success && !isLoading ? (
        userOrder?.data?.map((order) => {
          return <OrderTable key={order._id} orderData={order || []} />;
        })
      ) : (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10rem",
          }}
        >
          {isLoading ? (
            <LoadingSpinner />
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
