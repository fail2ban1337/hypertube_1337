import React from "react";
import Link from "@material-ui/core/Link";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import GrainIcon from "@material-ui/icons/Grain";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import FaceIcon from "@material-ui/icons/Face";
import HomeIcon from "@material-ui/icons/Home";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Fab from "@material-ui/core/Fab";
import YouTubeIcon from "@material-ui/icons/YouTube";

const movies = [
  {
    id: "1",
    imdb_code: "tt0020985",
    title_english: "Holiday",
    medium_cover_image:
      "https://yts.lt/assets/images/movies/holiday_1930/medium-cover.jpg"
  },
  {
    id: "2",
    imdb_code: "tt0337741",
    title_english: "Something's Gotta Give",
    medium_cover_image:
      "https://yts.lt/assets/images/movies/somethings_gotta_give_2003/medium-cover.jpg"
  },
  {
    id: "3",
    imdb_code: "tt0107131",
    title_english: "Homeward Bound: The Incredible Journey",
    medium_cover_image:
      "https://yts.lt/assets/images/movies/homeward_bound_the_incredible_journey_1993/medium-cover.jpg"
  },
  {
    id: "4",
    imdb_code: "tt10208198",
    title_english: "The Gangster, the Cop, the Devil",
    medium_cover_image:
      "https://yts.lt/assets/images/movies/the_gangster_the_cop_the_devil_2019/medium-cover.jpg"
  },
  {
    id: "5",
    imdb_code: "tt3153582",
    title_english: "Listening",
    medium_cover_image:
      "https://yts.lt/assets/images/movies/listening_2014/medium-cover.jpg"
  },
  {
    id: "6",
    imdb_code: "tt0116905",
    title_english: "Lone Star",
    medium_cover_image:
      "https://yts.lt/assets/images/movies/lone_star_1996/medium-cover.jpg"
  },
  {
    id: "7",
    imdb_code: "tt8353466",
    title_english: "Holiday",
    medium_cover_image:
      "https://yts.lt/assets/images/movies/speed_of_life_2019/medium-cover.jpg"
  },
  {
    id: "8",
    imdb_code: "tt7349896",
    title_english: "Inherit the Viper",
    medium_cover_image:
      "https://yts.lt/assets/images/movies/inherit_the_viper_2019/medium-cover.jpg"
  }
];

const useStyles = makeStyles(theme => ({
  StreamTrace: {
    paddingBottom: "20px",
    paddingTop: "10px"
    // border: `1px solid ${theme.palette.divider}`,
  },
  image: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
      overflow: "visible"
    }
  },
  movies: {
    maxWidth: "100%",
    marginBottom: "50px",
    transition: "transform 2s"
  },
  imgBox: {
    position: "relative",
    overflow: "hidden"
  },
  quality: {
    position: "absolute",
    top: "8px",
    right: "8px",
    background: "#fed700",
    borderRadius: "3px",
    color: "#222",
    fontSize: "11px",
    fontWeight: "500",
    height: "auto",
    padding: "4px 6px"
  },
  movieName: {
    position: "absolute",
    bottom: "0",
    left: "0",
    textAlign: "center",
    width: "100%",
    color: "white",
    background: "url(../img/mask-title.png) top repeat-x"
  },
  details: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "0",
    left: "0",
    background: "rgba(59,71,99,.9)",
    textAlign: "center",
    transition: "0.5s",
    cursor: "pointer",
    opacity: "0",
    "&:hover": {
      opacity: "1",
      transform: "scale(1.6)"
    }
  }
}));
function StreamTrace() {
  const classes = useStyles();
  return (
    <Breadcrumbs aria-label="breadcrumb" className={classes.StreamTrace}>
      <Link color="inherit" href="/" className={classes.link}>
        <HomeIcon className={classes.icon} />
        Home
      </Link>
      <Link color="inherit" href="/library" className={classes.link}>
        <WhatshotIcon className={classes.icon} />
        Library
      </Link>
      <Typography color="textPrimary" className={classes.link}>
        <GrainIcon className={classes.icon} />
        Movie Name
      </Typography>
    </Breadcrumbs>
  );
}

