import React, { useRef, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  MenuItem,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import AddPhotoAlternate from "@mui/icons-material/AddPhotoAlternate";
import classes from "./AddProductForm.module.css";

const AddProductForm = (props) => {
  const [imageName, setImageName] = useState("");
  const matches = useMediaQuery("(max-width:700px)");
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const statusRef = useRef();
  const categoryRef = useRef();
  const imageRef = useRef();

  const changeNameHandler = (event) => {
    let name = "";
    if (event.target.files[0]) {
      name = event.target.files[0].name;
      document.getElementById("file-div").style.borderColor = "black";
    }
    setImageName(name);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    if (!imageRef.current.files[0]) {
      return (document.getElementById("file-div").style.borderColor = "red");
    }
    const productDetails = {
      name: nameRef.current.value,
      price: priceRef.current.value,
      description: descriptionRef.current.value,
      image: imageRef.current.files[0],
      status: statusRef.current.value,
      category: categoryRef.current.value,
    };
    props.onClose();
  };
  return (
    <div>
      <div>
        <Typography variant={matches ? "h5" : "h4"} fontWeight="500">
          Add Product
        </Typography>
      </div>
      <form className={classes["product-form"]} onSubmit={submitFormHandler}>
        <div>
          <TextField
            inputRef={nameRef}
            id="outlined-basic"
            label="Product Name"
            name="name"
            variant="outlined"
            fullWidth={true}
            autoComplete="off"
            required
          />
          <TextField
            inputRef={priceRef}
            type="number"
            label="product Price"
            id="outlined-start-adornment"
            name="price"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            fullWidth={true}
            style={{ height: "10px" }}
            required
          />
        </div>
        <TextField
          inputRef={descriptionRef}
          id="outlined-basic"
          label="Product Description"
          name="discription"
          variant="outlined"
          multiline
          fullWidth={true}
          autoComplete="off"
          maxRows={3}
          required
        />

        <div className={classes["file-input"]} id="file-div">
          <label htmlFor="inputTag" id="image-label">
            <AddPhotoAlternate
              style={{
                textAlign: "end",
                fill: "rgb(83, 83, 83)",
              }}
            />
            <Typography
              paddingLeft="0.5rem"
              fontSize="1rem"
              color="gray"
              style={{
                alignSelf: "center",
              }}
            >
              {imageName === "" ? "Add Image" : imageName}
            </Typography>
          </label>
          <input
            ref={imageRef}
            id="inputTag"
            name="image"
            type="file"
            accept="image/*"
            onChange={changeNameHandler}
          />
        </div>
        <div>
          <TextField
            inputRef={statusRef}
            id="outlined-select-status"
            select
            name="status"
            label="status"
            defaultValue="Active"
            fullWidth={true}
          >
            {["Active", "D-Active"].map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            inputRef={categoryRef}
            id="outlined-basic"
            label="Product Category"
            name="category"
            variant="outlined"
            fullWidth={true}
            required
          />
        </div>
        <Button
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: "black",
            padding: matches ? "0.6rem" : "0.8rem",
            borderRadius: "40px",
            fontSize: matches ? "0.8rem" : "1rem",
            "&:hover": { backgroundColor: "black" },
          }}
        >
          Create Product
        </Button>
      </form>
    </div>
  );
};

export default AddProductForm;
