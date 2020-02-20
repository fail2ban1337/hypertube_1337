import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { t } from "../../i18n";
import * as qs from "qs";

import handleError from "../../utils/ErrorHandler";
import handleSuccess from "../../utils/SuccessHandler";

const API_URL = "http://localhost:5000";

const Styles = {
  paper: {
    marginTop: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10
  },
  alert: {
    marginTop: 10,
    padding: 10,
    borderRadius: 0,
    borderColor: "#ff7979",
    bprderWidth: 2,
    textAlign: "center",
    color: "#ff7979"
  },
  form: {
    marginTop: 10,
    width: "100%"
  },
  submit: {
    marginTop: 20,
    backgroundColor: "#2196f3",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: "transparent",
      color: "#26a69a",
      border: "1px solid #2196f3"
    }
  },
  forgetpass: {
    marginTop: 10,
    textAlign: "right"
  },
  submitfacebook: {
    marginTop: 10,
    borderRadius: 0,
    background: "black",
    "&:hover": {
      backgroundColor: "#3b5998"
      // border: "1px solid #e74c3c"
    }
  },
  submitgoogle: {
    marginTop: 10,
    borderRadius: 0,
    marginBottom: 10,
    background: "#DB4437",

    "&:hover": {
      backgroundColor: "#DB4437"
      // border: "1px solid #e74c3c"
    }
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errormsg: ""
    };
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // submit Login Form: Local, Google, 42
  submitForm = async form => {
    form.preventDefault();
    try {
      const config = {
        header: {
          "Content-Type": "application/json"
        }
      };
      if (!this.state.username || !this.state.password) {
        handleError({
          response: {
            data: { errors: [{ msg: "put_valid_user_pass" }] }
          }
        });
        return this.setState({
          errormsg: "Failed is Empty, username and password is required!"
        });
      }
      const userdata = {
        username: this.state.username,
        password: this.state.password
      };
      axios
        .post(`${API_URL}/api/guest/local/login`, userdata, config)
        .then(response => {
          // set jwt into local storage
          this.setJwt(response.data.jwt);
          // redirect user to profile page
          window.location = "/profile";
        })
        .catch(err => {
          handleError(err);
        });
    } catch (err) {
      handleError(err);
    }
  };

  // set jwt into local storage
  setJwt = jwt => {
    localStorage.setItem("token", jwt);
  };

  async componentDidMount() {
    const search = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    });
    if (search.action) {
      // message received from server
      if (search.action === "error") {
        // error message
        handleError({
          response: {
            data: { errors: [{ msg: search.key }] }
          }
        });
      } else if (search.action === "success") {
        // success message
        handleSuccess(t(`auth_success.${search.key}`));
      } else if (search.action === "set_jwt") {
        // action to set jwt in local storage
        this.setJwt(search.key);
        // redirect user to profile page
        window.location = "/profile";
      }
    }
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div style={Styles.paper}>
          <form style={Styles.form} onSubmit={form => this.submitForm(form)}>
            <TextField
              variant="standard"
              margin="normal"
              fullWidth
              id="username"
              label={t("login_screen.username")}
              name="username"
              type="text"
              value={this.state.username || ""}
              onChange={e => this.onChange(e)}
              autoFocus
            />

            <TextField
              variant="standard"
              margin="normal"
              fullWidth
              name="password"
              label={t("login_screen.password")}
              type="password"
              id="password"
              value={this.state.password || ""}
              onChange={e => this.onChange(e)}
              autoComplete="current-password"
            />
            <Grid item style={Styles.forgetpass}>
              <Link to="/forgetpassword">
                {t("login_screen.forget_password")}
              </Link>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={Styles.submit}
            >
              {t("login_screen.sign_in")}
            </Button>

            <Grid item>
              <Typography style={{ textAlign: "center", marginTop: 10 }}>
                {t("login_screen.or")}
              </Typography>
            </Grid>
          </form>

          {/* 42 */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={Styles.submitfacebook}
            onClick={() => {
              window.location = `${API_URL}/api/guest/omniauth/ft`;
            }}
          >
            42
          </Button>

          {/* Google */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={Styles.submitgoogle}
            onClick={() => {
              window.location = `${API_URL}/api/guest/omniauth/google`;
            }}
          >
            Google
          </Button>

          <Grid container>
            <Grid item>
              <Link to="/register">
                {t("login_screen.dont_have_an_account")}
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }
}
export default Login;
