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
import { t } from "../../i18n";
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
  const [sort, setSort] = useState("trending");
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
    if (
      !library.loading &&
      (genre !== library.genre || rating !== library.rating)
    ) {
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
                {t("controller.sort")}
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
                    value="trending"
                    control={<Radio style={{ color: "#2196f3" }} />}
                    label={t("controller.trending")}
                  />
                </Grid>
                <Grid xs={12} md={4} container item justify={"center"}>
                  <FormControlLabel
                    value="rating"
                    control={<Radio style={{ color: "#2196f3" }} />}
                    label={t("controller.rating")}
                  />
                </Grid>
                <Grid xs={12} md={4} container item justify={"center"}>
                  <FormControlLabel
                    value="year"
                    control={<Radio style={{ color: "#2196f3" }} />}
                    label={t("controller.year")}
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
                {t("controller.filter")}
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
                  {t("controller.rating")}
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
                    {t("controller.genre")}
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
                      <MenuItem value={"Action"}>
                        {t("controller.genrelist.action")}
                      </MenuItem>
                      <MenuItem value={"Adventure"}>
                        {t("controller.genrelist.adventure")}
                      </MenuItem>
                      <MenuItem value={"Comedy"}>
                        {t("controller.genrelist.comedy")}
                      </MenuItem>
                      <MenuItem value={"Drama"}>
                        {t("controller.genrelist.drama")}
                      </MenuItem>
                      <MenuItem value={"Fantasy"}>
                        {t("controller.genrelist.fantasy")}
                      </MenuItem>
                      <MenuItem value={"Historical"}>
                        {t("controller.genrelist.historical")}
                      </MenuItem>
                      <MenuItem value={"Romance"}>
                        {t("controller.genrelist.romance")}
                      </MenuItem>
                      <MenuItem value={"Science fiction"}>
                        {t("controller.genrelist.science_fiction")}
                      </MenuItem>
                      <MenuItem value={"Western"}>
                        {t("controller.genrelist.western")}
                      </MenuItem>
                      <MenuItem value={"All"}>
                        {t("controller.genrelist.all")}
                      </MenuItem>
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
                  {t("controller.filter")}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
