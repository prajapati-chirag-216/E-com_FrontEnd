import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import display_1 from "../../../assets/display_1.jpg";
import display_2 from "../../../assets/display_2.jpg";
import display_3 from "../../../assets/display_3.jpg";
import SliderImages from "./SliderImages";

const IMAGES = [
  { img: display_1, text: "the best one is here", label: "t-shirts" },
  {
    img: display_2,
    text: "still waitig... your wait is over.",
    label: "women",
  },
  { img: display_3, text: "check this out." },
];

const Display = () => {
  const [index, setIndex] = useState(0);

  const changeIndexHandler = (val) => {
    setIndex(val);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <SliderImages
        img={IMAGES[index].img}
        index={index}
        text={IMAGES[index].text}
        label={IMAGES[index].label}
      />
    </Box>
  );
};

export default Display;
