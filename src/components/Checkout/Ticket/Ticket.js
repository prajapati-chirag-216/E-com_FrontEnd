import React, { useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import dummyImg from "../../../assets/display_1.jpg";
import classes from "./Ticket.module.css";
import HelpIcon from "@mui/icons-material/Help";
import SimpleModal from "../../../shared/components/Modal/SimpleModal";
const Ticket = () => {
  const [showModal, setShowModal] = useState(false);
  const itemElement = (
    <div className={classes["item-container"]}>
      <div className={classes["item_img-container"]}>
        <img src={dummyImg} />
      </div>
      <div className={classes["item_details-container"]}>
        <Typography
          sx={{ color: "black", fontSize: "1.3rem", letterSpacing: "1px" }}
        >
          Shirts for man
        </Typography>
        <Typography>
          Fantasy Cream Cars Printed Super Soft Premium Cotton Half Sleeved
          Shirt
        </Typography>
        <Typography variant="h6" sx={{ letterSpacing: "1px" }}>
          $ 120
        </Typography>
      </div>
    </div>
  );
  const openModalHandler = () => {
    setShowModal(true);
  };
  const closeModalHandler = () => {
    setShowModal(false);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <SimpleModal onOpen={showModal} onClose={closeModalHandler}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            padding: "0 0.5rem",
          }}
        >
          <Typography
            variant="h4"
            sx={{ letterSpacing: "1px", color: "rgb(50, 50, 50)" }}
          >
            Shipping policy
          </Typography>
          <Divider
            sx={{
              borderColor: "rgb(200, 200, 200)",
              width: "80rem",
              transform: "translateX(-5rem)",
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
              paddingBottom: "2rem",
            }}
          >
            <Typography variant="h6" letterSpacing="1px">
              Delivery Time
            </Typography>
            <Typography variant="h6" letterSpacing="1px">
              - 3 to 5 days in Metro Cities with Airport.
            </Typography>
            <Typography variant="h6" letterSpacing="1px">
              - 5 to 7 Days In 2nd Tier Cities With Airport.
            </Typography>
            <Typography variant="h6" letterSpacing="1px">
              - 10 to 15 days In Rural Area
            </Typography>
          </Box>
        </Box>
      </SimpleModal>
      <Divider />
      <div className={classes["cart-container"]}>
        {itemElement}
        {itemElement}
        {itemElement}
        {itemElement}
        {itemElement}
      </div>
      <Divider />
      <div className={classes["price-container"]}>
        <div>
          <Typography
            variant="h6"
            sx={{ color: "gray", letterSpacing: "0.5px" }}
          >
            Subtotal
          </Typography>
          <Typography variant="h6">$ 100</Typography>
        </div>
        <div>
          <Typography
            variant="h6"
            sx={{
              color: "gray",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              letterSpacing: "0.5px",
            }}
          >
            Shipping{" "}
            <HelpIcon
              sx={{
                fontSize: "1.4rem",
                cursor: "pointer",
                color: "gray",
                "&:hover": {
                  color: "black",
                },
              }}
              onClick={openModalHandler}
            />
          </Typography>
          <Typography variant="h6">$ 10</Typography>
        </div>
        <Divider />
        <div className={classes["price-total-container"]}>
          <Typography
            variant="h6"
            sx={{ color: "rgb(50, 50, 50)", letterSpacing: "0.5px" }}
          >
            Total
          </Typography>
          <Typography variant="h4" sx={{ fontSize: "2rem" }}>
            $ 110
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default Ticket;
