//Various react components
import React, { Component } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../global-string';

//Material UI components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

//Styling
import './Profile.css';

const styles = {
  margin:10
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ECB030',
    },
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
      <div className="extra-padding">
        <form>
          <MuiThemeProvider theme={theme}>

          <Typography variant="title" style={styles}>
          <div className="text-1 text-medium small-padding">
            <b>Edit Profile</b>
            </div>
          </Typography>

            <div className="add-padding">
            <TextField
              required
              id="firstName"
              label="First Name"
              value={this.state.firstName}
              onChange={this.handleChange('firstName')}
              margin="normal"
              style={styles}
            />

            <TextField
              required
              id="lastName"
              label="Last Name"
              value={this.state.lastName}
              onChange={this.handleChange('lastName')}
              margin="normal"
              style={styles}
            />
            <TextField
              required
              id="email"
              label="Email"
              value={this.state.email}
              onChange={this.handleChange('email')}
              margin="normal"
              style={styles}
            />
            </div>
            <div className="add-padding">
            <TextField
              id="bio"
              label="Bio"
              value={this.state.bio}
              onChange={this.handleChange('bio')}
              margin="normal"
              style={styles}
            />

            <Button className="float-right" id="button-5" variant="contained" color="primary" onClick={() => this.saveChanges()}>
              Save
            </Button>
            </div>
            <div className="mg-xs error-color">{this.state.error}</div>
          </MuiThemeProvider>
        </form>
      </div>
    );
  }
}

export default EditProfile;
