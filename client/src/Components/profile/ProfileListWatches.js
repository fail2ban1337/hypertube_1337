import React from "react";
import Carousel from "react-material-ui-carousel";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import Img from "react-image";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "../inc/Loading";

const useStyles = makeStyles(theme => ({
  movies: {
    maxWidth: "100%",
    marginBottom: "50px",
    transition: "transform 2s"
  },
  image: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
      overflow: "visible"
    }
  },
  imgBox: {
    position: "relative",
    overflow: "hidden"
  },
  movieTitle: {
    color: localStorage.getItem("darkMode") === "dark" ? "white" : "black",
    fontFamily: "New Century Schoolbook, serif"
  },
  recentTitle: {
    color: "#FFF",
    fontWeight: "800",
    fontSize: "25px",
    margin: "20px 0 20px 0",
    padding: "0 20px 0 20px",
    background: blue[500]
  }
}));
export const ProfileListWatches = props => {
  const { profile } = useSelector(state => state);
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid xs={12} container item justify={"center"}>
        <Typography
          variant="h5"
          className={classes.recentTitle}
          gutterBottom
          style={{ borderRadius: "40px" }}
        >
          RECENTLY WATCHED
        </Typography>
      </Grid>
      <Grid xs={6} item>
        <Carousel animation="fade">
          {profile.movies.length == 0 ? (
            <Loading text="List Of Watched Movies Empty" />
          ) : (
            profile.movies.map(item => {
              return <MyItem item={item} />;
            })
          )}
        </Carousel>
      </Grid>
    </Grid>
  );
};

function MyItem({ item }) {
  const classes = useStyles();
  const { profile } = useSelector(state => state);

  if (profile.movies.length == 0) return <Loading text="Empty" />;
  return (
    <Paper elevation={0}>
      <Grid xs={12} container item justify={"center"}>
        <h2 className={classes.movieTitle}>{item.title}</h2>
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid xs={6} item className={classes.image}>
          <Box
            key={item._id}
            maxWidth={180}
            maxHeight={240}
            style={{ margin: "2% 4%" }}
            flexGrow={1}
            className={classes.imgBox}
          >
            <Img
              className={classes.movies}
              src={[item.poster, "/img/notfound.png"]}
              alt="movie poster"
              style={{ height: "280px", width: "100%" }}
            />
          </Box>
        </Grid>
        <Grid xs={6} item>
          <Grid xs={12} container item justify={"center"}>
            <Typography
              className={classes.movieTitle}
              variant="h1"
              style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}
            >
              {item.rating}
            </Typography>
          </Grid>
          <Grid xs={12} container item justify={"center"}>
            <Img
              className={classes.movies}
              src="/img/imdb.png"
              alt="movie poster"
              style={{ width: "30%" }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12} container item justify={"center"}>
        <Button style={{ color: blue[500] }}>Watch It Now!</Button>
      </Grid>
    </Paper>
  );
}
