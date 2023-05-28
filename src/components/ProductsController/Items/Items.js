import React, { Suspense, useEffect, useState } from "react";
import Cards from "../../Dekstop/Cards/Cards";
import classes from "./Items.module.css";
import { fetchProduct, fetchFilteredProducts } from "../../../utils/api";
import { Await, useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectSortByHighPrice, selectSortByLowPrice, selectSortByNewDate, selectSortByOldDate, selectSortByPopularity } from "../../../store/filter/filter.selector";
import { setSortByHighPrice, setSortByLowPrice, setSortByNewDate, setSortByOldDate, setSortByPopularity } from "../../../store/filter/filter.action";

const Items = () => {


  const dispatch = useDispatch();
  const sortByHighPrice  = useSelector(selectSortByHighPrice)
  const sortByLowPrice = useSelector(selectSortByLowPrice)
  const sortByNewDate = useSelector(selectSortByNewDate)
  const sortByOldDate = useSelector(selectSortByOldDate)
  const sortByPopularity = useSelector(selectSortByPopularity)

 const [loaderData,setLoaderData] = useState(useLoaderData())


useEffect(()=>{

  if(sortByHighPrice){
    setLoaderData(loader('sortByHighPrice'))
    dispatch(setSortByHighPrice(false))
  }
  else if(sortByLowPrice){
    setLoaderData(loader('sortByLowPrice'))
    dispatch(setSortByLowPrice(false))
  }
  else if(sortByNewDate){
    setLoaderData(loader('sortByNewDate'))
    dispatch(setSortByNewDate(false))
  }
 else if(sortByOldDate){
  setLoaderData(loader('sortByOldDate'))
  dispatch(setSortByOldDate(false))
 }
 else if(sortByPopularity){
  setLoaderData(loader('sortByPopularity'))
  dispatch(setSortByPopularity(false))
 }

},[sortByHighPrice,sortByLowPrice,sortByNewDate,sortByOldDate,sortByPopularity])





  return (
    <div className={classes["container-div"]}>
      <Suspense>
        <Await resolve={loaderData}>
          {(products) => {
            return <Cards isProduct={true} location="/viewproduct" data={products} />
          }}
        </Await>
      </Suspense>
    </div>
  );
};
export async function loader(string) {

  let response;

  const url = window.location.href;
  const urlArray = url.split("/");
  const catagoryId = urlArray[urlArray.length - 1];


  try {


   if(typeof string === 'object'){
     response = await fetchProduct(catagoryId);
  }
  else{
    response = await fetchFilteredProducts(catagoryId,string);
   }
 
  } catch (err) {
    throw err;
  }
 
  return response;
}
export default Items;
