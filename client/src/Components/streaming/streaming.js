import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router";
import { movieInfo, otherMovies } from "../../actions/streamingAction";
import CircularProgress from "@material-ui/core/CircularProgress";

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
  title: {
    display: "block",
    fontSize: "14px",
    fontWeight: "400",
    textAlign: "center",
    color: "#fff",
    textShadow: "0 0 2px rgba(0,0,0,.6)"
  },
  movies: {
    maxWidth: "100%",
    marginBottom: "50px",
    transition: "transform 2s"
  },
  imdbtext: {
    padding: "2px",
    backgroundColor: "black",
    color: "#fed700",
    fontWeight: "900",
    borderRadius: "5px"
  },
  imgBox: {
    position: "relative",
    overflow: "hidden"
  },
  imdb: {
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
  },
  test: {
    color: "white"
  }
}));
function StreamTrace({ title }) {
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
        {title}
      </Typography>
    </Breadcrumbs>
  );
}

function StrVedio({ torrentInfo }) {
  console.log("torrentInfo", torrentInfo);
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
      poster="/img/movies-cover.jpeg"
      onCanPlayThrough={() => {
        // Do stuff
      }}
    >
      <source
        src={`http://localhost:5000/api/streaming/video/${torrentInfo.torrents[0].hash}`}
        type="video/mp4"
      />
      {torrentInfo.subtitle.map(subtitle => {
        return (
          console.log(subtitle),
          (
            <track
              key={subtitle.id}
              label={subtitle.lang}
              kind="subtitles"
              srcLang={subtitle.langShort}
              src={`/movies/subtitles/${torrentInfo.imdb_code}/${decodeURI(
                subtitle.fileName
              )}`}
            />
          )
        );
      })}
    </Video>
  );
}

