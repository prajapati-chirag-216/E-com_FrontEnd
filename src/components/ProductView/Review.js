import React, { useEffect, useState, useReducer } from "react";
import { Form, useActionData, useLocation } from "react-router-dom";
import { Button, TextField, Rating, Divider, Typography } from "@mui/material";
import {
  postReview,
  fetchProductReviews,
  fetchUserProfile,
} from "../../utils/api";
import moment from "moment";
import { store } from "../../store/store";
import LoadingSpinner from "../Dekstop/UI/LoadingSpinner";
import { setIsLoading, setSnackBar } from "../../store/ui/ui.action";
import { selectIsLoading } from "../../store/ui/ui.selector";
import classes from "./Review.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  descriptionReducer,
  generalReducer,
  nameReducer,
} from "../../shared/Reducers/InputReducers";
const Review = () => {
  const [isFormOpen, setisFormOpen] = useState(false);
  const [starRating, setStartRating] = useState(0);
  const [ratingError, setRatingError] = useState(false);
  const [submitMessage, setsubmiMessage] = useState(false);
  const [reviews, setReviews] = useState([]);
  const location = useLocation();
  const path = location.pathname.split("/");
  const id = path[path.length - 1];
  const actionData = useActionData();
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  // -----------------------

  const [nameState, dispatchName] = useReducer(nameReducer, {
    value: "",
    isValid: null,
  });
  const [titleState, dispatchTitle] = useReducer(generalReducer, {
    value: "",
    isValid: null,
  });
  const [descriptionState, dispatchDescription] = useReducer(
    descriptionReducer,
    {
      value: "",
      isValid: null,
    }
  );

  const [formIsValid, setFormIsValid] = useState(false);

  const nameChangeHandler = (event) => {
    dispatchName({ type: "USER_INPUT", val: event.target.value });
  };
  const titleChangeHandler = (event) => {
    dispatchTitle({ type: "USER_INPUT", val: event.target.value });
  };
  const descriptionChangeHandler = (event) => {
    dispatchDescription({ type: "USER_INPUT", val: event.target.value });
  };
  const ratingChangeHandler = (event) => {
    setRatingError(false);
    setStartRating(+event.target.value);
  };
  const validateNameHandler = () => dispatchName({ type: "INPUT_BLUR" });
  const validateTitleHandler = () => dispatchTitle({ type: "INPUT_BLUR" });
  const validateDescriptionHAndler = () =>
    dispatchDescription({ type: "INPUT_BLUR" });
  const { isValid: nameIsValid } = nameState;
  const { isValid: titleIsValid } = titleState;
  const { isValid: descriptionIsValid } = descriptionState;

  useEffect(() => {
    const timer = setTimeout(() => {
      const formValidity =
        nameIsValid && titleIsValid && descriptionIsValid && starRating;
      setFormIsValid(formValidity);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [nameIsValid, titleIsValid, descriptionIsValid, starRating]);

  const validateFormHandler = async (event) => {
    event.preventDefault();
    if (!descriptionIsValid) {
      document.getElementById("description").focus();
    }
    if (!titleIsValid) {
      document.getElementById("title").focus();
    }
    if (!nameIsValid) {
      document.getElementById("name").focus();
    } else {
      setRatingError(true);
    }
  };

  // -----------------------
  const formShowHandler = async () => {
    try {
      const res = await fetchUserProfile();
      if (res?.userProfile) {
        setisFormOpen(true);
      } else {
        dispatch(
          setSnackBar({
            status: true,
            severity: "info",
            message: "You need to log in",
          })
        );
      }
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await fetchProductReviews(id);
      const { userProfile } = await fetchUserProfile();
      const exist = res.find((review) => review.userId === userProfile?._id);
      if (exist) setsubmiMessage(true);
      setReviews(res);
    };
    fetch()
      .then(() => {
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

  return (
    <div className={classes["lowerViewContainer"]}>
      <Typography
        variant="h5"
        sx={{
          color: "black",
          display: "flex",
          justifyContent: "center",
          letterSpacing: "2px",
          color: "rgb(56 52 52 / 68%)",
          fontSize: "1.5rem",
          borderBottom: "1px solid black",
        }}
      >
        REVIEWS
      </Typography>
      <div className={classes["reviewListContainer"]}>
        {isLoading ? (
          <LoadingSpinner />
        ) : reviews.length === 0 ? (
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
          Thanks For Your Precious Review
        </div>
      )}

      {isFormOpen && (
        <div className={classes["reviewContainer"]}>
          <Form method="post" action={`/viewproduct/${id}`}>
            <TextField
              id="name"
              name="name"
              label="Your Name"
              placeholder="for eg. jack"
              variant="standard"
              value={nameState.value}
              onChange={nameChangeHandler}
              onBlur={validateNameHandler}
              error={nameIsValid === false ? true : false}
            />
            <TextField
              id="title"
              name="title"
              label="Title"
              placeholder="Title"
              variant="standard"
              value={titleState.value}
              onChange={titleChangeHandler}
              onBlur={validateTitleHandler}
              error={titleIsValid === false ? true : false}
            />
            <TextField
              id="description"
              name="description"
              label="Description"
              multiline
              rows={6}
              placeholder="Write Here"
              value={descriptionState.value}
              onChange={descriptionChangeHandler}
              onBlur={validateDescriptionHAndler}
              error={descriptionIsValid === false ? true : false}
            />
            <Rating
              name="rating"
              value={starRating}
              precision={0.5}
              sx={{ color: "black" }}
              onChange={ratingChangeHandler}
            />
            {ratingError && (
              <Typography sx={{ color: "red", marginTop: "-1rem" }}>
                Minimum critaria not meet (Atleast half)
              </Typography>
            )}
            <Button
              sx={{
                background: "black",
                "&:hover": { background: "black" },
                borderRadius: 0,
                width: "15rem",
                height: "3rem",
                letterSpacing: "1px",
              }}
              variant="contained"
              type="submit"
              onClick={!formIsValid ? validateFormHandler : () => {}}
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
    throw err;
  }
  return response;
}

export default Review;
