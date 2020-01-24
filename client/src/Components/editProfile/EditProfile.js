import React, { useState } from "react";
import {
  Container,
  CssBaseline,
  Grid,
  TextField,
  Input,
  InputLabel,
  InputAdornment
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

import UploadProfile from "./UploadProfile";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

export const EditProfile = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  return (
    <div>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Grid container alignItems="center" spacing={6}>
            <Grid item xs={12}>
              <UploadProfile />
            </Grid>
            <Grid item md={6} sm={12}>
              <TextField required defaultValue="First Name" />
            </Grid>
            <Grid item md={6} sm={12}>
              <TextField required defaultValue="Last Name" />
            </Grid>
            <Grid item md={6} sm={12}>
              <TextField required defaultValue="Username" />
            </Grid>
            <Grid item md={6} sm={12}>
              <TextField required defaultValue="Email" />
            </Grid>
            <Grid item md={4} sm={12}>
              <InputLabel htmlFor="standard-adornment-old-password">
                Old Password
              </InputLabel>
              <Input
                id="standard-adornment-old-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item md={4} sm={12}>
              <InputLabel htmlFor="standard-adornment-new-password">
                New Password
              </InputLabel>
              <Input
                id="standard-adornment-new-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item md={4} sm={12}>
              <InputLabel htmlFor="standard-adornment-confirm-password">
                Confirm Password
              </InputLabel>
              <Input
                id="standard-adornment-confirm-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};
