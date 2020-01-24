import React from "react";
import { Grid, Avatar, Typography } from "@material-ui/core";

export const ProfileHeader = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      style={{ padding: 20 }}
    >
      <Grid item xs={12}>
        <Avatar
          src="https://writestylesonline.com/wp-content/uploads/2016/08/Follow-These-Steps-for-a-Flawless-Professional-Profile-Picture-1024x1024.jpg"
          alt="profile-image"
          style={{ width: "150px", height: "150px" }}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Jhon Doe</Typography>
      </Grid>
    </Grid>
  );
};
