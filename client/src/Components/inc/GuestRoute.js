import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const GuestRoute = ({ component, ...rest }) => {
  const { user } = useSelector(state => state);

  if (user.loading) return null;
  if (user.isAuthenticated) return <Redirect to='/profile' />
  return <Route {...rest} component={component} />;
};

export default GuestRoute;
