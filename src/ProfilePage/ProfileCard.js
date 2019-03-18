//Various react components
import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import axios from 'axios';
import { apiBaseUrl } from '../global-string';

//Material UI components
import Typography from '@material-ui/core/Typography';
import Setting from '@material-ui/icons/Settings';
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
      editProfile:[],
      open: false
    }
  }

  onCloseModal = () => {
    this.setState({ open: false });
  };

  editProfile = () => {
    this.setState({ open: true });
  };

  componentWillMount = () => {
    var page = this;

    var id = page.props.parentContext.state.id;
    var token = page.props.parentContext.state.token;

    page.setState({
      id:id,
      token:token
    });

    axios.get(apiBaseUrl+'users/'+id+'/profile', {
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

  render() {
    const { open } = this.state;
    return (
      <div>
        <form className="card-3 card-shadow-1 ta-center float-left">
          <MuiThemeProvider theme={theme}>
            <img src={Avatar} alt={"Avatar"} style={{width:250, height:250}} class="avatar" />
            <Typography variant="display1" style={styles}>
            <div className="text-1">
                {this.state.name}
                <Setting onClick={() => this.editProfile()} color="primary"/>
              </div>
            </Typography>
            <Typography variant="subheading" style={styles}>
              <div className="text-1 text-smaller">
                <b>Followers: {this.state.followers}   Following: {this.state.following}</b>
              </div>
            </Typography>
            <Typography variant="subheading" style={styles}>
            <div className="text-2 text-smaller">
              {this.state.bio}
              </div>
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
