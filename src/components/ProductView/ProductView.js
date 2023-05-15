import { useState } from "react";
import { Button, TextField, Rating, Divider, Typography } from "@mui/material";
import "../ProductView/ProductView.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectProductDetails } from "../../store/product/product.selector";
import { setAddItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

const ProductView = () => {
  const productDetails = useSelector(selectProductDetails);
  const [mainImgUrl, setmainImgUrl] = useState(productDetails.image[0]);
  const [isFormOpen, setisFormOpen] = useState(false);
  const [starRating, setStartRating] = useState(0);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const formShowHandler = () => {
    setisFormOpen(true);
  };

  const imageChangeHandler = (src) => {
    setmainImgUrl(src);
  };
  const addProductHandler = (productData) => {
    dispatch(setAddItemToCart(cartItems, productData));
  };
  return (
    <div className="container">
      <div className="UpperViewContainer">
        <div className="sideIconContainer">
          {productDetails.image.map((image) => {
            return (
              <button onClick={imageChangeHandler.bind(null, image)}>
                <img src={image} alt="" />
              </button>
            );
          })}
        </div>

        <div className="mainImageContainer">
          <img src={mainImgUrl} alt="" />
        </div>

        <div className="rightUpperViewContainer">
          <div className="priceInfoContainer">
            <Typography
              variant="h4"
              sx={{ letterSpacing: "4px", textTransform: "uppercase" }}
            >
              {productDetails.name}
            </Typography>
            <Typography variant="h6">$ {productDetails.price}</Typography>
            <Button
              sx={{
                background: "black",
                "&:hover": { background: "black" },
                borderRadius: 0,
                width: "30rem",
                height: "4rem",
              }}
              onClick={addProductHandler.bind(null, productDetails)}
              variant="contained"
            >
              Add To Cart
            </Button>
          </div>
          <Divider variant="middle" />
          <div className="itemInfoContainer">
            <Typography variant="h6" sx={{ fontSize: "1.2rem" }}>
              Description
            </Typography>
            <Typography variant="h6" sx={{ fontSize: "0.9rem" }}>
              {productDetails.description}
            </Typography>
          </div>
          <Divider variant="middle" />
        </div>
      </div>
      <hr className="devider" />
      <div className="lowerViewContainer">
        {!isFormOpen && (
          <Button
            onClick={formShowHandler}
            sx={{
              background: "black",
              fontSize: "1.2rem",
              "&:hover": { background: "black" },
              borderRadius: 0,
              width: "18rem",
              height: "4rem",
            }}
            variant="contained"
          >
            Write Review
          </Button>
        )}

        {isFormOpen && (
          <div className="reviewContainer">
            <TextField
              required
              id="standard-required"
              label="Your Name"
              placeholder="for eg. jack"
              variant="standard"
            />
            <TextField
              required
              id="standard-required"
              label="Title"
              placeholder="Title"
              variant="standard"
            />
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={6}
              placeholder="Write Here"
            />
            <Rating
              name="simple-controlled"
              value={starRating}
              sx={{ color: "black" }}
              onChange={(event) => setStartRating(event.target.value)}
            />

            <Button
              sx={{
                background: "black",
                "&:hover": { background: "black" },
                borderRadius: 0,
                width: "15rem",
                height: "3rem",
              }}
              variant="contained"
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductView;
