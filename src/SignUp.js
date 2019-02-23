//Various react components
import React, { Component } from 'react';
import { BrowserRouter as Router, Route,  Link } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from './global-string';

//Material UI Components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

//Project Components
import PublicBar from './PublicBar.js'

//Styling
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ECB030',
    },
    secondary: blue,
  },
});

const styles = {
  margin:10
}

var errorMessage = "";

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password:"",
      confirmPassword:"",
      message:"",
      error:""
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentWillMount(){
    var message = "Already have an account? Sign in by clicking ";
    this.setState({
      message:message
    })
  }

  paramsCheck(){
    var results;
    if(this.state.firstName.trim().length>0 &&
      this.state.lastName.trim().length>0 &&
      this.state.email.trim().length>0 &&
      this.state.password.trim().length>0 &&
      this.state.confirmPassword.trim().length>0 &&
      this.state.username.trim().length>0
    ){
      results = true;
    }else{
      results = false;
      errorMessage = "* Missing required fields";
    }
    return results;
  }

  passwordCheck(){
    var results;
    if(this.state.confirmPassword.trim() !== this.state.password.trim()){
      results = false;
      errorMessage = "* Passwords do not match";
    }else{
      results = true;
    }
    return results;
  }

  signUp(){
    var page = this;
    if(this.paramsCheck() && this.passwordCheck()){
      var payload = {
        "firstName":this.state.firstName,
        "lastName":this.state.lastName,
        "username":this.state.username,
        "email":this.state.email,
        "password":this.state.password,
        "passwordConfirm":this.state.password
      }
      axios.post(apiBaseUrl+'auth/signup', payload)
      .then(function(response){
        page.props.history.push("/signin");
      })
      .catch(function(error){
        console.log(error);
        page.setState({error:"* Username/email combination already exists."});
      });
    }else{
      this.setState({error:errorMessage});
    }
  }

  render() {
    return (
      <div>
        <PublicBar/>
        <div className="ta-center">
        <form className= "card-2 card-shadow-1" autoComplete="off">
          <MuiThemeProvider theme = {theme}>
            <Typography variant="display1" style={styles}>
            <b>  Sign Up </b>
            </Typography>
            <TextField
              required
              id="firstName"
              label="First Name"
              value = {this.state.firstName}
              onChange={this.handleChange('firstName')}
              style = {styles}
            />
            <TextField
              required
              id="lastName"
              label="Last Name"
              value = {this.state.lastName}
              onChange={this.handleChange('lastName')}
              style = {styles}
            />
            <TextField
              required
              id="userName"
              label="Username"
              value = {this.state.username}
              onChange={this.handleChange('username')}
              style = {styles}
            />
            <TextField
              required
              id="email"
              label="Email Address"
              value = {this.state.email}
              onChange={this.handleChange('email')}
              style = {styles}
            />
            <TextField
              required
              id="password"
              type="password"
              label="Password"
              value = {this.state.password}
              onChange={this.handleChange('password')}
              style = {styles}
            />
            <TextField
              required
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              value = {this.state.confirmPassword}
              onChange={this.handleChange('confirmPassword')}
              style = {styles}
            />
            <Button id ="button-1" variant="contained" color = "primary" onClick={(event) => this.signUp(event)}>
            <b>  Sign me up! </b>
            </Button>
          </MuiThemeProvider>
        </form>
        <div className="mg-xs error-color">{this.state.error}</div>
        <div className="mg-xs">
          {this.state.message} <Link to="/signin" style={{ textDecoration: 'none' }}>here</Link>!
        </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
