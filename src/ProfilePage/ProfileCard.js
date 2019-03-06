//Various react components
import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import axios from 'axios';
import { apiBaseUrl } from '../global-string';

//Material UI components
import Typography from '@material-ui/core/Typography';
import Setting from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import EditProfile from './EditProfile';

//Styling
import './Profile.css';

//Images
import Avatar from './snowboard.png'

const styles = {
  margin:10
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ECB030',
    },
    secondary: blue,
  },
});

class ProfileCard extends Component {
  constructor(props){
    super(props);
    this.state={
      name:'',
      followers:0,
      following:0,
      bio:'',
      id:0,
      token:'',
      followButton:[],
      editProfile:[],
      settings:[],
      open: false
    }
  }

  onCloseModal = () => {
    this.setState({ open: false });
  };

  editProfile = () => {
    this.setState({ open: true });
  };

  follow = () => {
    var page = this;
    var id = page.props.parentContext.state.id;
    var searchId = page.props.parentContext.state.searchId;
    var token = page.props.parentContext.state.token;

    axios.post(apiBaseUrl+'users/'+id+'/following'+"?id="+searchId, {}, {
      headers: {
        Authorization:'Bearer '+token
      }
    })
    .then(function(response){
      page.componentWillMount();
    })
    .catch(function(error){
      console.log(error);
    });
  }

  unfollow = () => {
    var page = this;
    var id = page.props.parentContext.state.id;
    var searchId = page.props.parentContext.state.searchId;
    var token = page.props.parentContext.state.token;

    axios.delete(apiBaseUrl+'users/'+id+'/following'+"?id="+searchId, {
      headers: {
        Authorization:'Bearer '+token
      }
    })
    .then(function(response){
      page.componentWillMount();
    })
    .catch(function(error){
      console.log(error);
    });
  }

  componentWillReceiveProps(){
    this.fetchUserInfo();
  }

  finishRequest(button, settings){
    var page = this;
    var id = page.props.parentContext.state.id;
    var searchId = page.props.parentContext.state.searchId;
    var token = page.props.parentContext.state.token;

    page.setState({
      id:id,
      token:token,
      followButton:button,
      settings:settings
    });

    axios.get(apiBaseUrl+'users/'+searchId+'/profile', {
      headers: {
        Authorization:'Bearer '+token
      }
    })
    .then(function(response){
      var component = [];
      component.push(<EditProfile
        firstName={response.data.user.firstName} 
        lastName={response.data.user.lastName}
        email={response.data.user.email}
        bio={"" + response.data.user.bio}
        id={response.data.user.id}
        token={token}
        key="editProfile"
        parentContext={page} 
      />);
      page.setState({
        name:response.data.user.firstName + ' ' +response.data.user.lastName,
        followers:response.data.followerCount,
        following:response.data.followingCount,
        bio:response.data.user.bio,
        component:component
      });
    })
    .catch(function(error){
      console.log(error);
    });
  }

  fetchUserInfo(){
    var page = this;
    var id = page.props.parentContext.state.id;
    var searchId = page.props.parentContext.state.searchId;
    var token = page.props.parentContext.state.token;
    var button = []
    var settings = [];

    if(id != searchId){
      axios.get(apiBaseUrl+'users/'+id+'/following', {
        headers: {
          Authorization:'Bearer '+token
        }
      })
      .then(function(response){
        if(response.data.find(x => x.id === searchId)){
          button.push(<Button key="fbutton" color="primary" onClick={() => page.unfollow()}>Unfollow</Button>);
        }else{
          button.push(<Button key="fbutton" color="primary" variant="contained" onClick={() => page.follow()}>Follow</Button>)
        }
        page.finishRequest(button, settings);
      })
      .catch(function(error){
        console.log(error);
      });
    }else{
      settings.push(<Setting key="edituser" onClick={() => this.editProfile()} color="primary"/>)
      this.finishRequest(button, settings);
    }
  }

  componentWillMount = () => {
    this.fetchUserInfo();
  }

  render() {
    const { open } = this.state;
    return (
      <div>
        <form className="card-3 card-shadow-1 ta-center float-left">
          <MuiThemeProvider theme={theme}>
            <img src={Avatar} alt={"Avatar"} style={{width:250, height:250}} />
            <Typography variant="display1" style={styles}>
              {this.state.name}
              {this.state.settings}
            </Typography>
            {this.state.followButton}
            <Typography variant="subheading" style={styles}>
              Followers: {this.state.followers}   Following: {this.state.following}
            </Typography>
            <Typography variant="subheading" style={styles}>
              {this.state.bio}
            </Typography>
          </MuiThemeProvider>
        </form>
        <Modal open={open} onClose={this.onCloseModal} center>
          {this.state.component}
        </Modal>
      </div>
    );
  }
}

export default ProfileCard;