function MovieInfo({ movieInfo }) {
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
                src={movieInfo.Poster}
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
                    style={{
                      fontFamily: "New Century Schoolbook, serif",
                      fontSize: "30px"
                    }}
                  >
                    {movieInfo.title}{" "}
                    {movieInfo.trailer && (
                      <Fab
                        variant="extended"
                        size="small"
                        style={{ background: blue[500], color: "#fff" }}
                        onClick={() => window.open(movieInfo.trailer, "_blank")}
                      >
                        <YouTubeIcon style={{ paddingRight: "5px" }} />
                        <small>Trailler</small>
                      </Fab>
                    )}
                  </Typography>
                </Grid>
                <Grid xs={12} container item>
                  <Typography
                    variant="caption"
                    style={{ fontFamily: "Helvetica Neue" }}
                  >
                    <big style={{ color: blue[500] }}>Desciption</big> :{" "}
                    {movieInfo.summary}
                  </Typography>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid sm={6} xs={12} container item>
                    <Typography variant="caption">
                      <big style={{ color: blue[500] }}>Actor:</big>{" "}
                      {movieInfo.Actors}
                    </Typography>
                  </Grid>
                  <Grid sm={6} xs={12} container item>
                    <Typography variant="caption">
                      <big style={{ color: blue[500] }}>Duration:</big>{" "}
                      {movieInfo.runtime} min
                    </Typography>
                  </Grid>
                  <Grid sm={6} xs={12} container item>
                    <Typography variant="caption">
                      <big style={{ color: blue[500] }}>Director:</big>{" "}
                      {movieInfo.Director}
                    </Typography>
                  </Grid>
                  <Grid sm={6} xs={12} container item>
                    <Typography variant="caption">
                      <big style={{ color: blue[500] }}>Quality:</big>{" "}
                      {movieInfo.torrents[0].quality}
                    </Typography>
                  </Grid>
                  <Grid sm={6} xs={12} container item>
                    <Typography variant="caption">
                      <big style={{ color: blue[500] }}>genres:</big>{" "}
                      {movieInfo.genres.map(item => {
                        return item + " ";
                      })}
                    </Typography>
                  </Grid>
                  <Grid sm={6} xs={12} container item>
                    <Typography variant="caption">
                      <big style={{ color: blue[500] }}>Production:</big>{" "}
                      {movieInfo.Production}
                    </Typography>
                  </Grid>
                  <Grid sm={6} xs={12} container item>
                    <Typography variant="caption">
                      <big style={{ color: blue[500] }}>language:</big>{" "}
                      {movieInfo.language}
                    </Typography>
                  </Grid>
                  <Grid sm={6} xs={12} container item>
                    <Typography variant="caption">
                      <big style={{ color: blue[500] }}>Release:</big>{" "}
                      {movieInfo.year}
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
  console.log(__dirname);
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

function OtherMovie({ genre }) {
  const classes = useStyles();
  const [othersMovie, setOthersMovie] = useState({
    result: [],
    loading: true
  });
  useEffect(() => {
    async function getMovies() {
      setOthersMovie({
        ...othersMovie,
        result: await otherMovies(genre[0]),
        loading: false
      });
    }
    getMovies();
  }, []);
  if (othersMovie.loading) return null;
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
      {othersMovie.result.map(movie => {
        return (
          <Box
            key={movie.imdb_code}
            maxWidth={200}
            maxHeight={280}
            style={{ margin: "2% 4%" }}
            flexGrow={1}
            className={classes.imgBox}
          >
            <img
              className={classes.movies}
              src={movie.Poster ? movie.Poster : "/img/"}
              alt="Smiley face"
              style={{ height: "280px", width: "100%" }}
            />
            <div className={classes.details}>
              <Link href={`/streaming/${movie.imdb_code}`}>
                <img
                  src="/img/btn-overlay-blue.png"
                  alt="play"
                  style={{
                    position: "relative",
                    top: "50%",
                    width: "40px",
                    transform: "translateY(-50%)"
                  }}
                />
              </Link>
            </div>
            <span className={classes.movieName}>
              <span className={classes.title}>{movie.title}</span>
              <span className={classes.title}>{`(${movie.year})`}</span>
            </span>
            <span className={classes.imdb}>
              <span className={classes.imdbtext}>
                {movie.rating.toFixed(1)}
              </span>
            </span>{" "}
          </Box>
        );
      })}
    </>
  );
}

function Streming() {
  const [movie, setMovie] = useState({
    result: {
      title: "",
      year: "",
      trailer: "",
      rating: "",
      genres: [],
      summary: "",
      language: "",
      Poster: "",
      torrents: [{}],
      Director: "",
      Actors: "",
      Production: ""
    },
    loading: true
  });
  let { imdb } = useParams();
  useEffect(() => {
    async function getResult() {
      setMovie({
        ...movie,
        result: await movieInfo(imdb),
        loading: false
      });
    }
    getResult();
  }, []);
  if (movie.loading) {
    return (
      <Card style={{ backgroundColor: "transparent" }}>
        <CardContent>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid xs={12} container item justify="center">
              <Typography variant="overline" id="range-slider" gutterBottom>
                loading...
              </Typography>
            </Grid>
            <Grid xs={12} container item justify="center">
              <CircularProgress disableShrink style={{ color: "#e74c3c" }} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
  console.log("movie result :", movie.result);
  if (movie.result === "Server error" || movie.result === "Movie not found") {
    return (
      <Card style={{ backgroundColor: "transparent" }}>
        <CardContent>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid xs={12} container item justify="center">
              <Typography variant="overline" id="range-slider" gutterBottom>
                {movie.result}
              </Typography>
            </Grid>
            <Grid xs={12} container item justify="center">
              <CircularProgress disableShrink style={{ color: "#e74c3c" }} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
  return (
    <Container maxWidth="lg">
      <StreamTrace title={movie.result.title} />
      <StrVedio torrentInfo={movie.result} />
      <MovieInfo movieInfo={movie.result} />
      <MovieContainer>
        <OtherMovie genre={movie.result.genres} />
      </MovieContainer>
    </Container>
  );
}

export default Streming;
