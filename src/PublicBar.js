//Various react components
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

//Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Person from '@material-ui/icons/Person';
import Create from '@material-ui/icons/Create';
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
}
class PublicBar extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <AppBar position="sticky">
          <Toolbar>
            <img src={BucketLogo2} alt="Bucket Logo" />
            <Typography variant="title" style={styles}>
              <Link to="/" style={{ textDecoration: 'none', color: '#222' }}><div className="text-bar text-bold">Kick the Bucket</div></Link>
            </Typography>
            <Link to="/signin" style={{ textDecoration: 'none' }}>
              <Button>
                Sign In
                <Person></Person>
              </Button>
            </Link>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <Button>
                Sign Up
                <Create></Create>
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
    );
  }
}

export default PublicBar;
