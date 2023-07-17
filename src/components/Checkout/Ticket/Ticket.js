import React, { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import classes from "./Ticket.module.css";
import HelpIcon from "@mui/icons-material/Help";
import SimpleModal from "../../../shared/components/Modal/SimpleModal";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../../store/cart/cart.selector";
import ShippingModal from "./ShippingModal/ShippingModal";
import { width } from "@mui/system";

const Ticket = () => {
  const cartItems = useSelector(selectCartItems);
  const [showModal, setShowModal] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quntity,
      0
    );
    setSubTotal(totalPrice);
  }, []);
  const openModalHandler = () => {
    setShowModal(true);
  };
  const closeModalHandler = () => {
    setShowModal(false);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width:{xs:'58rem',md:'100%'}}}>
      <SimpleModal onOpen={showModal} onClose={closeModalHandler}>
        <ShippingModal />
      </SimpleModal>
      <Typography
        sx={{
          fontSize: "2rem",
          letterSpacing: "2px",
          textTransform: "uppercase",
          fontWeight: "bold",
          color: "rgb(130,130,130)",
        }}
      >
        Cart
      </Typography>
      <Divider />
      <div className={classes["cart-container"]}>
        {cartItems.map((item) => {
          return (
            <div key={item._id} className={classes["item-container"]}>
              <div className={classes["item_img-container"]}>
                <span className={classes["quantity-badge"]}>
                  {item.quntity}
                </span>
                <img src={item.image[0].imageLink} />
              </div>
              <div className={classes["item_details-container"]}>
                <Typography
                  sx={{
                    color: "rgb(80,80,80)",
                    fontSize: "1.3rem",
                    letterSpacing: "1px",
                  }}
                >
                  {item.name}
                </Typography>
                <Typography>{item.description.split(".")[0]}..</Typography>
                <Typography
                  variant="h6"
                  sx={{ letterSpacing: "1px", color: "rgb(80,80,80)" }}
                >
                  $ {item.price}
                </Typography>
              </div>
            </div>
          );
        })}
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
          <Typography variant="h6" sx={{ color: "rgb(80,80,80)" }}>
            $ {subTotal.toFixed(2)}
          </Typography>
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
                  color: "rgb(80,80,80)",
                },
              }}
              onClick={openModalHandler}
            />
          </Typography>
          <Typography variant="h6" sx={{ color: "rgb(80,80,80)" }}>
            $ Free
          </Typography>
        </div>
        <Divider />
        <div className={classes["price-total-container"]}>
          <Typography
            variant="h6"
            sx={{ color: "rgb(50, 50, 50)", letterSpacing: "0.5px" }}
          >
            Total
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontSize: "1.5rem", color: "rgb(80,80,80)" }}
          >
            $ {subTotal.toFixed(2)}
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default Ticket;
