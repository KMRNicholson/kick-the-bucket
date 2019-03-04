//Various react components
import React, { Component } from 'react';
import axios from 'axios';

//Project imports
import Bucket from '../Bucket.js'

//Material UI components
import Typography from '@material-ui/core/Typography';

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

  componentWillMount(){
    var apiBaseUrl = "http://localhost:8080/";
    var id = this.props.parentContext.props.parentContext.state.id;
    var token = this.props.parentContext.props.parentContext.state.token;
    var page = this;

    axios.get(apiBaseUrl+'users/'+id+'/following_bucket', {
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
          key={"bucket"+count+1} />);
        
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