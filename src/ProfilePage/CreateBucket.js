//Various react components
import React, { Component } from 'react';
import axios from 'axios';

//Material UI components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
    secondary: {
      main: '#f0fff0',
    },
  },
});

var errorMessage = "";

class CreateBucket extends Component {
  constructor(props){
    super(props);
    this.state={
      name:'',
      description:'',
      isPublic:true,
      id:[],
      token:[],
      error:[]
    }
  }

  paramsCheck(){
    var results;
    if(this.state.name.trim().length>0 && this.state.description.trim().length>0){
      results = true;
    }else{
      results = false;
      errorMessage = "* Missing required fields";
    }
    return results;
  }

  createBucket(){
    var apiBaseUrl = "http://localhost:8080/";
    var id = this.props.parentContext.props.parentContext.state.id;
    var token = this.props.parentContext.props.parentContext.state.token;
    var page = this;

    page.setState({
      id:id,
      token:token
    });

    if(page.paramsCheck()){
      var payload = {
        "name":page.state.name,
        "description":page.state.description,
        "isPublic":page.state.isPublic
      }
      axios.post(apiBaseUrl+'users/'+id+'/buckets', payload, {headers: {
        Authorization:'Bearer '+token
      }})
      .then(function(response){
        page.props.parentContext.myBuckets();
        page.props.parentContext.setState({
          open:false
        })
      })
      .catch(function(error){
        console.log(error);
      });
    }else{
      this.setState({error:errorMessage});
    }
  }

  componentWillMount(){
    var id = this.props.parentContext.state.id;
    var token = this.props.parentContext.state.token;
    
    this.setState({
      id:id,
      token:token
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSwitch = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
      <div>
          <MuiThemeProvider theme={theme}>
            <Typography variant="title" style={styles}>
              Create Bucket
            </Typography>
            <TextField
              required
              id="nameField"
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
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.isPublic}
                  onChange={this.handleSwitch('isPublic')}
                  value="isPublic"
                  color="primary"
                />
              }
              label="Public"
            />
            <Button id="button-3" variant="contained" color="primary" onClick={(event) => this.createBucket(event)}>
              Create
            </Button>
          </MuiThemeProvider>
          <div className="mg-xs error-color">{this.state.error}</div>
      </div>
    );
  }
}

export default CreateBucket;
