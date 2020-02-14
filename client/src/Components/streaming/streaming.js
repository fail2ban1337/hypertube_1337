import React, { useEffect, useState } from "react";
import Link from "@material-ui/core/Link";
import ReactPlayer from "react-player";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import GrainIcon from "@material-ui/icons/Grain";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import HomeIcon from "@material-ui/icons/Home";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Fab from "@material-ui/core/Fab";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { useParams } from "react-router";
import Avatar from "@material-ui/core/Avatar";
import StarIcon from "@material-ui/icons/Star";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import TextField from "@material-ui/core/TextField";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { t } from '../../i18n';

import {
  movieInfo,
  otherMovies,
  watchedUpdate,
  addComment,
  getComments
} from "../../actions/streamingAction";
import CircularProgress from "@material-ui/core/CircularProgress";
import Img from "react-image";

const userLogged = [
  {
    userName: "abelomar",
    img:
      "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
  }
];
const CommentsArray = [
  {
    id: 1,
    userName: "User Name",
    likeNumber: 15,
    img:
      "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    comment:
      "Considered discovered ye sentiments projecting entreaties of melancholy is. In expression an solicitude principles in do. Hard do me sigh with west same lady. Their saved linen downs tears son add",
    time: "November 02, 2019 at 11:48 pm"
  },
  {
    id: 2,
    userName: "User Name",
    likeNumber: 2,
    img:
      "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    comment:
      "Considered discovered ye sentiments projecting entreaties of melancholy is. In expression an solicitude principles in do. Hard do me sigh with west same lady. Their saved linen downs tears son add",
    time: "November 02, 2019 at 11:48 pm"
  },
  {
    id: 3,
    userName: "User Name",
    likeNumber: 52,
    img:
      "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    comment:
      "Considered discovered ye sentiments projecting entreaties of melancholy is. In expression an solicitude principles in do. Hard do me sigh with west same lady. Their saved linen downs tears son add",
    time: "November 02, 2019 at 11:48 pm"
  },
  {
    id: 4,
    userName: "User Name",
    likeNumber: 5,
    img:
      "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    comment:
      "Considered discovered ye sentiments projecting entreaties of melancholy is. In expression an solicitude principles in do. Hard do me sigh with west same lady. Their saved linen downs tears son add",
    time: "November 02, 2019 at 11:48 pm"
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
  playerwrapper: {
    position: "relative"
  },
  reactplayer: {
    position: "absoulte",
    top: "0",
    left: "0"
  },
  cardComponent: {
    background:
      localStorage.getItem("darkMode") === "dark" ? "#171717" : "#f5f5f5"
  },
  dataAndName: {
    color: "#919191"
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "yellow !important"
  }
}));
function StreamTrace({ title }) {
  const classes = useStyles();
  return (
    <Breadcrumbs aria-label="breadcrumb" className={classes.StreamTrace}>
      <Link color="inherit" href="/" className={classes.link}>
        <HomeIcon className={classes.icon} />
        {t("streaming.home")}
      </Link>
      <Link color="inherit" href="/library" className={classes.link}>
        <WhatshotIcon className={classes.icon} />
        {t("streaming.library")}
      </Link>
      <Typography color="textPrimary" className={classes.link}>
        <GrainIcon className={classes.icon} />
        {title}
      </Typography>
    </Breadcrumbs>
  );
}

