import React from "react";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { blue } from "@material-ui/core/colors";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  paperContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: "-1",
    minHeight: "100%",
    minWidth: "100%",
    width: "auto",
    height: "auto",
    transform: "translate(-50%, -50%)"
  },
  Interduction: {
    color: "white",
    fontFamily: "New Century Schoolbook, serif"
  }
});
export default function Home() {
  const classes = useStyles();
  const { user } = useSelector(state => state);

  if (user.loading) return null;
  return (
    <>
      <video autoPlay loop muted className={classes.paperContainer}>
        <source src="/img/background.mp4" type="video/mp4" />
      </video>
      <Card
        style={{
          backgroundColor: "transparent",
          boxShadow: "none",
          marginTop: "30%"
        }}
      >
        <CardContent>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid xs={12} container item>
              <Grid container item xs={12} justify="center">
                <Typography
                  variant="h4"
                  align="center"
                  className={classes.Interduction}
                >
                  {
                    "Watch anywhere online or on your mobile phone, tablet, or TV!"
                  }
                </Typography>
              </Grid>
              <Grid container item xs={12} justify="center">
                <Link to="/library">
                  <Button
                    variant="outlined"
                    style={{
                      color: blue[500],
                      borderColor: blue[500],
                      marginTop: "20px"
                    }}
                  >
                    {user.isAuthenticated ? "Go to Library" : "Login"}
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
