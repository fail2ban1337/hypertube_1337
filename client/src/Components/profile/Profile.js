import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";

import { ProfileHeader } from "./ProfileHeader";
import { ProfileListWatches } from "./ProfileListWatches";
import { Loading } from "../inc/Loading";
import { getProfile } from "../../actions/userAction";
import { useSelector, useDispatch } from "react-redux";

export const Profile = ({ match }) => {
  const { profile, user } = useSelector(state => state);
  // profile id from link
  const dispatch = useDispatch();

  let id = match.params.id || user.info._id;
  /*
   * pass profile image to ProfileHeader Component
   * call watched movies route, pass movies to ProfileListWatches
   */

  useEffect(() => {
    if (user.info._id) dispatch(getProfile(id));
  }, [id, user.info._id]);

  if (profile.loading) return <Loading text="Loading profile" />;
  if (!profile.profile) return <Loading text="profile not valide" />;
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
