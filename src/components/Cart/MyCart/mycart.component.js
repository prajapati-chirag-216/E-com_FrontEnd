import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectNewCartTotal,
} from "../../../store/cart/cart.selector";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, Divider, Typography } from "@mui/material";
import "./mycart.styles.scss";
import {
  setAddItemToCart,
  setClearItemFromCart,
  setRemoveItemFromCart,
} from "../../../store/cart/cart.action";
import { useNavigate } from "react-router-dom";
import { setSnackBar } from "../../../store/ui/ui.action";

const MyCart = () => {
  const cartItems = useSelector(selectCartItems);

  const totalPrice = useSelector(selectNewCartTotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const increaseItemhandler = (product) => {
    dispatch(setAddItemToCart(product));
  };

  const decreaseItemhandler = (product) => {
    dispatch(setRemoveItemFromCart(cartItems, product));
  };

  const removeItemhandler = (product) => {
    dispatch(setClearItemFromCart(cartItems, product));
  };

const handleCheckoutNavigation  = (link) =>{

       if(cartItems.length === 0){
          dispatch(setSnackBar({status: true,
            severity: "info",
            message: "Your cart is empty"}))
       }else{
         navigate(link)
       }
}

  return (
    <div className="myCartPageContainer">
      <div className="titleContainer">
        <Typography
          sx={{
            textTransform: "uppercase",
            flex: 5,
            letterSpacing: "2px",
            textAlign: "center",
          }}
        >
          Product
        </Typography>
        <Typography
          sx={{
            textTransform: "uppercase",
            flex: 1,
            letterSpacing: "2px",
            textAlign: "center",
          }}
        >
          Quantity
        </Typography>
        <Typography
          sx={{
            textTransform: "uppercase",
            flex: 1,
            textAlign: "center",
            letterSpacing: "2px",
          }}
        >
          Total
        </Typography>
      </div>
      <Divider sx={{ width: "80%", marginBottom: "0.5rem" }} />
      {cartItems.map((item) => {
        return (
          <div className="myCartItemContainer" key={item._id}>
            <div className="itemDetailsContainer">
              <div className="itemImgContainer">
                <img src={item.image[0]} />
              </div>
              <div className="itemTextContainer">
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    fontSize: {md:"1.3rem",xs:'0.8rem'},
                    color: "rgb(80,80,80)",
                  }}
                >
                  {item.name}
                </Typography>
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    fontSize: {md:"1rem",xs:'0.7rem'}

                  }}
                >
                  {item.description.split(".")[0]}..
                </Typography>

                <Typography
                  sx={{
                    letterSpacing: "1px",
                    fontSize: "1.2rem",
                    marginTop: "1rem",
                  }}
                >
                  $ {item.price}
                </Typography>
              </div>
            </div>

            <div className="itemQuntityContainer">
              <div className="itemQuntityController">
                <RemoveIcon
                  style={{ cursor: "pointer" }}
                  onClick={decreaseItemhandler.bind(null, item)}
                />
                <input value={item.quntity} readOnly type="number" min="0" />
                <AddIcon
                  style={{ cursor: "pointer" }}
                  onClick={increaseItemhandler.bind(null, item)}
                />
              </div>
              <div className="remove-btn">
                <span onClick={removeItemhandler.bind(null, item)}>remove</span>
                <Divider
                  sx={{
                    marginTop: "0.3rem",
                    borderColor: "rgb(67, 67, 67)",
                    transition: "all 800ms",
                  }}
                />
              </div>
            </div>
            <div className="totalPriceContainer">
              <Typography
                sx={{
                  letterSpacing: "1px",
                  fontSize: "1.2rem",
                }}
              >
                $ {item.price * item.quntity}
              </Typography>
            </div>
          </div>
        );
      })}
      <Divider sx={{ width: "80%", marginTop: "0.5rem" }} />
      <div className="cartControllerContainer">
        <div className="noteContainer">
          <Typography
            sx={{ color: "blue", letterSpacing: "2px", fontSize: "1.2rem" }}
          >
            Add Customisation/Order Note
          </Typography>
          <textarea rows={8} placeholder="How can we help you?" />
        </div>
        <div className="subTotalContainer">
          <Typography
            style={{
              color: "rgba(56, 52, 52, 0.68)",
              textTransform: "uppercase",
              letterSpacing: "3px",
              textAlign: "end",
              fontSize: "1.2rem",
            }}
          >
            SubTotal: ${totalPrice}
          </Typography>
          <Button
            sx={{
              background: "black",
              "&:hover": { backgroundColor: "black" },
              borderRadius: 0,
              width: "20rem",
              height: "4rem",
              letterSpacing: "3px",
              fontSize: "1.3rem",
              textTransform: "uppercase",
              float: "right",
            }}
            variant="contained"
            onClick={() => handleCheckoutNavigation('/checkout')}
          >
            Checkout
          </Button>
        </div>
      </div>
      <div style={{ width: "80%" }}></div>
    </div>
  );
};

export default MyCart;
