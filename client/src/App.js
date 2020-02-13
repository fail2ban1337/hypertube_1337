import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

import Login from "./Components/user/login";
import Forget from "./Components/user/Forget";
import Register from "./Components/user/register";
import Reset from "./Components/user/Reset";
import Streaming from "./Components/streaming/streaming";
import Library from "./Components/pages/Library";
import NavBar from "./Components/inc/NavBar";
import Footer from "./Components/inc/Footer";
import { Profile } from "./Components/profile/Profile";
import { EditProfile } from "./Components/editProfile/EditProfile";
// Redux
import { Provider } from "react-redux";

import store from "./store";


function App() {
  const [theme, setTheme] = useState({
    palette: {
      type: localStorage.getItem("darkMode")
        ? localStorage.getItem("darkMode")
        : "dark"
    }
  });

  const toggleDarkTheme = () => {
    let newPaletteType = theme.palette.type === "light" ? "dark" : "light";
    localStorage.setItem("darkMode", newPaletteType);
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
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column"
          }}
        >
          <Router>
            <NavBar setDarkMode={toggleDarkTheme} />
            <div style={{ flex: 1 }}>
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/forgetpassword" component={Forget} />
                <Route exact path="/reset_password/:token" component={Reset} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/editprofile" component={EditProfile} />
                <Route exact path="/library" component={Library} />
                <Route exact path="/streaming/:imdb" component={Streaming} />
              </Switch>
            </div>
            <Footer style={{ flex: 1 }} />
          </Router>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
