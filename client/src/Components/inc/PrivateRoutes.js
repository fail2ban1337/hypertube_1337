import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component, ...rest }) => {
  const { user } = useSelector(state => state);

  console.log("private route", user)

  if (user.loading) return null;
  if (!user.isAuthenticated) return <Redirect to='/login' />
  return <Route {...rest} component={component} />;
};

export default PrivateRoute;
