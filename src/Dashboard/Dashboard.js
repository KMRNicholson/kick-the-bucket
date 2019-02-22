//Various react components
import React, { Component } from 'react';

//Project components
import PrivateBar from '../PrivateBar.js'
import Main from './Main.js'
import Sidebar from './Sidebar.js'

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state={
      id:0,
      token:'',
      privateBar:[],
      main:[],
      sidebar:[]
    }
  }

  componentWillMount(){
    var privateBar = [];
    privateBar.push(<PrivateBar parentContext={this} key="bar"/>);

    var main = [];
    main.push(<Main parentContext={this} key="main"/>);

    var sidebar = [];
    sidebar.push(<Sidebar parentContext={this} key="sidebar"/>);

    this.setState({
      privateBar:privateBar,
      main:main,
      sidebar:sidebar,
      id:this.props.history.location.state.id,
      token:this.props.history.location.state.token
    })
  }

  render() {
    return (
      <div className="Dashboard">
        {this.state.privateBar}
        <div className="float-left">
          {this.state.sidebar}
        </div>
        {this.state.main}
      </div>
    );
  }
}

export default Dashboard;
