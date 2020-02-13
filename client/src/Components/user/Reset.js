import React, { Component } from "react";
import {
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
  IconButton,
  Container
} from "@material-ui/core";
import Swal from "sweetalert2";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from 'axios';
const API_URL = "http://localhost:3000/api";
const Styles = {
  paper: {
    marginTop: 100,
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
    backgroundColor: "#26a69a",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#26a69a",
      border: "1px solid #26a69a"
    }
  },
  textField: {
    marginLeft: 6
  }
}
class Reset extends Component {
  constructor() {
    super();
    this.state = {
      email:'',
      password: "",
      password2: "",
      showPassword: false,
      email_token: undefined
    };
  }
  async componentDidMount(){
    // console.log("dddd",this.props.match.params.token)
    this.setState({
      email:localStorage.getItem('email'),
      email_token:this.props.match.params.token
    })
  }
  onSubmit = async (e) => {
    e.preventDefault();
  };
  passwordChange = e =>{this.setState({[e.target.name]: e.target.value})}
  ClickshowPassword = () =>{this.setState({showPassword: !this.state.showPassword})}
  render() {
    return (
      <Container component="main" maxWidth="xs">
        <div style={Styles.paper}>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <form style={Styles.form} onSubmit={e => this.onSubmit(e)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="password"
                  label="New Password"
                  fullWidth
                  variant="outlined"
                  type={this.state.showPassword ? "text" : "password"}
                  name="password"
                  value={this.state.password || ""}
                  onChange={e => this.passwordChange(e)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.ClickshowPassword}
                        >
                          {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="password2"
                  label="New Password Again"
                  fullWidth
                  variant="outlined"
                  type={this.state.showPassword ? "text" : "password"}
                  name="password2"
                  value={this.state.password2 || ""}
                  onChange={e => this.passwordChange(e)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.ClickshowPassword}
                        >
                          {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
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
              color="secondary"
              style={Styles.submit}
              disabled={!this.state.password || !this.state.password2}
            >
              Submit
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}
export default Reset;
