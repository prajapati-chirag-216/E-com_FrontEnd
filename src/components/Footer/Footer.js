import React from "react";
import classes from "./Footer.module.css";
import { Divider, Grid, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleLinkChangeHandler = (link) => {
    navigate(link);
  };

  return (
    <div className={classes["footer"]}>
      <Divider variant="fullWidth" />
      <Grid container spacing={4} sx={{padding:{xs:'3rem 1rem 1rem 3rem',md:'6rem 4rem 2rem 4rem'},flexDirection:{xs:'column',md:'row'}}} >
        <Grid item xs={2}>
          <Box sx={{ padding:{md:"1rem"},width:{xs:'10rem'} }}>
            <Typography
              sx={{
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "2rem",
                  fontSize:{xs:'25px'}
              }}
            >
              Corporate
            </Typography>
            <ul className="corporateLinks">
              <li onClick={handleLinkChangeHandler.bind(null, "/aboutus")}>
                About us
              </li>
              <li>Blog</li>
              <li>Faq</li>
            </ul>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={{padding:{md:"1rem" },width:{xs:'10rem'}}}>
            <Typography
              sx={{
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "2rem",
                fontSize:{xs:'25px'}
              }}
            >
              support
            </Typography>
            <ul className="supportLinks"> 
              <li onClick={handleLinkChangeHandler.bind(null, "/contactus")}>
                Contact us
              </li>
              <li>offers</li>
            </ul>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ padding: {md:"1rem" }}}>
            <Typography
              sx={{
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "2rem",
                fontSize:{xs:'25px'}
              }}
            >
              About the shop
            </Typography>
            <p className={classes["description-p"]}>
              Shopzee is a renowned Indian online marketplace that offers a
              diverse range of products catering to all your shopping needs.
              From premium apparel for men and women to an extensive collection
              of electronics, home decor, accessories, and more, we have it all.
              As a trendsetter in the Indian e-commerce landscape, Shopzee is
              committed to providing high-quality products that meet the highest
              standards of excellence. Our platform showcases a wide variety of
              items, all meticulously curated to ensure the utmost satisfaction
              of our valued customers. With secure payment options, fast
              shipping, and exceptional customer service, Shopzee strives to
              create a seamless and enjoyable shopping experience for everyone.
              Explore our extensive selection and discover the convenience and
              quality that Shopzee brings to your fingertips.
            </p>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              padding: {md:"1rem" },
              paddingLeft: {md:"5rem" },
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
              width:{xs:'25rem'}
            }}
          >
            <Typography
              sx={{
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontSize:{xs:'1.3rem'}
              }}
            >
              NEWSLETTER
            </Typography>
            <p>keep in touch</p>
            <span>We don't spam. We are nice people.</span>
            <input
              className={classes["subscriber-inp"]}
              placeholder="Enter your email address"
            />
            <Button
              sx={{
                fontSize: {md:"1rem",xs:'1.3rem'},
                padding: "1rem",
                letterSpacing: "3px",
                fontWeight: "bold",
                color: "white",
                backgroundColor: "black",
                "&:hover": {
                  backgroundColor: "red",
                },
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
