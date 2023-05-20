import { Suspense, useEffect, useState } from "react";
import { Form, useActionData } from "react-router-dom";
import { Button, TextField, Rating, Divider, Typography } from "@mui/material";
import "../ProductView/ProductView.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectProductDetails } from "../../store/product/product.selector";
import { setAddItemToCart } from "../../store/cart/cart.action";
import { fetchProductDetails,postReview,fetchProductReviews } from "../../utils/api";
import { Await, useLoaderData } from "react-router-dom";
import moment from 'moment'


const ProductView = () => {
  const productDetails = useSelector(selectProductDetails);
  const [mainImgUrl, setmainImgUrl] = useState(null);
  const [isFormOpen, setisFormOpen] = useState(false);
  const [starRating, setStartRating] = useState(0);
  const [submitMessage,setsubmiMessage] =  useState(false);
  const dispatch = useDispatch();
  const actionData = useActionData();

  console.log(actionData)

  useEffect(()=>{

     if(actionData && actionData.status === 200){
       
      setisFormOpen(false)
      setsubmiMessage(true)

     }


  },[actionData])

  const formShowHandler = () => {
    setisFormOpen(true);
  };

  const imageChangeHandler = (src) => {
    setmainImgUrl(src);
  };
  const addProductHandler = (productData) => {
    dispatch(setAddItemToCart(productData));
  };
  const loaderData = useLoaderData();

  useEffect(() => {
    setmainImgUrl(loaderData.productData.image[0]);
  }, []);
  return (
    <div className="container">
      <div className="UpperViewContainer">
        <div className="sideIconContainer">
          <Suspense>
            <Await resolve={loaderData.productData}>
              {(productDetails) =>
                productDetails.image.map((image, index) => (
                  <button
                    key={index}
                    onClick={imageChangeHandler.bind(null, image)}
                  >
                    <img src={image} alt="" />
                  </button>
                ))
              }
            </Await>
          </Suspense>
        </div>

        <div className="mainImageContainer">
          <img src={mainImgUrl} alt="" />
        </div>

        <div className="rightUpperViewContainer">
          <Suspense>
            <Await resolve={loaderData.productData}>
              {(productDetails) => {
                return (
                  <div className="priceInfoContainer">
                    <Typography
                      variant="h4"
                      sx={{ letterSpacing: "4px", textTransform: "uppercase" }}
                    >
                      {productDetails.name}
                    </Typography>
                    <Typography variant="h6">
                      $ {productDetails.price}
                    </Typography>
                    <Button
                      sx={{
                        background: "black",
                        "&:hover": { background: "black" },
                        borderRadius: 0,
                        width: "30rem",
                        height: "4rem",
                        letterSpacing: "3px",
                        fontSize: "1.1rem",
                      }}
                      onClick={addProductHandler.bind(null, productDetails)}
                      variant="contained"
                    >
                      Add To Cart
                    </Button>
                  </div>
                );
              }}
            </Await>
          </Suspense>
          <Divider variant="middle" />
          <div className="itemInfoContainer">
            <Typography
              variant="h6"
              sx={{ fontSize: "1.2rem", letterSpacing: "1px" }}
            >
              Description
            </Typography>
            <Suspense>
              <Await resolve={loaderData.productData}>
                {(productDetails) => (
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "1rem",
                      letterSpacing: "1px",
                      wordSpacing: "2px",
                    }}
                  >
                    {productDetails.description}
                  </Typography>
                )}
              </Await>
            </Suspense>
          </div>
          <Divider variant="middle" />
        </div>
      </div>
      <hr className="devider" />
      <div className="lowerViewContainer">
        {!isFormOpen &&  !submitMessage && (
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

        { submitMessage && !isFormOpen && (

            <div className="successMessageConatiner">
                 Your Review Submited Succsesfully!
            </div>
        )

        }

        {isFormOpen && (
          <div className="reviewContainer">

          <Form method="post" action={`/viewproduct/${loaderData.productData._id}`}>
              {/* {console.log(action.)} */}
            <TextField
              required
              id="standard-required"
              name='name'
              label="Your Name"
              placeholder="for eg. jack"
              variant="standard"
            />
            <TextField
              required
              id="standard-required"
              name='title'
              label="Title"
              placeholder="Title"
              variant="standard"
            />
            <TextField
              id="outlined-multiline-static"
              name='description'
              label="Description"
              multiline
              rows={6}
              placeholder="Write Here"
            />
            <Rating
              name='rating'
              value={starRating}
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
              type='submit'
            >
              Submit
            </Button>
            </Form>
          </div>
        )}

    <div className="reviewListContainer"> 
     

      <h2>REVIEWS</h2>

      <Suspense>
      
       <Await resolve={loaderData.productReviews}>

          
             
          {
            
           (reviews)  => {       
            if(reviews.length === 0)
               return <Typography sx={{color:'rgb(56 52 52 / 68%)',
                                       letterSpacing:'2px',
                                       fontSize:'25px',
                                       textTransform:'upperCase',
                                       display:'flex',
                                       justifyContent:'center',
                                       marginTop:'3rem'
                                       }}>
                      Be The First To Give Review!
                      </Typography>
            else
            return(
            reviews.map((review,index) =>(

            <div className="reviewDivContainer">
            <Rating
              name='rating'
              value={review.rating}
              sx={{ color: "black" }}
            />
             <Typography
              sx={{ color: "black",fontSize:'20px' ,letterSpacing:'2px'}}
             
             >
              {review.title.toUpperCase()}
             </Typography>

            <Typography
              sx={{ color: "black",fontSize:'20px' }}
            >
              {review.description}
            </Typography>

            <Typography
            sx={{fontSize:'20px' }}
            >
              {`${review.name} on ${moment(review.createdAt).format('MMM DD, YYYY')}`}
            </Typography>
            </div>
           ))  )  }        
          }

       </Await>
      </Suspense>  
    
     </div>
      </div>
    </div>
  );
};

export async function loader() {
  let response;
  const url = window.location.href;
  const urlArray = url.split("/");
  const id = urlArray[urlArray.length - 1];
  try {
    const productData = await fetchProductDetails(id); 
    const productReviews = await fetchProductReviews(id);

    response = {
       productData,
       productReviews
    }

  } catch (err) {
    throw err;
  }
  return response;
}

export async function action({request}){

  console.log(request)

  let response;
  const url = window.location.href;
  const urlArray = url.split("/");
  const id = urlArray[urlArray.length - 1];

  const formData = await request.formData();

  const reviewObj = {

     name:formData.get('name'),
     title:formData.get('title'),
     description:formData.get('description'),
     rating:Number(formData.get('rating'))


  }
  try{  
  response = await postReview(id,reviewObj)

  }catch(err){
    if (err.response && err.response.status === 502) {
      return err;
    }
    throw err;

  }
  console.log(response)
   return response;
}


export default ProductView;
