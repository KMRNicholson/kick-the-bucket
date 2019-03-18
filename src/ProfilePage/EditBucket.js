//Various react components
import React, { Component } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../global-string';

//Material UI components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
  },
});

class EditBucket extends Component{
  constructor(props){
    super(props);
    this.state={
      name:'',
      desc:'',
      isPublic:'',
      ownerId:[],
      id:0,
      token:'',
      error:''
    }
  }

  saveChanges = () => {
    var modal = this;

    if(modal.paramsCheck()){
      var payload = {
        "name":modal.state.name,
        "description":modal.state.desc,
        "isPublic":modal.state.isPublic
      }
      axios.patch(apiBaseUrl+"users/"+modal.state.ownerId+"/buckets/"+modal.state.id, payload, {headers: {
        Authorization:'Bearer '+modal.state.token
      }})
      .then(function(response){
        modal.props.parentContext.setState({
          modal:[],
          open:false
        })
        modal.props.parentContext.props.parentContext.componentWillMount();
      })
      .catch(function(error){
        modal.setState({
          error:"* Changes could not be saved."
        })
      })
    }
  };

  paramsCheck(){
    var results;
    if(this.state.name.trim().length>0 &&
      this.state.desc.trim().length>0)
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

  componentWillMount(){
    var modal = this;

    var id = modal.props.parentContext.state.id;
    var token = modal.props.parentContext.props.token;
    var name = modal.props.parentContext.state.name;
    var desc = modal.props.parentContext.state.desc;
    var isPublic = modal.props.parentContext.state.isPublic;
    var ownerId = modal.props.parentContext.state.ownerId;

    modal.setState({
      id:id,
      ownerId:ownerId,
      token:token,
      name:name,
      desc:desc,
      isPublic:isPublic
    });
  }

  handleChange = name => event => {
    event.persist();
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSwitch = name => event => {
    event.persist();
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
      <div className="extra-padding">

          <MuiThemeProvider theme={theme}>

          <Typography variant="title" style={styles}>
            <div className="text-1 text-medium small-padding">
                <b>Edit Bucket</b>
            </div>
          </Typography>


            <TextField
              required
              id="name"
              label="Name"
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
              style={styles}
            />

            <TextField
              required
              id="desc"
              label="Description"
              value={this.state.desc}
              onChange={this.handleChange('desc')}
              margin="normal"
              style={styles}
            />

            <div className="small-padding">
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.isPublic}
                  onChange={this.handleSwitch('isPublic')}
                  value="isPublic"
                  color="primary"
                />
              }
              label="Public"/>
              </div>


            <Button className="float-right" id="button-6" variant="contained" color="primary" onClick={() => this.saveChanges()}>
              <div className="text-1">
                Save
                </div>
            </Button>


            <div className="mg-xs error-color">{this.state.error}</div>
          </MuiThemeProvider>

      </div>
    );
  }
}

export default EditBucket;
