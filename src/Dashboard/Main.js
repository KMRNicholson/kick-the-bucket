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

    var news = [];
    news.push(<Newsfeed parentContext={this} key="news"/>);

    this.setState({
      popular:popular,
      news:news
    })
  }

  render() {
    return (
      <div className="Sidebar">
        {this.state.popular}
        {this.state.news} 
      </div>
    );
  }
}

export default Main;
