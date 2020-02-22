import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import Axios from "axios";

import Login from "./Components/user/login";
import Home from "./Components/pages/Home";
import Forget from "./Components/user/Forget";
import Register from "./Components/user/register";
import Reset from "./Components/user/Reset";
import Verify from "./Components/user/Verify";
import Streaming from "./Components/streaming/streaming";
import Library from "./Components/pages/Library";
import NavBar from "./Components/inc/NavBar";
import Footer from "./Components/inc/Footer";
import { Profile } from "./Components/profile/Profile";
import { EditProfile } from "./Components/editProfile/EditProfile";
// Redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { t, setLocale, getLocale } from "../src/i18n";
import i18n from "i18n-js";

import setTokenToAxiosHeader from "./utils/setTokenToAxiosHeader";
import { loadUser } from "./actions/userAction";
import PrivateRoute from "./Components/inc/PrivateRoutes";
import GuestRoute from "./Components/inc/GuestRoute";

// Set axios headers
if (localStorage.token) {
  setTokenToAxiosHeader(localStorage.token);
}

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state);

  let source = Axios.CancelToken.source();

  const [theme, setTheme] = useState({
    palette: {
      type: localStorage.getItem("darkMode")
        ? localStorage.getItem("darkMode")
        : "light"
    }
  });

  const [Lang, setLang] = useState({
    langage: {
      type: localStorage.getItem("LANGUAGE")
        ? localStorage.getItem("LANGUAGE")
        : "fr"
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

  const toggleLanguage = async () => {
    let newLangType = Lang.langage.type === "en" ? "fr" : "en";
    await setLocale(Lang.langage.type);
    await setLang({
      langage: {
        type: newLangType
      }
    });
  };

  console.log("ss", localStorage.getItem("sss"));
  let deflang = localStorage.getItem("LANGUAGE")
    ? localStorage.getItem("LANGUAGE")
    : getLocale(i18n.locale);

  const muiTheme = createMuiTheme(theme, deflang);

  useEffect(() => {
    console.log("load");
    dispatch(loadUser());
    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    console.log("loaduser", user);
  }, [user]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column"
        }}
      >
        <Router>
          <NavBar setDarkMode={toggleDarkTheme} Langage={toggleLanguage} />
          <div style={{ flex: 1 }}>
            <Switch>
              <Route exact path="/home" component={Home} />
              <GuestRoute exact path="/login" component={Login} />
              <GuestRoute exact path="/register" component={Register} />
              <GuestRoute exact path="/forgetpassword" component={Forget} />
              <GuestRoute
                exact
                path="/reset_password/:token"
                component={Reset}
              />
              <GuestRoute
                exact
                path="/verify_email/:token"
                component={Verify}
              />
              <PrivateRoute exact path="/profile/:id?" component={Profile} />
              <PrivateRoute exact path="/editprofile" component={EditProfile} />
              <PrivateRoute exact path="/library" component={Library} />
              <PrivateRoute
                exact
                path="/streaming/:imdb"
                component={Streaming}
              />
            </Switch>
          </div>
          <Footer style={{ flex: 1 }} />
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
