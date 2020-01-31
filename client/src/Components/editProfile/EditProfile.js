import React, { useState } from "react";
import {
  Container,
  CssBaseline,
  Grid,
  TextField,
  Input,
  InputLabel,
  InputAdornment,
  Button,
  FormHelperText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";

import { message } from "antd";

import AlertComponents from "../inc/AlertComponents";
import useForm from "./useForm";
import validateEditProfile from "./validateForm";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  helperText: {
    color: "#F32013",
    fontWeight: "700["
  }
}));

export const EditProfile = () => {
  const classes = useStyles();
  const { formData, setformData, handleChange, handleSubmit } = useForm(
    validateEditProfile,
    submit
  );

  const {
    first_name,
    last_name,
    username,
    email,
    oldPassword,
    newPassword,
    confirmPassword,
    errors
  } = formData;

  async function submit() {
    //Send data
    const config = {
      headers: {
        "Content-Type": "Application/json"
      }
    };
    try {
      const result = await axios.post("/api/users/update", formData, config);
      if (result) message.success(result.data.msg);
    } catch (error) {
      const msg = error.response.data.msg;
      if (error.response.data.errors)
        setformData({ ...formData, errors: error.response.data.errors });
      message.error(msg);
    }
  }

  return (
    <div>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <AlertComponents />
        <div className={classes.paper}>
          <Grid container alignItems="center" spacing={6}>
            <Grid item md={6} sm={12}>
              <TextField
                required
                value={first_name}
                onChange={handleChange("first_name")}
                placeholder="First Name"
                error={errors.first_name ? true : false}
              />
              {errors.first_name && (
                <FormHelperText className={classes.helperText}>
                  <sup>*</sup> {errors.first_name}
                </FormHelperText>
              )}
            </Grid>
            <Grid item md={6} sm={12}>
              <TextField
                required
                value={last_name}
                onChange={handleChange("last_name")}
                placeholder="Last Name"
                error={errors.last_name ? true : false}
              />
              {errors.last_name && (
                <FormHelperText className={classes.helperText}>
                  <sup>*</sup> {errors.last_name}
                </FormHelperText>
              )}
            </Grid>
            <Grid item md={6} sm={12}>
              <TextField
                required
                value={username}
                onChange={handleChange("username")}
                placeholder="Username"
                error={errors.username ? true : false}
              />
              {errors.username && (
                <FormHelperText className={classes.helperText}>
                  <sup>*</sup> {errors.username}
                </FormHelperText>
              )}
            </Grid>
            <Grid item md={6} sm={12}>
              <TextField
                required
                value={email}
                onChange={handleChange("email")}
                placeholder="Email"
                error={errors.email ? true : false}
              />
              {errors.email && (
                <FormHelperText className={classes.helperText}>
                  <sup>*</sup> {errors.email}
                </FormHelperText>
              )}
            </Grid>
            <Grid item md={4} sm={12}>
              <InputLabel htmlFor="standard-adornment-old-password">
                Old Password
              </InputLabel>
              <Input
                id="standard-adornment-old-password"
                type="password"
                error={errors.oldPassword ? true : false}
                value={oldPassword}
                onChange={handleChange("oldPassword")}
              />
              {errors.oldPassword && (
                <FormHelperText className={classes.helperText}>
                  <sup>*</sup> {errors.oldPassword}
                </FormHelperText>
              )}
            </Grid>
            <Grid item md={4} sm={12}>
              <InputLabel htmlFor="standard-adornment-new-password">
                New Password
              </InputLabel>
              <Input
                id="standard-adornment-new-password"
                type="password"
                error={errors.newPassword ? true : false}
                value={newPassword}
                onChange={handleChange("newPassword")}
              />
              {errors.newPassword && (
                <FormHelperText className={classes.helperText}>
                  <sup>*</sup> {errors.newPassword}
                </FormHelperText>
              )}
            </Grid>
            <Grid item md={4} sm={12}>
              <InputLabel htmlFor="standard-adornment-confirm-password">
                Confirm Password
              </InputLabel>
              <Input
                id="standard-adornment-confirm-password"
                type="password"
                error={errors.confirmPassword ? true : false}
                value={confirmPassword}
                onChange={handleChange("confirmPassword")}
              />
              {errors.confirmPassword && (
                <FormHelperText className={classes.helperText}>
                  <sup>*</sup> {errors.confirmPassword}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                style={{ width: "100%" }}
                onClick={handleSubmit}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};
