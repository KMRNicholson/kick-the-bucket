//Various react components
import React, { Component } from 'react';
import axios from 'axios';
import { apiBaseUrl } from './global-string';

//Material UI components
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ECB030',
    }
  }
});

class Item extends Component {
  constructor(props){
    super(props);
    this.state={
      name:[],
      desc:[],
      link:[],
      isComplete:[],
      id:[],
      bucketId:[],
      ownerId:[],
      mode:[],
      ownerUtil:[],
      checkbox:[],
      error:[]
    }
  }

  handleChange = name => event => {
    event.persist();
    this.setState({
      [name]: event.target.value,
    });
  }

  editItem = () => {
    var edit = [];
    edit.push(<MuiThemeProvider theme={theme}>
      <TextField
        required
        id="name"
        label="Name"
        onChange={this.handleChange('name')}
      />
      <TextField
        required
        id="desc"
        label="Description"
        onChange={this.handleChange('desc')}
      />
      <TextField
        required
        id="link"
        label="Link"
        onChange={this.handleChange('link')}
      />
      <Button className="float-right" id="save-button" variant="contained" color="primary" onClick={() => this.saveChanges()}>
        Save
      </Button>
      <Button className="float-right" id="save-button" variant="contained" color="primary" onClick={() => this.cancel()}>
        Cancel
      </Button>
      <div className="mg-xs error-color">{this.state.error}</div>{this.state.error}
    </MuiThemeProvider>);
    this.setState({
      mode:edit
    })
  };

  paramsCheck(){
    var results;
    if(this.state.name.trim().length>0 && 
      this.state.desc.trim().length>0 &&
      this.state.link.trim().length>0)
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

  saveChanges(){
    var item = this;
    var token = item.props.token;

    if(item.paramsCheck()){
      var payload = {
        "name":item.state.name,
        "description":item.state.desc,
        "link":item.state.link
      }
      axios.patch(apiBaseUrl+"users/"+item.state.ownerId+"/buckets/"+item.state.bucketId+"/items/"+item.state.id, 
        payload, 
        { headers: {
          Authorization:'Bearer '+token
      }})
      .then(function(response){
        item.props.parentContext.componentWillMount();
      })
      .catch(function(error){
        item.setState({
          error:"* Changes could not be saved."
        })
      })
    }
  }

  cancel(){
    this.props.parentContext.componentWillMount();
  }

  deleteItem = () => {
    var item = this;
    var token = item.props.token;

    axios.delete(apiBaseUrl+"users/"+item.state.ownerId+'/buckets/'+item.state.bucketId+'/items/'+item.state.id, {
      headers: {
      Authorization:'Bearer '+token
    }})
    .then(function(response){
      item.props.parentContext.componentWillMount();
    })
    .catch(function(error){
      console.log(error);
    });
  }

  completeItem = name => event => {
    if(this.props.userId == this.props.ownerId){
      event.persist();
      var item = this;
      var token = item.props.token;

      var payload = {
        isComplete:event.target.checked
      }

      axios.patch(apiBaseUrl+"users/"+item.state.ownerId+"/buckets/"+item.state.bucketId+"/items/"+item.state.id, payload, {
        headers: {
          Authorization:'Bearer '+token
      }})
      .then(function(response){
        item.props.parentContext.componentWillMount();
      })
      .catch(function(error){
        console.log(error)
      })
    }
  }

  componentWillMount = () => {
    var display = [];
    var ownerUtil = [];

    if(this.props.userId == this.props.ownerId){
      ownerUtil.push(<Edit key="edit" onClick={() => this.editItem()} color="primary"/>);
      ownerUtil.push(<Delete key="del" onClick={() => this.deleteItem()}/>);
    }

    display.push(<Typography>
      {this.props.name}
      {this.props.desc}
      {this.props.link}
    </Typography>);

    this.setState({
      name:this.props.name,
      isComplete:this.props.isComplete,
      desc:this.props.desc,
      link:this.props.link,
      id:this.props.id,
      bucketId:this.props.bucketId,
      ownerId:this.props.ownerId,
      ownerUtil:ownerUtil,
      mode:display
    });
  }

  render(){
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Checkbox
            checked={this.state.isComplete}
            onChange={this.completeItem('isComplete')}
            value="isComplete"
            color="primary"
          />
          {this.state.mode}
          {this.state.ownerUtil}
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Item;
