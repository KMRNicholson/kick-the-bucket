//Various react components
import React, { Component } from 'react';

//Project components
import PopularBuckets from './PopularBuckets.js'
import Newsfeed from './Newsfeed.js'

class Main extends Component {
  constructor(props){
    super(props);
    this.state={
      popular:[],
      news:[]
    }
  }

  componentWillMount(){
    var popular = [];
    popular.push(<PopularBuckets parentContext={this} key="pb"/>);



    this.setState({
      popular:popular,
    })
  }

  render() {
    return (
      <div className="Sidebar">
        {this.state.popular}
      </div>
    );
  }
}

export default Main;
