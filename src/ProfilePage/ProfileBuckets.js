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

const styles = {
  float: 'right',
  'font-size': '1.25em',
  'font-family': "'Karla', sans-serif"
}

class ProfileBuckets extends Component {
  constructor(props){
    super(props);
    this.state={
      component:[],
      open:false,
      createBucket:[],
      createBucketButton:[]
    }
  }

  onCloseModal = () => {
    this.setState({ open: false });
  };

  componentWillReceiveProps(){
    var page = this;
    var id = page.props.parentContext.state.id;
    var searchId = page.props.parentContext.state.searchId;
    var button = [];
    var component = [];
    
    component.push(<MyBuckets parentContext={this} key="myBuckets"/>);

    if(id == searchId){
      button.push(<Button key="fbutton" color="primary" variant="contained" onClick={() => this.createBucket()}>Create Bucket!</Button>);
    }

    this.setState({
      createBucketButton:button,
      component:component
    });
  }

  componentWillMount(){
    var page = this;
    var id = page.props.parentContext.state.id;
    var searchId = page.props.parentContext.state.searchId;

    var component = [];
    component.push(<MyBuckets parentContext={this} key="myBuckets"/>);

    var createBucket = [];
    createBucket.push(<CreateBucket parentContext={this} key="createBuckets"/>);

    var button = [];

    if(id == searchId){
      button.push(
      <Button id="createbutton" key="fbutton" color="primary" variant="contained" onClick={() => this.createBucket()}>
          Create Bucket!
      </Button>);
    }

    this.setState({
      component:component,
      createBucket:createBucket,
      open:false,
      createBucketButton:button
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
            <div className="text-2 text-medium">
              Buckets
            </div>
          </Button>
          <Button id="button-2" variant="contained" color="secondary" onClick={() => this.followedBuckets()}>
            <div className="text-2 text-medium">
              Followed Buckets
            </div>
          </Button>
          {this.state.createBucketButton}
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
