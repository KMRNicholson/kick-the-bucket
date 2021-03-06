//Various react components
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import SearchBar from './IntegrationAutosuggest.js';

//Material UI
import SearchIcon from '@material-ui/icons/Search';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Person from '@material-ui/icons/Person';
import Dashboard from '@material-ui/icons/Dashboard';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

//Images
import BucketLogo2 from './images/logo.png'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ECB030',
    }
  }
});

const styles = {
  flex:1,
  margin:10
};

class PrivateBar extends Component {
  constructor(props){
    super(props);
    this.state={
      id:0,
      token:''
    }
  }

  componentWillMount(){
    this.setState({
      id:this.props.parentContext.state.id,
      token:this.props.parentContext.state.token
    });
  }

  goToProfile(){
    var page = this;
    page.props.parentContext.props.history.push({
      pathname:"/profile",
      state:{
        id: page.state.id,
        searchId: page.state.id,
        token: page.state.token
      }
    });
  }

  goToDashboard(){
    var page = this;
    page.props.parentContext.props.history.push({
      pathname:"/dashboard",
      state:{
        id: page.state.id,
        token: page.state.token
      }
    });
  }

  renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
      <TextField
        InputProps={{
          inputRef: ref,
          classes: {
            root: classes.inputRoot,
            input: classes.inputInput,
          },
          ...InputProps,
        }}
        {...other}
      />
    );
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <AppBar position="sticky">
          <Toolbar>
            <img src={BucketLogo2} alt="Bucket Logo"/>
            <Typography variant="title" style={styles}>
              <Link to="/" style={{ textDecoration: 'none', color: '#222' }}><b>Kick the Bucket</b></Link>
            </Typography>
            <SearchIcon/>
            <div className = "search-padding">
            <SearchBar parentContext={this}/>
            </div>

            <Button onClick={(event) => this.goToDashboard(event)}>
              Dashboard
              <Dashboard></Dashboard>
            </Button>
            <Button onClick={(event) => this.goToProfile(event)}>
              Profile
              <Person></Person>
            </Button>
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
    );
  }
}

export default PrivateBar;
