import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";

import { ProfileHeader } from "./ProfileHeader";
import { ProfileListWatches } from "./ProfileListWatches";
import { Loading } from "../inc/Loading";
import { getProfile } from "../../actions/userAction";

export const Profile = ({ match }) => {
  const { profile } = useSelector(state => state);
  // profile id from link
  let id = match.params.id;
  /*
   * pass profile image to ProfileHeader Component
   * call watched movies route, pass movies to ProfileListWatches
   */

  useEffect(() => {
    getProfile(id);
  }, [])

  if (profile.loading) return <Loading text="Loading profile" />
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
