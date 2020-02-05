import React from "react";
import { Grid } from "@material-ui/core";

import { ProfileHeader } from "./ProfileHeader";
import { ProfileListWatches } from "./ProfileListWatches";

export const Profile = () => {
  /*
   * pass profile image to ProfileHeader Component
   * call watched movies route, pass movies to ProfileListWatches
   */
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
