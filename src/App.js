//Various react components
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//Project components
import SignIn from './SignIn.js'
import SignUp from './SignUp.js'
import Dashboard from './Dashboard/Dashboard.js'
import Profile from './ProfilePage/Profile.js'
import LandingPage from './LandingPage.js'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      component:[]
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/signin" component={SignIn}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/profile" component={Profile}/>
        </div>
      </Router>
    );
  }
}

export default App;
