import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { FormHelperText } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { connect, useSelector } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import propTypes from "prop-types";
import Alert from "../inc/AlertComponents";
import { Upload, message } from "antd";
import axios from "axios";
import "antd/dist/antd.css";
import Swal from "sweetalert2";
import { t } from "../../i18n";
// import { Avatar } from "@material-ui/core";

import handleError from "../../utils/ErrorHandler";
import handleSuccess from "../../utils/SuccessHandler";

const API_URL = "http://localhost:5000";

const Styles = {
  paper: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: 10,
    background: "#2196f3"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: 10
  },
  submit: {
    marginTop: 10,
    background: "#2196f3",
    borderRadius: 0,

    "&:hover": {
      backgroundColor: "#2196f3"
      // border: "1px solid #e74c3c"
    }
  },
  Image: {
    marginTop: 10
  },
  submitfacebook: {
    margin: 10,
    background: "#3b5998",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: "#3b5998"
      // border: "1px solid #e74c3c"
    }
  },
  submitgoogle: {
    margin: 10,
    background: "#DB4437",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: "#DB4437"
      // border: "1px solid #e74c3c"
    }
  },
  helperText: {
    color: "#F32013",
    fontWeight: "fontWeightBold"
  }
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      showPassword: "",
      showConfPassword: "",
      loading: false
    };
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitForm = async form => {
    form.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json"
      }
    };
    const data = {
      username: this.state.userName,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };

    // check if two passwords are matched
    if (data.password && data.password.trim().length > 0) {
      if (data.password !== data.confirmPassword) {
        handleError({
          response: {
            data: { errors: [{ msg: "password_mismatch" }] }
          }
        });
        return;
      }
    } else {
      handleError({
        response: {
          data: { errors: [{ msg: "put_valid_password" }] }
        }
      });
      return;
    }

    // register user
    await axios
      .post(`${API_URL}/api/guest/local/register`, data, config)
      .then(response => {
        handleSuccess(response.data.message).then(() => {
          this.props.history.push(`/login`);
        });
      })
      .catch(err => {
        handleError(err);
      });
  };
  render() {
    return (
      <>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <div style={Styles.paper}>
            <Alert />
            <Avatar style={Styles.avatar}>
              <AccountCircle />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t("register_screen.sign_up")}
            </Typography>

            <form style={Styles.form} onSubmit={form => this.submitForm(form)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    style={Styles.input}
                    variant="outlined"
                    required
                    fullWidth
                    label={t("register_screen.username")}
                    name="userName"
                    onChange={e => this.onChange(e)}
                    value={this.state.userName}
                    autoFocus
                    inputProps={{ maxLength: 15 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    onChange={e => this.onChange(e)}
                    value={this.state.firstName}
                    label={t("register_screen.first_name")}
                    inputProps={{ maxLength: 20 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label={t("register_screen.last_name")}
                    name="lastName"
                    autoComplete="lname"
                    onChange={e => this.onChange(e)}
                    value={this.state.lastName}
                    inputProps={{ maxLength: 20 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label={t("register_screen.email_address")}
                    name="email"
                    autoComplete="email"
                    onChange={e => this.onChange(e)}
                    value={this.state.email}
                    inputProps={{ maxLength: 100 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label={t("register_screen.password")}
                    type={this.state.showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    onChange={e => this.onChange(e)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            aria-label="toggle password visibility"
                            // onClick={handleClickShowPassword}
                            // onMouseDown={handleMouseDownPassword}
                          >
                            {this.state.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmPassword"
                    label={t("register_screen.confirm_password")}
                    autoComplete="new-password"
                    type={this.state.showConfPassword ? "text" : "password"}
                    onChange={e => this.onChange(e)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            aria-label="toggle password visibility"
                            // onClick={handleClickShowConfPassword}
                            // onMouseDown={handleMouseDownPassword}
                          >
                            {this.state.showConfPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={Styles.submit}
              >
                {t("register_screen.sign_up")}
              </Button>
              <Grid container justify="center" style={{ marginBottom: 80 }}>
                <Grid item>
                  <Link to="/login">
                    {t("register_screen.have_an_account")}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </>
    );
  }
}
export default Register;
