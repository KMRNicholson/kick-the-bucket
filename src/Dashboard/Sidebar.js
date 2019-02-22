//Various react components
import React, { Component } from 'react';

//Project components
import RecentActivity from './RecentActivity.js'
import Trending from './Trending.js'

class Sidebar extends Component {
  constructor(props){
    super(props);
    this.state={
      recentActivity:[],
      trending:[]
    }
  }

  componentWillMount(){
    var recentActivity = [];
    recentActivity.push(<RecentActivity parentContext={this} key="ra"/>);

    var trending = [];
    trending.push(<Trending parentContext={this} key="trending"/>);

    this.setState({
      recentActivity:recentActivity,
      trending:trending
    })
  }

  render() {
    return (
      <div className="Sidebar">
        {this.state.recentActivity}
        {this.state.trending} 
      </div>
    );
  }
}

export default Sidebar;
