import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Suspense, useState } from "react";
import Cards from "../Cards/Cards";
import { fetchCategories } from "../../../utils/api";
import { Await, useLoaderData } from "react-router-dom";
const textCss = {
  fontWeight: "bold",
  fontSize: "6rem",
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
  return (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
        marginTop: "3rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { sm: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          gap: { sm: "1rem", md: "3rem" },
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
        <Await resolve={loaderData}>
          {(categories) => <Cards  location="/product" data={categories} />}
        </Await>
      </Suspense>
    </Box>
  );
};
export async function loader() {
  let response;
  try {
    response = await fetchCategories();
  } catch (err) {
    throw err;
  }
  return response;
}
export default Categories;
