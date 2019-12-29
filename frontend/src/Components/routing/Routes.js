import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { useUserStore } from "../../Context/appStore";

const Routes = () => {
  const [{ auth }] = useUserStore();

  useEffect(() => {
    socket.emit("login", auth.userInfo.id);
  }, [auth]);

  return (
    <div style={{ flex: 1 }}>
      <Switch>
        {/*
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute auth={auth} exact path="/setting" component={Setting} />
          */}
      </Switch>
    </div>
  );
};

export default Routes;
