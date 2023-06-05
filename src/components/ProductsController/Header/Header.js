import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Filter from "../Filter/Filter";
import classes from "./Header.module.css";
import { useSelector } from "react-redux";
import { selectCatagoryName } from "../../../store/catagories/catagories.selector";
import { fetchCategory } from "../../../utils/api";
import { useParams } from "react-router-dom";
import { selectProductData } from "../../../store/ui/ui.selector";
const Header = (props) => {
  const [filterModalState, setFilterModalState] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // const catagoryName = useSelector(selectCatagoryName)[props.index];
  const openFilterModalHandler = () => {
    setFilterModalState((prevState) => !prevState);
  };
  const params = useParams();
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchCategory(params.id);
        setSelectedCategory(res);
      } catch (err) {
        throw err;
      }
    })();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        padding: "1rem",
        width: "100%",
      }}
    >
      {selectedCategory && (
        <Typography
          align="center"
          sx={{
            letterSpacing: "5px",
            fontSize: "2rem",
            textTransform: "uppercase",
            fontFamily:
              "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
          }}
        >
          {selectedCategory.name}
        </Typography>
      )}
      <div className={classes["filter"]}>
        <div onClick={openFilterModalHandler}>
          <span>Sort</span>
          <KeyboardArrowDownIcon
            sx={{
              transition: "all 400ms",
              transform: filterModalState ? "rotate(-180deg)" : "",
            }}
          />
        </div>
        <Filter status={filterModalState} />
      </div>
    </Box>
  );
};
// export async function loader() {
//   let response;
//   const urlParams = new URLSearchParams(window.location.search);
//   const id = urlParams.get("id");
//   try {
//     response = await fetchCategory(id);
//   } catch (err) {
//     throw err;
//   }
//   return response;
// }

export default Header;
