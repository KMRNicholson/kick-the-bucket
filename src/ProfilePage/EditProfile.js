//Various react components
import React, { Component } from 'react';
import axios from 'axios';

//Material UI components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

//Styling
import './Profile.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ECB030',
    },
    secondary: blue,
  },
});

class EditProfile extends Component{
  constructor(props){
    super(props);
    this.state={
      firstName:'',
      lastName:'',
      email:'',
      bio:'',
      id:0,
      token:'',
      error:''
    }
  }

  saveChanges = () => {
    var apiBaseUrl = "http://localhost:8080/";
    var modal = this;

    if(modal.paramsCheck()){
      var payload = {
        "firstName":modal.state.firstName,
        "lastName":modal.state.lastName,
        "email":modal.state.email,
        "bio":modal.state.bio
      }
      axios.patch(apiBaseUrl+"users/"+modal.state.id, payload, {headers: {
        Authorization:'Bearer '+modal.state.token
      }})
      .then(function(response){
        modal.props.parentContext.setState({
          component:[],
          open:false
        })
        modal.props.parentContext.componentWillMount();
      })
      .catch(function(error){
        modal.setState({
          error:"* Invalid email format."
        })
      })
    }
  };

  paramsCheck(){
    var results;
    if(this.state.firstName.trim().length>0 && 
      this.state.lastName.trim().length>0 && 
      this.state.email.trim().length>0)
    {
      results = true;
    }else{
      results = false;
      this.setState({
        error:"* Missing required fields"
      });
    }
    return results;
  }

  componentWillMount(){
    var modal = this;

    var id = modal.props.id;
    var token = modal.props.token;
    var firstName = modal.props.firstName;
    var lastName = modal.props.lastName;
    var email = modal.props.email;
    var bio = modal.props.bio;
    
    modal.setState({
      id:id,
      token:token,
      firstName:firstName,
      lastName:lastName,
      email:email,
      bio:bio
    });
  }

  handleChange = name => event => {
    event.persist();
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <form>
          <MuiThemeProvider theme={theme}>
            <TextField
              required
              id="firstName"
              label="First Name"
              value={this.state.firstName}
              onChange={this.handleChange('firstName')}
              margin="normal"
            />
            <TextField
              required
              id="lastName"
              label="Last Name"
              value={this.state.lastName}
              onChange={this.handleChange('lastName')}
              margin="normal"
            />
            <TextField
              required
              id="email"
              label="Email"
              value={this.state.email}
              onChange={this.handleChange('email')}
              margin="normal"
            />
            <TextField
              id="bio"
              label="Bio"
              value={this.state.bio}
              onChange={this.handleChange('bio')}
              margin="normal"
            />
            <Button className="float-right" id="save-button" variant="contained" color="primary" onClick={() => this.saveChanges()}>
              Save
            </Button>
            <div className="mg-xs error-color">{this.state.error}</div>
          </MuiThemeProvider>
        </form>
      </div>
    );
  }
}

export default EditProfile;
