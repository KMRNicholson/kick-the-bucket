//Various react components
import React, { Component } from 'react';
import axios from 'axios';

//Project imports
import Bucket from '../Bucket.js'

//Material UI components
import Typography from '@material-ui/core/Typography';
import { apiBaseUrl } from '../global-string';

//Styling
import './Profile.css';

const styles = {
  margin:10
}

class FollowedBuckets extends Component {
  constructor(props){
    super(props);
    this.state={
      buckets:[]
    }
  }

  componentWillMount = () => {
    var token = this.props.parentContext.props.parentContext.state.token;
    var id = this.props.parentContext.props.parentContext.state.id;
    var searchId = this.props.parentContext.props.parentContext.state.searchId;
    var page = this;

    page.setState({
      buckets:[]
    })

    axios.get(apiBaseUrl+'users/'+searchId+'/following_bucket', {
      headers: {
        Authorization:'Bearer '+token
      }
    })
    .then(function(response){
      var buckets = [];
      var count = 0;
      response.data.forEach((element, index, array) => {
        buckets.push(<Bucket 
          name={element.name} 
          isPublic={element.isPublic}
          desc={element.description}
          id={element.id}
          ownerId={element.ownerId}
          userId={id}
          token={token}
          key={"bucket"+count+1}
          parentContext={page} />);
        
        count++;
        
        if(count === array.length) {
          page.setState({
            buckets:buckets
          });
        }
      })
    })
    .catch(function(error){
      console.log(error);
    });
  }

  render() {
    return (
      <div className="card-4 card-shadow-1">
        <Typography variant="title" style={styles}>
          Followed Buckets
        </Typography>
        {this.state.buckets}
      </div>
    );
  }
}

export default FollowedBuckets;
