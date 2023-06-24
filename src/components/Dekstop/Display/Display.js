import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import SliderImages from "./SliderImages";
import { fetchDisplayImage } from "../../../utils/api";
import { Divider } from "@mui/material";
import './display.style.scss'
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading } from "../../../store/ui/ui.selector";
import { setIsLoading } from "../../../store/ui/ui.action";
import LoadingSpinner from "../UI/LoadingSpinner";

const Display = () => {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([]);
  const isLoading = useSelector(selectIsLoading)
  const dispatch  = useDispatch();

  useEffect(() => {
    (async () => {
      try {
           
        dispatch(setIsLoading(true))
        const res = await fetchDisplayImage();
         dispatch(setIsLoading(false));
        setImages(res.data);
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
    <Box
    className='upperPartHomePageContainer'
      sx={{
        display:'flex',
        // width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {isLoading && <LoadingSpinner/>}
      {images.length !== 0 && (
        <SliderImages
          className='displayImageContainer'
          img={images[index].image}
          index={index}
          text={images[index].text}
          label={images[index].label}
          categoryname={images[index].categoryName}
        />
      )}
    </Box>
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
