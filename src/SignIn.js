//Various react components
import React, { Component } from 'react';
import { BrowserRouter as Router, Route,  Link } from 'react-router-dom';
import axios from 'axios';

//Project components
import PublicBar from './PublicBar.js'

//Material UI components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

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

class SignIn extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      message:'',
      error:''
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentWillMount(){
    var message = "Don't have an account? Sign up by clicking ";
    this.setState({
      message:message
    })
    console.log(this);
  }

  paramsCheck(){
    var results;
    if(this.state.username.trim().length>0 && this.state.password.trim().length>0){
      results = true;
    }else{
      results = false;
      errorMessage = "* Missing required fields";
    }
    return results;
  }

  signIn(){
    var apiBaseUrl = "http://localhost:8080/";
    var page = this;
    if(this.paramsCheck()){
      var payload = {
        "username":this.state.username,
        "password":this.state.password
      }
      axios.post(apiBaseUrl+'auth/signin', payload)
      .then(function(response){
        console.log(response);
        page.props.history.push({
          pathname:"/dashboard",
          state:{
            id: response.data.user.id,
            token: response.data.token
          }
        });
      })
      .catch(function(error){
        console.log(error);
        page.setState({error:"* Invalid username/password combination."});
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
          <form className="card-1 card-shadow-1">
            <MuiThemeProvider theme={theme}>
              <Typography variant="display1" style={styles}>
                <b>Sign In</b>
              </Typography>
              <TextField
                required
                id="usernameField"
                label="Username"
                value={this.state.username}
                onChange={this.handleChange('username')}
                style={styles}
              />
              <TextField
                required
                id="passwordField"
                label="Password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange('password')}
                style={styles}
              />
              <Button id="button-1"  variant="contained" color="primary" onClick={(event) => this.signIn(event)}>
                <b>Sign In</b>
              </Button>

            </MuiThemeProvider>
          </form>
          <div className="mg-xs error-color">{this.state.error}</div>
          <div className="mg-xs">
            {this.state.message} <Link to="/signup" style={{ textDecoration: 'none' }}>here</Link>!
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
