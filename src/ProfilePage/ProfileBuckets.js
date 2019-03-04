//Various react components
import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

//Project components
import MyBuckets from './MyBuckets.js'
import FollowedBuckets from './FollowedBuckets.js'
import CreateBucket from './CreateBucket.js'

//Material UI components
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

//Styling
import './Profile.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ECB030',
    },
    secondary: {
      main: '#F2F2F2',
    },
  },
});

class ProfileBuckets extends Component {
  constructor(props){
    super(props);
    this.state={
      component:[],
      open:false,
      createBucket:[]
    }
  }

  onCloseModal = () => {
    this.setState({ open: false });
  };

  componentWillMount(){
    var component = [];
    component.push(<MyBuckets parentContext={this} key="myBuckets"/>);

    var createBucket = [];
    createBucket.push(<CreateBucket parentContext={this} key="createBuckets"/>);

    this.setState({
      component:component,
      createBucket:createBucket,
      open:false
    })
  }

  myBuckets = () => {
    this.setState({
      component:[]
    })

    var component = [];
    component.push(<MyBuckets parentContext={this} key="myBuckets"/>);
    
    this.setState({
      component:component
    })
  }

  followedBuckets = () => {
    this.setState({
      component:[]
    })
    
    var component = [];
    component.push(<FollowedBuckets parentContext={this} key="followedBuckets"/>);
    this.setState({
      component:component
    })
  }

  createBucket(){
    this.setState({ open: true });
  }

  render(){
    const { open } = this.state;
    return (
      <div className="ProfileBuckets">
        <MuiThemeProvider theme={theme}>
          <Button id="button-2" variant="contained" color="secondary" onClick={() => this.myBuckets()}>
            My Buckets
          </Button>
          <Button id="button-2" variant="contained" color="secondary" onClick={() => this.followedBuckets()}>
            Followed Buckets
          </Button>
          <Button className="float-right" id="button-3" variant="contained" color="primary" onClick={() => this.createBucket()}>
            Create Bucket
          </Button>
        </MuiThemeProvider>
        <Modal open={open} onClose={this.onCloseModal} center>
          {this.state.createBucket}
        </Modal>
        {this.state.component}   
      </div>
    );
  }
}

export default ProfileBuckets;