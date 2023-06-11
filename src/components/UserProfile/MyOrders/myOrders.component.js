import { fetchUserOrders } from "../../../utils/api";
import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import OrderTable from "./orderTable";
import LoadingSpinner from "../../Dekstop/UI/LoadingSpinner";
// import LoadingSpinner from "../components/Dekstop/UI/LoadingSpinner";

const MyOrders = () => {
  const [userOrder, setUserOrder] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const run = async () => {
      try {
        const userOrder = await fetchUserOrders();

        setUserOrder(userOrder);
      } catch (err) {
        throw err;
      }
    };

    run();
  }, []);

  return (
    <div>
      {userOrder ? (
        <OrderTable orderData={userOrder} />
      ) : (
        <Typography
          style={{
            fontSize: "3rem",
            marginTop: "10rem",
            letterSpacing: "3px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Waiting For Your Orders 😊
        </Typography>
        // <div
        //   style={{
        //     width: "100%",
        //     textAlign: "center",
        //     marginTop: "5rem",
        //   }}
        // >
        //   <LoadingSpinner />
        // </div>
      )}
    </div>
  );
};

export default MyOrders;
