import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

import Login from "./Components/user/login";
import Register from "./Components/user/register";
import Streaming from "./Components/streaming/streaming";
import Library from "./Components/pages/Library";
import NavBar from "./Components/inc/NavBar";
import Controllers from "./Components/inc/Controllers";
// Redux
import { Provider } from "react-redux";
import store from "./store";

function App() {
  const [theme, setTheme] = useState({
    palette: {
      type: "dark"
    }
  });

  const toggleDarkTheme = () => {
    let newPaletteType = theme.palette.type === "light" ? "dark" : "light";
    setTheme({
      palette: {
        type: newPaletteType
      }
    });
  };

  const muiTheme = createMuiTheme(theme);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <Provider store={store}>
        <CssBaseline />
        <Router>
          <div className="App">
            <NavBar setDarkMode={toggleDarkTheme} />
            <div>
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/library" component={Library} />
                <Route exact path="/streaming/:imdb" component={Streaming} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
