//Various react components
import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import axios from 'axios';

//Material UI 
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import EditBucket from './ProfilePage/EditBucket.js'
import ViewBucket from './ProfilePage/ViewBucket.js'

//Images
import Avatar from './ProfilePage/bucket-3.png'

const styles = {
  margin:10
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ECB030',
    }
  }
});

class Bucket extends Component {
  constructor(props){
    super(props);
    this.state={
      avatar:[],
      name:[],
      isPublic:[],
      desc:[],
      id:[],
      ownerId:[],
      modal:[],
      open:false
    }
  }

  onCloseModal = () => {
    this.setState({ open: false });
  };

  editBucket = () => {
    var editBucket = []
    editBucket.push(<EditBucket parentContext={this} key={"editBucket"+this.state.id}/>)
    this.setState({
      modal:editBucket,
      open:true
    });
  };

  viewBucket = () => {
    var viewBucket = [];
    viewBucket.push(<ViewBucket parentContext={this} key={"viewBucket"+this.state.id}/>)
    this.setState({
      modal:viewBucket,
      open:true
    })
  }

  deleteBucket = () => {
    var item = this;
    var apiBaseUrl = "http://localhost:8080/";
    axios.delete(apiBaseUrl+'users/'+item.state.ownerId+'/buckets/'+item.state.id, {headers: {
      Authorization:'Bearer '+item.props.token
    }})
    .then(function(response){
      item.props.parentContext.componentWillMount();
    })
    .catch(function(error){
      console.log(error);
    });
  }

  componentWillMount(){
    var avatar = Avatar; //Once Brandon sets up s3 image storage, we will load the avatar from there
    this.setState({
      avatar:avatar,
      name:this.props.name,
      isPublic:this.props.isPublic,
      desc:this.props.desc,
      id:this.props.id,
      ownerId:this.props.ownerId
    });
  }

  render(){
    const { open } = this.state;
    return (
      <div>
        <img src={this.state.avatar} style={{width:50, height:50}} alt={"Bucket"} />
        <Typography onClick={() => this.viewBucket()} style={styles}>
          {this.state.name}
        </Typography>
        <MuiThemeProvider theme={theme}>
          <Add color="primary"/>
          <Edit onClick={() => this.editBucket()} color="primary"/>
          <Delete onClick={() => this.deleteBucket()}/>
        </MuiThemeProvider>
        <Modal open={open} onClose={this.onCloseModal} center>
          {this.state.modal}
        </Modal>
      </div>
    );
  }
}

export default Bucket;
