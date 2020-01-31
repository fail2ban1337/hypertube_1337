import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import UploadProfile from "../editProfile/UploadProfile";

const useStyles = makeStyles({
  title: {
    color: "#939598",
    fontWeight: "900",
    letterSpacing: "20px"
  }
});

export const ProfileHeader = ({
  img = "https://writestylesonline.com/wp-content/uploads/2016/08/Follow-These-Steps-for-a-Flawless-Professional-Profile-Picture-1024x1024.jpg"
}) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      style={{ padding: 20 }}
    >
      <Grid item xs={12} style={{ position: "relative" }}>
        <UploadProfile img={img} />
        {/* 
          if not user own profile
        <Avatar
            src="https://writestylesonline.com/wp-content/uploads/2016/08/Follow-These-Steps-for-a-Flawless-Professional-Profile-Picture-1024x1024.jpg"
            alt="avatar"
            style={{ width: "150px", height: "150px" }}
          /> */}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" className={classes.title}>
          Jhon Doe
        </Typography>
      </Grid>
    </Grid>
  );
};