function StrVedio({ torrentInfo }) {
  const classes = useStyles();
  useEffect(() => {
    async function updateW() {
      await watchedUpdate(torrentInfo.torrents[0].hash, torrentInfo.imdb_code);
    }
    updateW();
  }, []);
  const tracks = torrentInfo.subtitle.map(subtitle => ({
    kind: "subtitles",
    src: `/movies/subtitles/${torrentInfo.imdb_code}/${decodeURI(
      subtitle.fileName
    )}`,
    srcLang: subtitle.lang
  }));
  return (
    <div className={classes.playerwrapper}>
      <ReactPlayer
        className={classes.reactplayer}
        url={`http://localhost:5000/api/streaming/video/${torrentInfo.torrents[0].hash}`}
        controls={true}
        width="100%"
        height="100%"
        config={{
          file: {
            tracks,
            attributes: {
              controlsList: "nodownload"
            }
          }
        }}
      />
    </div>
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
              <Img
                src={[movieInfo.poster, "/img/notfound.png"]}
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
                        <small>{t("streaming.trailler")}</small>
                      </Fab>
                    )}
                  </Typography>
                </Grid>
                <Grid xs={12} container item>
                  <Typography
                    variant="caption"
                    style={{ fontFamily: "Helvetica Neue" }}
                  >
                    <big style={{ color: blue[500] }}>{t("streaming.description")}</big> :{" "}
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
                      <big style={{ color: blue[500] }}>{t("streaming.actor")}</big> :{" "}
                      {movieInfo.Actors}
                    </Typography>
                  </Grid>
                  <Grid sm={6} xs={12} container item>
                    <Typography variant="caption">
                      <big style={{ color: blue[500] }}>{t("streaming.duration")}</big> :{" "}
                      {movieInfo.runtime} min
                    </Typography>
                  </Grid>
                  <Grid sm={6} xs={12} container item>
                    <Typography variant="caption">
                      <big style={{ color: blue[500] }}>{t("streaming.director")}</big> :{" "}
                      {movieInfo.Director}
                    </Typography>
                  </Grid>
                  <Grid sm={6} xs={12} container item>
                    <Typography variant="caption">
                      <big style={{ color: blue[500] }}>{t("streaming.quality")}</big> :{" "}
                      {movieInfo.torrents[0].quality}
                    </Typography>
                  </Grid>
                  <Grid sm={6} xs={12} container item>
                    <Typography variant="caption">
                      <big style={{ color: blue[500] }}>{t("streaming.genres")}</big> :{" "}
                      {movieInfo.genres.map(item => {
                        return item + " ";
                      })}
                    </Typography>
                  </Grid>
                  <Grid sm={6} xs={12} container item>
                    <Typography variant="caption">
                      <big style={{ color: blue[500] }}>{t("streaming.production")}</big> :{" "}
                      {movieInfo.Production}
                    </Typography>
                  </Grid>
                  <Grid sm={6} xs={12} container item>
                    <Typography variant="caption">
                      <big style={{ color: blue[500] }}>{t("streaming.language")}</big> :{" "}
                      {movieInfo.language}
                    </Typography>
                  </Grid>
                  <Grid sm={6} xs={12} container item>
                    <Typography variant="caption">
                      <big style={{ color: blue[500] }}>{t("streaming.release")}</big> :{" "}
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
  if (
    othersMovie.result === "Server error" ||
    othersMovie.result === "Not valid genre"
  ) {
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
                {othersMovie.result}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
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
            <Img
              className={classes.movies}
              src={[movie.poster, "/img/notfound.png"]}
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

function Comments({ movieInfo }) {
  const classes = useStyles();
  const [displayState, setDisplayState] = useState("none");
  const [Comment_text, setCommentText] = useState("");
  const dispatch = useDispatch();
  const { comments } = useSelector(state => state);

  console.log(comments);
  const handleSubmit = form => {
    form.preventDefault();
    async function setComment() {
      await dispatch(addComment(movieInfo.imdb_code, Comment_text));
      setCommentText("");
    }
    setComment();
  };
  const handleInputChange = event => {
    event.persist();
    setCommentText(event.target.value);
  };
  const threeDots = () => {
    if (displayState === "none") setDisplayState("block");
    else setDisplayState("none");
  };
  useEffect(() => {
    async function getAllComments() {
      await getComments(movieInfo.imdb_code);
    }
    getAllComments();
  }, []);
  const Comments = CommentsArray.length;
  return (
    <Grid item xs={12} style={{ paddingTop: "20px" }}>
      <Card>
        <CardContent>
          <Grid
            container
            item
            xs={12}
            justify={"center"}
            style={{ paddingBottom: "10px" }}
          >
            <ChatBubbleIcon style={{ color: blue[500] }} />
            <Typography style={{ marginLeft: "10px" }}>
              {Comments} Comments
            </Typography>
          </Grid>
          <div style={{ display: displayState }}>
            {CommentsArray.map(value => {
              return (
                <Card
                  key={value.id}
                  className={classes.cardComponent}
                  style={{ marginBottom: "10px" }}
                >
                  <CardContent>
                    <Grid
                      container
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-start"
                    >
                      <Grid item xs={1} className={classes.image}>
                        <Avatar
                          src={value.img}
                          alt="left"
                          style={{ width: "60px", height: "60px" }}
                        />
                      </Grid>
                      <Grid item xs={11}>
                        <Grid
                          container
                          direction="row"
                          justify="flex-start"
                          alignItems="flex-start"
                        >
                          <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-start"
                          >
                            <Grid item xs={5}>
                              <Typography className={classes.dataAndName}>
                                {value.userName}
                              </Typography>
                            </Grid>
                            <Grid item xs={5} className={classes.dataAndName}>
                              <Typography>{value.time}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <div style={{ float: "right" }}>
                                {value.likeNumber}
                                <FavoriteIcon />
                              </div>
                            </Grid>
                          </Grid>
                          <Grid xs={12} container item>
                            <Typography
                              variant="caption"
                              style={{ fontFamily: "Helvetica Neue" }}
                            >
                              {movieInfo.summary}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              );
            })}
            <form onSubmit={form => handleSubmit(form)}>
              <Grid
                xs={12}
                container
                item
                justify={"center"}
                alignItems="center"
              >
                <Grid item>
                  <Avatar src={userLogged[0].img} />
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    id="outlined-full-width"
                    style={{ margin: 8 }}
                    placeholder="New Comment"
                    value={Comment_text}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      classes: { notchedOutline: classes.notchedOutline },
                      shrink: true
                    }}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Grid xs={12} container item justify="center">
                <Button
                  variant="outlined"
                  type="submit"
                  style={{ color: blue[500] }}
                >
                  submit
                </Button>
              </Grid>
            </form>
          </div>

          <Grid xs={12} container item justify="center">
            <MoreHorizIcon onClick={() => threeDots()} />
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

function Streming({t}) {
  const [movie, setMovie] = useState({
    result: {
      title: "",
      year: "",
      trailer: "",
      rating: "",
      genres: [],
      summary: "",
      language: "",
      poster: "",
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
      <Comments movieInfo={movie.result} />
      <MovieContainer>
        <OtherMovie genre={movie.result.genres} />
      </MovieContainer>
    </Container>
  );
}

export default Streming;
