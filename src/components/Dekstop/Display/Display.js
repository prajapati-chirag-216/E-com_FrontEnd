import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import SliderImages from "./SliderImages";
import { fetchDisplayImage } from "../../../utils/api";

const Display = () => {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchDisplayImage();
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
      sx={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {images.length !== 0 && (
        <SliderImages
          img={images[index].image}
          index={index}
          text={images[index].text}
          label={images[index].label}
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
