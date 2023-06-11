import {
  Card,
  CardActionArea,
  CardMedia,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "./aboutus.styles.scss";

const AboutUs = () => {
  const handleLinkChange = (link) => {
    window.open(link, "_blank");
  };

  return (
    <div className="abouteUsPageContainer">
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="290"
            image="yash.jpeg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Yash Soni
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
        </CardActions>
      </Card>

      <Card sx={{ maxWidth: 345 }}>
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
      </Card>
    </div>
  );
};

export default AboutUs;
