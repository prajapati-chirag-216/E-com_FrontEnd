import { Suspense, useEffect, useState } from "react";
import { Button, Divider, Typography, Rating } from "@mui/material";
import "../ProductView/ProductView.style.scss";
import { useDispatch, useSelector } from "react-redux";
import { setAddItemToCart } from "../../store/cart/cart.action";
import { useMediaQuery } from "@material-ui/core";
import { fetchProductDetails } from "../../utils/api";
import { Await, useLoaderData } from "react-router-dom";
import Review from "./Review";
import { selectIsLoading } from "../../store/ui/ui.selector";
import LoadingSpinner from "../Dekstop/UI/LoadingSpinner";
import { store } from "../../store/store";
import { genrateBlurImage } from "../../utils/function";

const ProductView = () => {
  const [mainImgUrl, setmainImgUrl] = useState(null);
  const [mainBlurUrl, setMainBlurUrl] = useState(null);
  const isSmallScreen = useMediaQuery("(max-width: 500px)");
  const [isLoaded, setIsLoaded] = useState(false);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const imageChangeHandler = (src, blurUrl) => {
    setmainImgUrl(src);
    setMainBlurUrl(blurUrl);
  };
  const addProductHandler = (productData) => {
    const sound = new Audio("/click_sound.mp3");
    sound.play();

    dispatch(setAddItemToCart(productData));
  };
  const loaderData = useLoaderData();

  useEffect(() => {
    setmainImgUrl(loaderData.productData.image[0].imageLink);
    setMainBlurUrl(loaderData.productData.image[0].blurImg);
  }, []);
  return (
    <div className="container">
      <div className="UpperViewContainer">
        <div className="sideIconContainer">
          <Suspense>
            <Await resolve={loaderData.productData}>
              {(productDetails) =>
                productDetails.image.map((image, index) => {
                  console.log(image, "io");
                  return (
                    <button
                      style={{
                        boxShadow:
                          "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
                      }}
                      key={index}
                      onClick={imageChangeHandler.bind(
                        null,
                        image.imageLink,
                        image.blurImg
                      )}
                    >
                      <img
                        onLoad={() => setIsLoaded(true)}
                        src={isLoaded ? image.imageLink : image.blurImg}
                        alt=""
                      />
                    </button>
                  );
                })
              }
            </Await>
          </Suspense>
        </div>

        <div className="mainImageContainer">
          <img
            onLoad={() => setIsLoaded(true)}
            src={isLoaded ? mainImgUrl : mainBlurUrl}
            alt=""
          />
        </div>
        {isSmallScreen && (
          <Divider
            sx={{ width: { xs: "100%", md: "0" }, order: { xs: "3" } }}
            variant="fullWidth"
          />
        )}
        <div className="rightUpperViewContainer">
          <Suspense>
            <Await resolve={loaderData.productData}>
              {(productDetails) => {
                return (
                  <div className="priceInfoContainer">
                    <Typography
                      variant="h4"
                      sx={{ letterSpacing: "4px", textTransform: "uppercase" }}
                    >
                      {productDetails.name}
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                      }}
                    >
                      <Rating
                        name="rating"
                        value={productDetails.avgRatings}
                        readOnly
                        precision={0.5}
                        sx={{
                          color: "black",
                          transform: { xs: "scale(1.3)", md: "scale(1)" },
                          marginRight: { xs: "1rem", md: "0rem" },
                        }}
                      />
                      <Typography
                        sx={{ fontSize: { xs: "1.4rem", md: "1.25rem" } }}
                        variant="h6"
                        color="gray"
                        letterSpacing="1px"
                      >
                        {productDetails.reviewedBy} reviews
                      </Typography>
                    </div>
                    <Typography
                      sx={{ fontSize: { xs: "1.6rem", md: "1.25rem" } }}
                      variant="h6"
                    >
                      $ {productDetails.price}
                    </Typography>
                    <Button
                      sx={{
                        background: "black",
                        "&:hover": { background: "black" },
                        borderRadius: 0,
                        width: "30rem",
                        height: "4rem",
                        letterSpacing: "3px",
                        fontSize: { md: "1.1rem", xs: "1.4rem" },
                        "&:active": { transform: "scale(0.9)" },
                      }}
                      onClick={addProductHandler.bind(null, productDetails)}
                      variant="contained"
                    >
                      Add To Cart
                    </Button>
                  </div>
                );
              }}
            </Await>
          </Suspense>
          <Divider variant="middle" />
          <div className="itemInfoContainer">
            <Typography
              variant="h6"
              sx={{
                fontSize: { md: "1.2rem", xs: "1.4rem" },
                letterSpacing: "1px",
              }}
            >
              Description
            </Typography>
            <Suspense>
              <Await resolve={loaderData.productData}>
                {(productDetails) => (
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { md: "1rem", xs: "1.2rem" },
                      letterSpacing: "1px",
                      wordSpacing: "2px",
                    }}
                  >
                    {productDetails.description}
                  </Typography>
                )}
              </Await>
            </Suspense>
          </div>
          <Divider variant="middle" />
        </div>
      </div>
      <hr className="devider" />

      <Review />
    </div>
  );
};

export async function loader() {
  let response;

  const url = window.location.href;
  const urlArray = url.split("/");
  const id = urlArray[urlArray.length - 1];

  try {
    let productData = await fetchProductDetails(id);

    const newImgData = productData.image.map((imgObj) => {
      const blurUrl = genrateBlurImage(imgObj.blurhash);

      return {
        ...imgObj,
        blurImg: blurUrl,
      };
    });

    productData = {
      ...productData,
      image: newImgData,
    };

    response = {
      productData,
    };
  } catch (err) {
    throw err;
  }
  return response;
}

export default ProductView;
