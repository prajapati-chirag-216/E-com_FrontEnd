import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import classes from "./Filter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectSortByHighPrice, selectSortByLowPrice, selectSortByNewDate, selectSortByOldDate, selectSortByPopularity } from "../../../store/filter/filter.selector";
import { setSortByHighPrice, setSortByLowPrice, setSortByNewDate, setSortByOldDate, setSortByPopularity } from "../../../store/filter/filter.action";
const Filter = (props) => {

  const dispatch = useDispatch()
  const  SortByHighPrice  = useSelector(selectSortByHighPrice)
  const  SortByLowPrice  = useSelector(selectSortByLowPrice)
  const SortByNewDate   = useSelector(selectSortByNewDate)
  const SortByOldDate = useSelector(selectSortByOldDate)
  const SortByPopularity = useSelector(selectSortByPopularity)

  


const sortDataByHighPriceHandler = () =>{
  dispatch(setSortByHighPrice(!SortByHighPrice))
}
const sortDataByLowPriceHandler = () =>{
  dispatch(setSortByLowPrice(!SortByLowPrice))
}


const sortDataByNewDateHandler = () =>{
    dispatch(setSortByNewDate(!SortByNewDate))   
}


const sortDataByOldDateHandler = () =>{
 dispatch(setSortByOldDate(!SortByOldDate))    
}

const sortDataByPopularityHandler = (data) =>{
  dispatch(setSortByPopularity(!SortByPopularity))
}
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        position: "absolute",
        top: "3.2rem",
        right: "-4rem",
        zIndex: 5,
        transition: "height 300ms",
        height: props.status ? "22.6rem" : "0rem",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          padding: "2rem",
          display: "flex",

          transition: "all 500ms",
          transform: props.status ? "translateY(0rem)" : "translateY(-25rem)",
          flexDirection: "column",
          gap: "2rem",
          width: "max-content",
          cursor: "auto",
        }}
      >
        <span onClick = {sortDataByPopularityHandler} className={classes.filters}>popularity</span>
        <span onClick = {sortDataByOldDateHandler} className={classes.filters}>Date, new to old</span>
        <span onClick = {sortDataByNewDateHandler} className={classes.filters}>Date, old to new</span>
        <span onClick = {sortDataByHighPriceHandler} className={classes.filters}>price, hight to low</span>
        <span onClick = {sortDataByLowPriceHandler}className={classes.filters}>price, low to high</span>
      </Paper>
    </Box>
  );
};
export default Filter;
