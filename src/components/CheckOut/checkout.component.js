import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectNewCartTotal,
} from "../../store/cart/cart.selector";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import "../CheckOut/checkout.styles.scss";
import {
  setAddItemToCart,
  setClearItemFromCart,
  setRemoveItemFromCart,
} from "../../store/cart/cart.action";

const CheckOut = () => {
  const cartItems = useSelector(selectCartItems);

  const totalPrice = useSelector(selectNewCartTotal);
  const dispatch = useDispatch();

  const increaseItemhandler = (product) => {
    dispatch(setAddItemToCart(product));
  };

  const decreaseItemhandler = (product) => {
    dispatch(setRemoveItemFromCart(cartItems, product));
  };

  const removeItemhandler = (product) => {
    dispatch(setClearItemFromCart(cartItems, product));
  };

  return (
    <div className="checkOutPageContainer">
      {cartItems.map((item, index) => {
        return (
          <div className="checkOutItemContainer">
            <img src={item.image[0]} />

            <h6 style={{ textTransform: "uppercase", letterSpacing: "1px" }}>
              {item.name}
            </h6>

            <h4>{`${item.price}$`}</h4>

            <div className="itemQuntityContainer">
              <AddIcon
                style={{ cursor: "pointer" }}
                onClick={increaseItemhandler.bind(null, item)}
              />

              <h4>{item.quntity}</h4>

              <RemoveIcon
                style={{ cursor: "pointer" }}
                onClick={decreaseItemhandler.bind(null, item)}
              />
            </div>

            <CloseIcon
              style={{ cursor: "pointer" }}
              onClick={removeItemhandler.bind(null, item)}
            />
          </div>
        );
      })}

      <div className="subTotalContainer">
        <h5
          style={{
            color: "rgba(56, 52, 52, 0.68)",
            textTransform: "uppercase",
            letterSpacing: "3px",
          }}
        >
          SubTotal -
        </h5>

        <h4>{`${totalPrice}$`}</h4>
      </div>

      <Button
        sx={{
          background: "black",
          "&:hover": { background: "black" },
          borderRadius: 0,
          width: "30rem",
          height: "4rem",
          letterSpacing: "3px",
          fontSize: "1.1rem",
          "&:active": { transform: "scale(0.9)" },
        }}
        variant="contained"
      >
        Continue To Shipping
      </Button>
    </div>
  );
};

export default CheckOut;
