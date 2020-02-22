import React from "react";
import { Grid, Typography, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import UploadProfile from "../editProfile/UploadProfile";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  title: {
    color: "#939598",
    fontWeight: "900",
    letterSpacing: "20px"
  }
});

export const ProfileHeader = () => {
  const classes = useStyles();
  const { profile, user } = useSelector(state => state);

  const isUserOwnProfile = user.info._id === profile.info.user._id;
  console.log("profile", profile, user);

  const img = `/img/profiles/${profile.info.user.profileImage}`;

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      style={{ padding: 20 }}
    >
      <Grid item xs={3} style={{ position: "relative" }}>
        {isUserOwnProfile ? (
          <UploadProfile img={img} />
        ) : (
          <Avatar
            src={img}
            alt="avatar"
            style={{ width: "150px", height: "150px" }}
          />
        )}

        {/* 
          if not user own profile
        <Avatar
            src="https://writestylesonline.com/wp-content/uploads/2016/08/Follow-These-Steps-for-a-Flawless-Professional-Profile-Picture-1024x1024.jpg"
            alt="avatar"
            style={{ width: "150px", height: "150px" }}
          /> */}
      </Grid>
      <Grid item xs={3}>
        <Typography variant="h5" className={classes.title}>
          {profile.info.user.username}
        </Typography>
      </Grid>
    </Grid>
  );
};
