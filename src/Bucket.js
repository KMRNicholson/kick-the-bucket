//Various react components
import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import axios from 'axios';
import { apiBaseUrl } from './global-string';

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

// Styling
//Styling
import './App.css';

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
      <div className = "center-all">

      <div className = "small-padding img-center float-middle">
        <img src={this.state.avatar} style={{width:135, height:135}} alt={"Bucket"} />
      </div>

        <Typography onClick={() => this.viewBucket()} style={styles}>
          <div className ="text-1 text-medium text-bold text-center">
                {this.state.name}
            </div>
        </Typography>

        <MuiThemeProvider theme={theme}>
        <div className = "icon-fix">
          <Add color="primary"/>
          <Edit onClick={() => this.editBucket()} color="primary"/>
          <Delete onClick={() => this.deleteBucket()}/>
          </div>
        </MuiThemeProvider>

        <Modal open={open} onClose={this.onCloseModal} center>
          {this.state.modal}
        </Modal>

</div>

    );
  }
}

export default Bucket;
