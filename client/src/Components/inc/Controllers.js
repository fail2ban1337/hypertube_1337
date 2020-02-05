import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  Slider,
  MenuItem,
  Grid,
  FormControl,
  Select,
  Button
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { SET_FILTERS, SET_SORT } from "../../actions/actionTypes";

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

export default function Controllers() {
  const classes = useStyles();
  const [sort, setSort] = useState("year");
  const [rating, setRating] = useState(0);
  const [genre, setGenre] = useState("All");
  const { library } = useSelector(state => state);
  const dispatch = useDispatch();

  const handleChangeRating = async (event, newValue) => {
    setRating(newValue);
  };

  const handleChangeGenre = async event => {
    setGenre(event.target.value);
  };

  const handleChange = async event => {
    if (!library.loading) {
      setSort(event.target.value);
      dispatch({
        type: SET_SORT,
        payload: event.target.value
      });
    }
  };

  const submitFilter = async () => {
    if (!library.loading) {
      dispatch({
        type: SET_FILTERS,
        payload: {
          rating,
          genre
        }
      });
    }
  };

  return (
    <Grid container direction="row">
      <Grid item md={6} xs={12}>
        <Card className={classes.card}>
          <CardContent style={{ minHeight: "139px" }}>
            <Grid xs={12} container item justify={"center"}>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  textAlign: "center",
                  display: "block"
                }}
              >
                Sort
              </span>
            </Grid>

            <RadioGroup
              name="sort_by"
              value={sort}
              onChange={handleChange}
              style={{ height: "100%" }}
            >
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid xs={12} md={4} container item justify={"center"}>
                  <FormControlLabel
                    value="title"
                    control={<Radio style={{ color: "#2196f3" }} />}
                    label="Title"
                  />
                </Grid>
                <Grid xs={12} md={4} container item justify={"center"}>
                  <FormControlLabel
                    value="rating"
                    control={<Radio style={{ color: "#2196f3" }} />}
                    label="Rating"
                  />
                </Grid>
                <Grid xs={12} md={4} container item justify={"center"}>
                  <FormControlLabel
                    value="year"
                    control={<Radio style={{ color: "#2196f3" }} />}
                    label="Year"
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          </CardContent>
        </Card>
      </Grid>
      <Grid item md={6} xs={12}>
        <Card className={classes.card}>
          <CardContent style={{ minHeight: "139px" }}>
            <Grid xs={12} container item justify={"center"}>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  textAlign: "center",
                  display: "block"
                }}
              >
                Filter
              </span>
            </Grid>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              item
              xs={12}
            >
              <Grid item md={3} xs={12}>
                <span
                  style={{
                    fontSize: "8px",
                    fontWeight: "900",
                    textAlign: "center",
                    display: "block"
                  }}
                >
                  Rating
                </span>
                <Slider
                  style={{ color: "#2196f3" }}
                  aria-labelledby="discrete-slider"
                  aria-label="Rating"
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  defaultValue={0}
                  value={rating}
                  onChange={handleChangeRating}
                  min={0}
                  max={9}
                />
              </Grid>
              <Grid item md={3} xs={12}>
                <Grid xs={12} container item justify={"center"}>
                  <span
                    style={{
                      fontSize: "8px",
                      fontWeight: "900",
                      textAlign: "center",
                      display: "block"
                    }}
                  >
                    Genre
                  </span>
                </Grid>
                <Grid xs={12} container item justify={"center"}>
                  <FormControl className={classes.formControl}>
                    <Select
                      style={{ height: "10px" }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={genre}
                      onChange={handleChangeGenre}
                    >
                      <MenuItem value={"Action"}>Action</MenuItem>
                      <MenuItem value={"Adventure"}>Adventure</MenuItem>
                      <MenuItem value={"Comedy"}>Comedy</MenuItem>
                      <MenuItem value={"Drama"}>Drama</MenuItem>
                      <MenuItem value={"Fantasy"}>Fantasy</MenuItem>
                      <MenuItem value={"Historical"}>Historical</MenuItem>
                      <MenuItem value={"Romance"}>Romance</MenuItem>
                      <MenuItem value={"Science fiction"}>
                        Science fiction
                      </MenuItem>
                      <MenuItem value={"Western"}>Western</MenuItem>
                      <MenuItem value={"All"}>All</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid xs={12} md={3} container item justify={"center"}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#2196f3", color: "white" }}
                  onClick={submitFilter}
                >
                  Filter
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
