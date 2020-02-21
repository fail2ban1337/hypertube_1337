import React, { Component } from "react";
import {
  CssBaseline,
  Typography,
  TextField,
  Button,
  Container
} from "@material-ui/core";
import axios from "axios";

import handleError from "../../utils/ErrorHandler";
import handleSuccess from "../../utils/SuccessHandler";
import { t } from "../../i18n";
const API_URL = "http://localhost:5000";

const Styles = {
  paper: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%",
    marginTop: 1
  },
  submit: {
    margin: 3,
    backgroundColor: "#2196f3",
    borderRadius: 0,
    color: "#fff",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#26a69a",
      border: "1px solid #26a69a"
    }
  },
  textField: {
    marginLeft: 6
  }
};
class Forget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }
  onSubmit = async e => {
    e.preventDefault();
    // send request
    if (this.state.email && this.state.email.length > 0) {
      // send request
      axios
        .post(`${API_URL}/api/guest/user/send_reset_password`, {
          email: this.state.email
        })
        .then(response => {
          handleSuccess(response.data.message).then(() => {
            this.props.history.push(`/login`);
          });
        })
        .catch(err => {
          handleError(err);
        });
    } else {
      handleError({
        response: {
          data: { errors: [{ msg: "Invalid_email" }] }
        }
      });
    }
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div style={Styles.paper}>
          <Typography component="h1" variant="h5">
          {t("forgetpassword.forgetpassword")}
          </Typography>
          <form style={Styles.form} onSubmit={e => this.onSubmit(e)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={t("forgetpassword.email_address")}
              name="email"
              autoComplete="email"
              value={this.state.email}
              onChange={e => this.onChange(e)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              style={Styles.submit}
              disabled={!this.state.email}
            >
              {t("forgetpassword.send")}
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}
export default Forget;
