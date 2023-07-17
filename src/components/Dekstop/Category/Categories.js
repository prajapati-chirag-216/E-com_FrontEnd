import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Suspense, useState } from "react";
import Cards from "../Cards/Cards";
import { fetchCategories } from "../../../utils/api";
import { Await, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../../store/ui/ui.selector";
import CircularProgress from "@mui/material/CircularProgress";
const textCss = {
  fontWeight: "bold",
  fontSize: { md: "6rem", xs: "3rem" },
  color: "black",
  WebkitTextStroke: "2px black",
  WebkitTextFillColor: "white",
  textTransform: "uppercase",
  letterSpacing: "2px",
  wordSpacing: "5px",
  fontFamily:
    " 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
};
const Categories = () => {
  const loaderData = useLoaderData();
  const isLoading = useSelector(selectIsLoading);

  return (
    <Box
      sx={{
        width: { xs: "60rem", md: "100vw" },
        display: "flex",
        flexDirection: "column",
        gap: "4rem",
        marginTop: "4rem",
      }}
    >
      <Box
        sx={{
          width: { xs: "60rem", md: "100vw" },
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: "2rem", md: "3rem" },
        }}
      >
        <Typography variant="h1" sx={textCss}>
          Your
        </Typography>
        <Typography
          variant="h1"
          sx={{
            ...textCss,
            WebkitTextFillColor: "black",
            WebkitTextStroke: "1px black",
          }}
        >
          First
        </Typography>
        <Typography variant="h1" sx={textCss}>
          Choice
        </Typography>
      </Box>
      <Suspense>
        {/* {isLoading && <CircularProgress sx={{color:"black"}}/>} */}
        <Await resolve={loaderData}>
          {(categories) => <Cards location="/product" data={categories} />}
        </Await>
      </Suspense>
    </Box>
  );
};
export async function loader() {
  let response;
  try {
    // store.dispatch(setIsLoading(true));
    response = await fetchCategories();
    // store.dispatch(setIsLoading(false))
  } catch (err) {
    throw err;
  }
  return response;
}
export default Categories;
