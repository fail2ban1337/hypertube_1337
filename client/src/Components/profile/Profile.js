import React from "react";
import { Grid } from "@material-ui/core";

import { ProfileHeader } from "./ProfileHeader";
import { ProfileListWatches } from "./ProfileListWatches";

export const Profile = () => {
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <ProfileHeader />
        </Grid>
        <Grid item xs={12}>
          <ProfileListWatches />
        </Grid>
      </Grid>
    </div>
  );
};
