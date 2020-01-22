import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Login from "./Components/user/login";
import Register from "./Components/user/register";
import Streaming from "./Components/streming/streaming";

import NavBar from "./Components/inc/NavBar";
// Redux
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar />
          <div>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/streming" component={Streaming} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
