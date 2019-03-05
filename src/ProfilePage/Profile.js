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
      searchId:[],
      token:[]
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.location.state.searchId != prevProps.location.state.searchId) {
      var card = [];
      card.push(<ProfileCard parentContext={this} key="card"/>);

      var profileBuckets = [];
      profileBuckets.push(<ProfileBuckets parentContext={this} key="buckets"/>);

      this.setState({
        searchId:this.props.location.state.searchId,
        card:card,
        profileBuckets:profileBuckets
      });
    }
  }

  componentWillMount = () => {
    this.setState({
      id:this.props.history.location.state.id,
      searchId:this.props.history.location.state.searchId,
      token:this.props.history.location.state.token
    })

    var privateBar = [];
    privateBar.push(<PrivateBar parentContext={this} key="bar"/>);

    var card = [];
    card.push(<ProfileCard parentContext={this} key="card"/>);

    var profileBuckets = [];
    profileBuckets.push(<ProfileBuckets parentContext={this} key="buckets"/>);

    this.setState({
      privateBar:privateBar,
      card:card,
      profileBuckets:profileBuckets
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
