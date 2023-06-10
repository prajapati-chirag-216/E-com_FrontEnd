import React from "react";
import classes from "./Footer.module.css";
import { Divider, Grid, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Footer = () => {


  const navigate = useNavigate();

  const handleLinkChangeHandler = (link) =>{

         navigate(link)

  }


  return (
    <div className={classes["footer"]}>
      <Divider variant="fullWidth" />
      <Grid container spacing={4} padding="6rem 4rem 2rem 4rem">
        <Grid item xs={2}>
          <Box sx={{ padding: "1rem" }}>
            <Typography
              sx={{
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "2rem",
              }}
            >
              Corporate
            </Typography>
            <ul>
              <li onClick={handleLinkChangeHandler.bind(null,'/aboutus')}>About us</li>
              <li>Blog</li>
              <li>Faq</li>
            </ul>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={{ padding: "1rem" }}>
            <Typography
              sx={{
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "2rem",
              }}
            >
              support
            </Typography>
            <ul>
              <li onClick={handleLinkChangeHandler.bind(null,'/contactus')}>Contact us</li>
              <li>offers</li>
            </ul>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ padding: "1rem" }}>
            <Typography
              sx={{
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "2rem",
              }}
            >
              About the shop
            </Typography>
            <p className={classes["description-p"]}>
              One Center is a renowned Indian online marketplace that offers a
              diverse range of products catering to all your shopping needs.
              From premium apparel for men and women to an extensive collection
              of electronics, home decor, accessories, and more, we have it all.
              As a trendsetter in the Indian e-commerce landscape, One Center is
              committed to providing high-quality products that meet the highest
              standards of excellence. Our platform showcases a wide variety of
              items, all meticulously curated to ensure the utmost satisfaction
              of our valued customers. With secure payment options, fast
              shipping, and exceptional customer service, One Center strives to
              create a seamless and enjoyable shopping experience for everyone.
              Explore our extensive selection and discover the convenience and
              quality that One Center brings to your fingertips.
            </p>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              padding: "1rem",
              paddingLeft: "5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
            }}
          >
            <Typography
              sx={{
                textTransform: "uppercase",
                letterSpacing: "2px",
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
                fontSize: "1rem",
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
