//Various react components
import React, { Component } from 'react';

//Project components
import PrivateBar from '../PrivateBar.js'
import ProfileCard from './ProfileCard.js'
import ProfileBuckets from './ProfileBuckets.js'

class Profile extends Component {
  constructor(props){
    super(props);
    this.state={
      card:[],
      profileBuckets:[],
      id:[],
      token:[]
    }
  }

  componentWillMount(){
    var privateBar = [];
    privateBar.push(<PrivateBar parentContext={this} key="bar"/>);

    var card = [];
    card.push(<ProfileCard parentContext={this} key="card"/>);

    var profileBuckets = [];
    profileBuckets.push(<ProfileBuckets parentContext={this} key="buckets"/>);

    this.setState({
      privateBar:privateBar,
      card:card,
      profileBuckets:profileBuckets,
      id:this.props.history.location.state.id,
      token:this.props.history.location.state.token
    })
  }

  render() {
    return (
      <div className="Profile">
        {this.state.privateBar}
        {this.state.card}  
        {this.state.profileBuckets} 
      </div>
    );
  }
}

export default Profile;
