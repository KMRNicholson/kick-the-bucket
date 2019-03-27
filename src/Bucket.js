//Various react components
import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import axios from 'axios';
import { apiBaseUrl } from './global-string';

//Material UI
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Follow from '@material-ui/icons/AddBox';
import Unfollow from '@material-ui/icons/Clear';
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
      ownerUtil:[],
      userId:[],
      follow:[],
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

  follow(){
    var page = this;
    var id = page.props.ownerId;
    var userId = page.props.userId;
    var bucketId = page.props.id;
    var token = page.props.token;

    axios.post(apiBaseUrl+'users/'+userId+'/following_bucket'+"?id="+bucketId, {}, {
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

  unfollow(){
    var page = this;
    var id = page.props.ownerId;
    var userId = page.props.userId;
    var bucketId = page.props.id;
    var token = page.props.token;

    axios.delete(apiBaseUrl+'users/'+userId+'/following_bucket'+"?id="+bucketId, {
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

  componentWillMount(){
    var page = this;
    var ownerId = page.props.ownerId;
    var userId = page.props.userId;
    var bucketId = page.props.id;
    var token = page.props.token;
    var ownerUtil = [];
    var follow = [];

    if(this.props.ownerId == this.props.userId){
      ownerUtil.push(<Edit key="edit" onClick={() => this.editBucket()} color="primary"/>);
      ownerUtil.push(<Delete key="del" onClick={() => this.deleteBucket()}/>);
    }else{
      axios.get(apiBaseUrl+'users/'+userId+'/following_bucket', {
        headers: {
          Authorization:'Bearer '+token
        }
      })
      .then(function(response){
        if(response.data.find(x => x.id === bucketId)){
          follow.push(<Unfollow key="ufbutton" color="primary" onClick={() => page.unfollow()}/>);
        }else{
          follow.push(<Follow key="fbutton" color="primary" onClick={() => page.follow()}/>);
        }
        page.setState({
          follow:follow
        })

        //page.props.parentContext.componentWillMount();
      })
      .catch(function(error){
        console.log(error);
      });
    }

    var avatar = Avatar; //Once Brandon sets up s3 image storage, we will load the avatar from there
    this.setState({
      avatar:avatar,
      name:this.props.name,
      isPublic:this.props.isPublic,
      desc:this.props.desc,
      id:bucketId,
      ownerId:ownerId,
      userId:userId,
      ownerUtil:ownerUtil
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
<<<<<<< 476fd2943eacec9870a17050e16b152758f2adfe
          {this.state.ownerUtil}
          {this.state.follow}
=======
        <div className = "icon-fix">
          <Add color="primary"/>
          <Edit onClick={() => this.editBucket()} color="primary"/>
          <Delete onClick={() => this.deleteBucket()}/>
          </div>
>>>>>>> Profile modifications
        </MuiThemeProvider>

        <Modal open={open} onClose={this.onCloseModal} center>
          {this.state.modal}
        </Modal>

</div>

    );
  }
}

export default Bucket;
