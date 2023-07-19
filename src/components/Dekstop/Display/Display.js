import React, { Fragment, useEffect, useState } from "react";
import { Box } from "@mui/system";
import SliderImages from "./SliderImages";
import { fetchDisplayImage } from "../../../utils/api";
import "./display.style.scss";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { genrateBlurImage } from "../../../utils/function";
import { red } from "@mui/material/colors";
import { selectInitialLoadin } from "../../../store/ui/ui.selector";
import { setInitialLoading } from "../../../store/ui/ui.action";
const Display = () => {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([]);
  // const isLoading = useSelector(selectIsLoading)
  const [isLoading, setIsLoading] = useState(false);
  const showIntialLoading = useSelector(selectInitialLoadin)
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await fetchDisplayImage();
          dispatch(setInitialLoading(false));
        const newData = res?.data.map((imageObj) => {
          const blurUrl = genrateBlurImage(imageObj.blurhash);

          return {
            ...imageObj,
            blurImg: blurUrl,
          };
        });
        
        // genrateBlurImage()
        setImages(newData);
        setIsLoading(false);
      } catch (err) {
        throw err;
      }
    })();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const timer = setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [index, images]);

  return (
    <Fragment>
      <Box
        className="upperPartHomePageContainer"
        sx={{
          display: "flex",
          // width: "100vw",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {isLoading && (
          <CircularProgress
            sx={{
              color: "black",
              margin: "auto",
              scale: "1.5",
            }}
          />
        )}
        {images.length !== 0 && (
          <SliderImages
            className="displayImageContainer"
            blurImg={images[index].blurImg}
            img={images[index].image}
            index={index}
            text={images[index].text}
            label={images[index].label}
            categoryname={images[index].categoryName}
          />
        )}
      </Box>
    </Fragment>
  );
};
export async function loader() {
  let res;
  try {
    res = await fetchDisplayImage();

  } catch (err) {
    throw err;
  }
  return res;
}
export default Display;
