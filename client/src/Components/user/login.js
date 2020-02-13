import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { t } from '../../i18n';
const API_URL = "http://localhost:3000/api";

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
    borderRadius:0,
    borderColor:'#ff7979',
    bprderWidth:2,
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
    borderRadius:0,
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
    marginTop:10,
    borderRadius:0,
    background: "black",
    "&:hover": {
      backgroundColor: "#3b5998"
      // border: "1px solid #e74c3c"
    }
  },
  submitgoogle: {
    marginTop:10,
    borderRadius:0,
    marginBottom :10,
    background: "#DB4437",

    "&:hover": {
      backgroundColor: "#DB4437"
      // border: "1px solid #e74c3c"
    }
  },
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
  submitForm = async form => {
    form.preventDefault();
    try {
      const config = {
        header: {
          "Content-Type": "application/json"
        }
      };
      if (!this.state.username || !this.state.password)
        return this.setState({
          errormsg: "Failed is Empty, username and password is required!"
        });
      const userdata = {
        username: this.state.username,
        password: this.state.password
      };
      axios
        .post(`http://localhost:3000/api/users/login`, userdata, config)
        .then(response => {
          console.log("ress =>",response);
        })
        .catch(err =>{
          console.log("err",err.response);
        })
      }catch(err){

      }
  };
  async componentDidMount() {
    if (localStorage.token) {
      await this.checkprofilecomplet(localStorage.token);
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
              <Link to="/forgetpassword">{t("login_screen.forget_password")}</Link>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={Styles.submit}
            >
              {t('login_screen.sign_in')}
            </Button>
              <Grid item>
                <Typography style={{textAlign:'center',marginTop:10}}>{t("login_screen.or")}</Typography>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={Styles.submitfacebook}
              >
                42
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={Styles.submitgoogle}
              >
                Google
              </Button>
            <Grid container>
              <Grid item >
                <Link to="/register">{t("login_screen.dont_have_an_account")}</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}
export default Login;
