import { Typography, Button, Box, Divider, useMediaQuery } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import classes from "./AboutUs.module.css";
import { useState } from "react";
const AboutUs = () => {
  const matches = useMediaQuery("(max-width:800px)");
  const handleLinkChange = (link) => {
    window.open(link, "_blank");
  };
  const [isYashReadMore, setIsYashReadMore] = useState(false);
  const [isChiragReadMore, setIsChiragReadMore] = useState(false);
  const changeYashViewHandler = () =>
    setIsYashReadMore((prevState) => !prevState);
  const changeChiragViewHandler = () =>
    setIsChiragReadMore((prevState) => !prevState);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        marginTop: "2rem",
        width: !matches ? "85%" : "90%",
        padding: "2rem",
      }}
    >
      <Typography
        align="center"
        sx={{
          color: "rgb(50,50,50)",
          fontSize: "1.6rem",
          fontWeight: "550",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
        }}
      >
        About Us
      </Typography>
      <Divider sx={{ marginBottom: "1rem" }} />
      <Box sx={{ display: "flex", flexDirection: "column", gap: "5rem" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: !matches ? "row" : "column",
            justifyContent: "space-between",
            gap: "5rem",
          }}
        >
          <div className={classes["img-container"]}>
            <img src="yash.jpeg" />
          </div>
          <div className={classes["details-container"]}>
            <Typography
              sx={{
                fontSize: "1.5rem",
                letterSpacing: "2px",
                color: "black",
                fontWeight: "500",
              }}
            >
              Yash Soni
            </Typography>
            <Box
              sx={{
                height: isYashReadMore ? "fit-content" : "6rem",
                overflow: "hidden",
                transition: "all 1s",
                animation: `${isYashReadMore ? "expand" : "collapse"} 1s`,
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  letterSpacing: "1px",
                  color: "black",
                  fontWeight: "500",
                  lineHeight: "2rem",
                }}
              >
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </Box>
            <Button
              variant="contained"
              sx={{
                width: "10rem",
                letterSpacing: "2px",
                padding: "0.5rem",
                fontSize: "1.1rem",
                backgroundColor: "black",
                "&:hover": {
                  backgroundColor: "black",
                },
                "&:active": {
                  backgroundColor: "black",
                },
                textTransform: "inherit",
              }}
              onClick={changeYashViewHandler}
            >
              {isYashReadMore ? "See Less" : "Read More"}
            </Button>
            <div className={classes["social-media-btn-container"]}>
              <Button
                onClick={handleLinkChange.bind(
                  null,
                  "https://www.instagram.com/theyashsoniii/"
                )}
                size="small"
                color="primary"
              >
                <InstagramIcon style={{ color: "black" }} />
              </Button>
              <Button
                onClick={handleLinkChange.bind(
                  null,
                  "https://www.linkedin.com/in/yash-soni-7985a3267/"
                )}
                size="small"
                color="primary"
              >
                <LinkedInIcon style={{ color: "black" }} />
              </Button>
            </div>
          </div>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: !matches ? "row-reverse" : "column",
            gap: "5rem",
          }}
        >
          <div className={classes["img-container"]}>
            <img src="chirag.jpg" />
          </div>
          <div className={classes["details-container"]}>
            <Typography
              sx={{
                fontSize: "1.5rem",
                letterSpacing: "2px",
                color: "black",
                fontWeight: "500",
              }}
            >
              Chirag Prajapati
            </Typography>
            <Box
              sx={{
                height: isChiragReadMore ? "fit-content" : "6rem",
                overflow: "hidden",
                transition: "height 1s",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  letterSpacing: "1px",
                  color: "black",
                  fontWeight: "500",
                  lineHeight: "2rem",
                }}
              >
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </Box>
            <Button
              variant="contained"
              sx={{
                width: "10rem",
                letterSpacing: "2px",
                padding: "0.5rem",
                fontSize: "1.1rem",
                backgroundColor: "black",
                "&:hover": {
                  backgroundColor: "black",
                },
                "&:active": {
                  backgroundColor: "black",
                },
                textTransform: "inherit",
              }}
              onClick={changeChiragViewHandler}
            >
              {isChiragReadMore ? "See Less" : "Read More"}
            </Button>
            <div className={classes["social-media-btn-container"]}>
              <Button
                onClick={handleLinkChange.bind(
                  null,
                  "https://www.instagram.com/prajapati_chirag_216/"
                )}
                size="small"
                color="primary"
              >
                <InstagramIcon style={{ color: "black" }} />
              </Button>
              <Button
                onClick={handleLinkChange.bind(
                  null,
                  "https://www.linkedin.com/in/chirag-prajapati-a29972256/"
                )}
                size="small"
                color="primary"
              >
                <LinkedInIcon style={{ color: "black" }} />
              </Button>
            </div>
          </div>
        </Box>
        {/* <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="290"
              image="chirag.jpeg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Chirag Prajapati
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              onClick={handleLinkChange.bind(
                null,
                "https://www.instagram.com/prajapati_chirag_216/"
              )}
              size="small"
              color="primary"
            >
              <InstagramIcon style={{ color: "black" }} />
            </Button>
            <Button
              onClick={handleLinkChange.bind(
                null,
                "https://www.linkedin.com/in/chirag-prajapati-a29972256/"
              )}
              size="small"
              color="primary"
            >
              <LinkedInIcon style={{ color: "black" }} />
            </Button>
          </CardActions>
        </Card> */}
      </Box>
    </Box>
  );
};

export default AboutUs;
