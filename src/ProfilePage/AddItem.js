//Various react components
import React, { Component } from 'react';
import axios from 'axios';

//Material UI components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
    secondary: {
      main: '#f0fff0',
    },
  },
});

class AddItem extends Component {
  constructor(props){
    super(props);
    this.state={
      name:'',
      description:'',
      link:'',
      bucketId:[],
      ownerId:[],
      error:[]
    }
  }

  paramsCheck(){
    var results;
    if(this.state.name.trim().length>0 && 
      this.state.description.trim().length>0 &&
      this.state.link.trim().length>0)
    {
      results = true;
    }else{
      results = false;
      this.setState({
        error:"* Missing required fields"
      })
    }
    return results;
  }

  addItem(){
    var apiBaseUrl = "http://localhost:8080/users/";
    var token = this.props.parentContext.state.token;
    var newItem = this;

    if(newItem.paramsCheck()){
      var payload = {
        "name":newItem.state.name,
        "description":newItem.state.description,
        "link":newItem.state.link,
        "isComplete":false
      }
      axios.post(apiBaseUrl+newItem.state.ownerId+'/buckets/'+newItem.state.bucketId+'/items', payload, {
        headers: {
          Authorization:'Bearer '+token
      }})
      .then(function(response){
        console.log(response)
        newItem.props.parentContext.componentWillMount();
      })
      .catch(function(error){
        console.log(error);
      });
    }
  }

  componentWillMount(){
    var bucketId = this.props.parentContext.state.id;
    var ownerId = this.props.parentContext.state.ownerId;
    
    this.setState({
      bucketId:bucketId,
      ownerId:ownerId
    })
  }

  cancel = () => {
    this.props.parentContext.setState({
      addItem:[]
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    return (
      <div>
          <MuiThemeProvider theme={theme}>
            <TextField
              required
              id="name"
              label="Name"
              value={this.state.name}
              onChange={this.handleChange('name')}
              style={styles} />
            <TextField
              required
              id="desc"
              label="Description"
              value={this.state.description}
              onChange={this.handleChange('description')}
              style={styles} />
            <TextField
              required
              id="link"
              label="Link"
              value={this.state.link}
              onChange={this.handleChange('link')}
              style={styles} />
            <Button id="addButton" color="primary" onClick={() => this.addItem()}>
              Add
            </Button>
            <Button id="addButton" color="primary" onClick={() => this.cancel()}>
              Cancel
            </Button>
          </MuiThemeProvider>
          <div className="mg-xs error-color">{this.state.error}</div>
      </div>
    );
  }
}

export default AddItem;
