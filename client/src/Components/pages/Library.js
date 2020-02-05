import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles, Box } from "@material-ui/core";
import Img from "react-image";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import Controllers from "../inc/Controllers";
import AlertComponents from "../inc/AlertComponents";
import { Loading } from "../inc/Loading";
import { getMovies } from "../../actions/libraryAction";
import { REMOVE_ALERT } from "../../actions/actionTypes";


const useStyles = makeStyles({
  imgBox: {
    position: "relative",
    overflow: "hidden",
    margin: "2% 4%",
    display: "inline-block"
  },
  movies: {
    width: "100%",
    height: "280px",
    marginBottom: "50px",
    transition: "transform 2s",
    "&:hover": {
      transform: "scale(1.1)"
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
  imdbtext: {
    padding: "2px",
    backgroundColor: "black",
    color: "#fed700",
    fontWeight: "900",
    borderRadius: "5px"
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
    height: "280px",
    top: "0",
    left: "0",
    background: "rgba(59,71,99,.9)",
    textAlign: "center",
    transition: "0.5s",
    cursor: "pointer",
    opacity: "0",
    "&:hover": {
      opacity: "1"
    }
  }
});

export const Thumb = ({ movies }) => {
  const classes = useStyles();

  return (
    <div>
      {movies.map(movie => (
        <Box
          key={movie.imdb_code}
          maxWidth={200}
          maxHeight={280}
          flexGrow={1}
          className={classes.imgBox}
        >
          <Img
            className={classes.movies}
            src={[movie.Poster, "/img/notfound.png"]}
            alt="Thumbnail"
          />

          <div className={classes.details}>
            <Link to={`/streaming/${movie.imdb_code}`}>
              <img
                src="/img/btn-overlay-blue.png"
                alt="play"
                style={{
                  position: "relative",
                  top: "50%",
                  width: "75px",
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
            <span className={classes.imdbtext}>{movie.rating.toFixed(1)}</span>
          </span>
        </Box>
      ))}
    </div>
  );
};

export default function Library() {
  const [initialized, setInitialized] = useState(false);
  const dispatch = useDispatch();
  const { library } = useSelector(state => state);
  const { loading, page, sort, rating, genre, hasMore, movies } = library;

  const loadMovies = () => {
    if (!loading) {
      dispatch(getMovies(page, sort, genre, rating));
      setInitialized(true);
    }
  };

  useEffect(() => {
    if (!initialized) {
      loadMovies();
    }
  }, [initialized, loadMovies]);

  useEffect(() => {
    if (initialized) {
      loadMovies();
    }
  }, [sort, rating, genre]);

  useEffect(() => {
    return () => {
      dispatch({
        type: REMOVE_ALERT
      });
    };
  }, []);

  return (
    <div>
      <Controllers />

      <InfiniteScroll
        dataLength={movies.length}
        next={loadMovies}
        hasMore={hasMore}
        loader={<Loading text="Loading Movies.." />}
      >
        {movies.length > 0 && <Thumb movies={movies} />}
      </InfiniteScroll>
      {movies.length === 0 && <AlertComponents />}
    </div>
  );
}
