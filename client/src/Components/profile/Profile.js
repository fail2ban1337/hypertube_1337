import React from "react";
import { Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";

import { ProfileHeader } from "./ProfileHeader";
import { ProfileListWatches } from "./ProfileListWatches";
import Divider from "@material-ui/core/Divider";

export const Profile = () => {
  /*
   * pass profile image to ProfileHeader Component
   * call watched movies route, pass movies to ProfileListWatches
   */
  return (
    <div>
      <Container maxWidth="lg">
        <ProfileHeader />
        <Divider />
        <ProfileListWatches />
      </Container>
    </div>
  );
};
