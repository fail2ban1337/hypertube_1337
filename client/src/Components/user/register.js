import React, { useState, useEffect, useCallback } from "react";
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
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import propTypes from 'prop-types';
import Alert from '../inc/AlertComponents';

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },

  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",

    "&:hover": {
      backgroundColor: "transparent",
      border: "1px solid #e74c3c"
    }
  },
  helperText: {
    color: "#F32013",
    fontWeight: "fontWeightBold"
  }
}));

function SignUp({setAlert, register}) {

  const classes = useStyles();

  const [MyForm, setMyFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfPassword: false
  });

  const submitForm = async form => {
    form.preventDefault();
    if (MyForm.password !== MyForm.confirmPassword)
    {
      setAlert('Password do not match', "error");
    }
    register({userName, firstName, lastName, email,password, confirmPassword});
  };
  const handleClickShowPassword = () => {
    setMyFormData({ ...MyForm, showPassword: !MyForm.showPassword });
  };
  const handleClickShowConfPassword = () => {
    setMyFormData({ ...MyForm, showConfPassword: !MyForm.showConfPassword });
  };
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  const handleInputChange = event => {
    event.persist();
    setMyFormData(MyForm => ({
      ...MyForm,
      [event.target.name]: event.target.value.trim()
    }));
  };
  const handlePasswordChange = event => {
    event.persist();
    setMyFormData(MyForm => ({
      ...MyForm,
      [event.target.name]: event.target.value
    }));
  };


  const {userName, firstName, lastName, email,password, confirmPassword } = MyForm;
  return (
    <>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <div className={classes.paper}>
            <Alert/>
            <Avatar className={classes.avatar}>
              <AccountCircle />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} onSubmit={form => submitForm(form)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    className={classes.input}
                    variant="outlined"
                    required
                    fullWidth
                    label="Usear Name"
                    name="userName"
                    onChange={handleInputChange}
                    value={userName}
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
                    onChange={handleInputChange}
                    value={firstName}
                    label="First Name"
                    inputProps={{ maxLength: 20 }}
                  />

                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    onChange={handleInputChange}
                    value={lastName}
                    inputProps={{ maxLength: 20 }}
                  />

                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleInputChange}
                    value={email}
                    inputProps={{ maxLength: 100 }}
                  />
      
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={MyForm.showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    onChange={handlePasswordChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {MyForm.showPassword ? (
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
                    label="Confirm  Password"
                    autoComplete="new-password"
                    type={MyForm.showConfPassword ? "text" : "password"}
                    onChange={handlePasswordChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {MyForm.showConfPassword ? (
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
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="center">
                <Grid item>
                  <Link to="/login">Already have an account? Sign in</Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      )}
    </>
  );
}
const Register = ({setAlert, register}) => {
  return (
    <div style={{ flex: 1 }}>
      <SignUp setAlert={setAlert} register={register}/>
    </div>
  );
};
Register.propTypes = {
  setAlert: propTypes.func.isRequired,
  register: propTypes.func.isRequired,
};

export default connect(null, {setAlert, register})(Register);