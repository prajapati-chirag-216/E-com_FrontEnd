import React, { useEffect, useState } from "react";
import { Form, useActionData, useLocation } from "react-router-dom";
import { Button, TextField, Rating, Divider, Typography } from "@mui/material";
import { postReview, fetchProductReviews } from "../../utils/api";
import moment from "moment";
import { store } from "../../store/store";
import LoadingSpinner from "../Dekstop/UI/LoadingSpinner";
import { setIsLoading } from "../../store/ui/ui.action";
import { selectIsLoading } from "../../store/ui/ui.selector";
import classes from "./Review.module.css";
import { useDispatch, useSelector } from "react-redux";

const Review = () => {
  const [isFormOpen, setisFormOpen] = useState(false);
  const [starRating, setStartRating] = useState(0);
  const [submitMessage, setsubmiMessage] = useState(false);
  const [reviews, setReviews] = useState([]);
  const location = useLocation();
  const path = location.pathname.split("/");
  const id = path[path.length - 1];
  const actionData = useActionData();
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const formShowHandler = () => {
    setisFormOpen(true);
  };
  useEffect(() => {
    let res;
    // setIsLoading(true);
    const fetch = async () => {
      res = await fetchProductReviews(id);
      setReviews(res);
    };
    fetch()
      .then((res) => {
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        throw err;
      });
  }, [submitMessage]);
  useEffect(() => {
    if (actionData && actionData.status === 200) {
      setisFormOpen(false);
      setsubmiMessage(true);
    }
  }, [actionData]);

  useEffect(() => {
    if (submitMessage) {
      setTimeout(() => {
        setsubmiMessage(false);
      }, 3000);
    }
  }, [submitMessage]);

  return (
    <div className={classes["lowerViewContainer"]}>
      <div className={classes["reviewListContainer"]}>
        <h2 className={classes["title"]}>REVIEWS</h2>
        {isLoading && <LoadingSpinner />}
        {reviews.length === 0 ? (
          <Typography
            sx={{
              color: "rgb(56 52 52 / 68%)",
              letterSpacing: "2px",
              fontSize: "25px",
              textTransform: "upperCase",
              display: "flex",
              justifyContent: "center",
              marginTop: "3rem",
            }}
          >
            Be The First To Give Review!
          </Typography>
        ) : (
          reviews.map((review, index) => (
            <div className={classes["reviewDivContainer"]} key={index}>
              <Rating
                name="rating"
                value={review.rating}
                readOnly
                precision={0.5}
                sx={{ color: "black" }}
              />
              <Typography
                sx={{
                  color: "black",
                  fontSize: "20px",
                  letterSpacing: "2px",
                }}
              >
                {review.title.toUpperCase()}
              </Typography>

              <Typography sx={{ color: "black", fontSize: "20px" }}>
                {review.description}
              </Typography>

              <Typography sx={{ fontSize: "20px" }}>
                {`${review.name} on ${moment(review.createdAt).format(
                  "MMM DD, YYYY"
                )}`}
              </Typography>
            </div>
          ))
        )}
      </div>
      <Divider variant="middle" />
      {!isFormOpen && !submitMessage && (
        <Button
          onClick={formShowHandler}
          sx={{
            background: "black",
            fontSize: "1.2rem",
            "&:hover": { background: "black" },
            borderRadius: 0,
            width: "18rem",
            height: "4rem",
          }}
          variant="contained"
        >
          Write Review
        </Button>
      )}

      {submitMessage && !isFormOpen && (
        <div className={classes["successMessageConatiner"]}>
          Your Review Submited Succsesfully!
        </div>
      )}

      {isFormOpen && (
        <div className={classes["reviewContainer"]}>
          <Form method="post" action={`/viewproduct/${id}`}>
            <TextField
              required
              id="standard-required"
              name="name"
              label="Your Name"
              placeholder="for eg. jack"
              variant="standard"
            />
            <TextField
              required
              id="standard-required"
              name="title"
              label="Title"
              placeholder="Title"
              variant="standard"
            />
            <TextField
              id="outlined-multiline-static"
              name="description"
              label="Description"
              multiline
              rows={6}
              placeholder="Write Here"
            />
            <Rating
              name="rating"
              value={starRating}
              precision={0.5}
              sx={{ color: "black" }}
              onChange={(event) => setStartRating(Number(event.target.value))}
            />

            <Button
              sx={{
                background: "black",
                "&:hover": { background: "black" },
                borderRadius: 0,
                width: "15rem",
                height: "3rem",
              }}
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export async function action({ request }) {
  let response;
  store.dispatch(setIsLoading(true));
  const url = window.location.href;
  const urlArray = url.split("/");
  const id = urlArray[urlArray.length - 1];

  const formData = await request.formData();

  const reviewObj = {
    name: formData.get("name"),
    title: formData.get("title"),
    description: formData.get("description"),
    rating: Number(formData.get("rating")),
  };
  try {
    response = await postReview(id, reviewObj);
  } catch (err) {
    if (err.response && err.response.status === 502) {
      return err;
    }
    throw err;
  }
  return response;
}

export default Review;