function StrVedio() {
  // console.log("This file is " + __filename);
  // console.log("It's located in " + __dirname);
  return (
    <Video
      loop
      controls={[
        "PlayPause",
        "Seek",
        "Time",
        "Volume",
        "Fullscreen",
        "Captions"
      ]}
      onPlay={() => console.log("test")}
      poster="https://i.ytimg.com/vi/n5bmAwbk9TI/maxresdefault.jpg"
      onCanPlayThrough={() => {
        // Do stuff
      }}
    >
      <source
        src="http://localhost:5000/api/streaming/video/884B54B9241764354B9DC3FCB114D9B55BD95544"
        type="video/mp4"
      />
      <track label="English" kind="subtitles" srcLang="en" src="" default />
    </Video>
  );
}

function MovieInfo() {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Card className={classes.card}>
        <CardContent>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={2} className={classes.image}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Movie_poster_for_%22Scary_Movie%22.jpg/220px-Movie_poster_for_%22Scary_Movie%22.jpg"
                alt="left"
                style={{ width: "140px", height: "210px" }}
              />
            </Grid>
            <Grid item xs={10}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid xs={12} container item justify={"center"}>
                  <Typography
                    variant="h5"
                    component="h2"
                    style={{ fontFamily: "New Century Schoolbook, serif" }}
                  >
                    Movie Name{" "}
                    <Fab
                      variant="extended"
                      size="small"
                      style={{ background: blue[500], color: "#fff" }}
                    >
                      <YouTubeIcon style={{ paddingRight: "5px" }} />
                      <small>Trailler</small>
                    </Fab>
                  </Typography>
                </Grid>
                <Grid xs={12} container item>
                  <Typography
                    variant="caption"
                    style={{ fontFamily: "Helvetica Neue" }}
                  >
                    <big style={{ color: blue[500] }}>Desciption</big> : Lorem
                    Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy
                    text ever since the 1500s, when an unknown printer took a
                    galley of type and scrambled it to make a type specimen
                    book.
                  </Typography>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid sm={6} xs={12} container item>
                    <Typography variant="caption" component="h2">
                      <big style={{ color: blue[500] }}>Actor</big>:
                    </Typography>
                  </Grid>
                  <Grid sm={6} xs={12} container item>
                    <Typography variant="caption" component="h2">
                      <big style={{ color: blue[500] }}>Duration:</big>
                    </Typography>
                  </Grid>
                  <Grid sm={6} xs={12} container item>
                    <Typography variant="caption" component="h2">
                      <big style={{ color: blue[500] }}>Duration:</big>
                    </Typography>
                  </Grid>
                  <Grid sm={6} xs={12} container item>
                    <Typography variant="caption" component="h2">
                      <big style={{ color: blue[500] }}>Quality:</big>
                    </Typography>
                  </Grid>
                  <Grid sm={6} xs={12} container item>
                    <Typography variant="caption" component="h2">
                      <big style={{ color: blue[500] }}>Country:</big>
                    </Typography>
                  </Grid>
                  <Grid sm={6} xs={12} container item>
                    <Typography variant="caption" component="h2">
                      <big style={{ color: blue[500] }}>Release:</big>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

const MovieContainer = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent={"center"}
        className={classes.imgBox}
      >
        {children}
      </Box>
    </>
  );
};

function OtherMovie() {
  const classes = useStyles();
  return (
    <>
      <Grid container style={{ paddingTop: "50px", paddingBottom: "20px" }}>
        <Box
          p={1}
          bgcolor="primary.main"
          style={{ background: blue[500], color: "#fff" }}
        >
          YOU MAY ALSO LIKE
        </Box>
      </Grid>
      {movies.map(movie => {
        return (
          <Box
            key={movie.id}
            maxWidth={200}
            maxHeight={280}
            style={{ margin: "2% 4%" }}
            flexGrow={1}
            className={classes.imgBox}
          >
            <img
              className={classes.movies}
              src={movie.medium_cover_image}
              alt="Smiley face"
              style={{ height: "280px", width: "100%" }}
            />

            <div className={classes.details}>
              <img
                src="./img/btn-overlay-blue.png"
                style={{
                  position: "relative",
                  top: "50%",
                  width: "40px",
                  transform: "translateY(-50%)"
                }}
              />
            </div>
            <span className={classes.movieName}>
              <h6>Movie</h6>
            </span>
            <span className={classes.quality}>HD</span>
          </Box>
        );
      })}
    </>
  );
}

function Streming() {
  return (
    <Container maxWidth="lg">
      <StreamTrace />
      <StrVedio />
      <MovieInfo />
      <MovieContainer>
        <OtherMovie />
      </MovieContainer>
    </Container>
  );
}

export default Streming;
