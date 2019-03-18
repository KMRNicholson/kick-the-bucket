//Various react components
import React, { Component } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../global-string';

//Project imports
import Bucket from '../Bucket.js'

//Material UI components
import Typography from '@material-ui/core/Typography';

//Styling
import './Profile.css';

const styles = {
  margin:10
}

class MyBuckets extends Component {
  constructor(props){
    super(props);
    this.state={
      buckets:[]
    }
  }

  componentWillReceiveProps(prevProps){
    this.fetchBuckets();
  }

  fetchBuckets(){
    var page = this;
    var token = this.props.parentContext.props.parentContext.state.token;
    var id = this.props.parentContext.props.parentContext.state.id;
    var searchId = this.props.parentContext.props.parentContext.state.searchId;

    page.setState({
      buckets:[]
    })

    axios.get(apiBaseUrl+'users/'+searchId+'/buckets', {
      headers: {
        Authorization:'Bearer '+token
      }
    })
    .then(function(response){
      var buckets = [];
      var count = 0;

      response.data.sort(function(a, b){
        return a.id - b.id;
      })
      
      response.data.forEach((element, index, array) => {
        buckets.push(<Bucket
          name={element.name}
          isPublic={element.isPublic}
          desc={element.description}
          id={element.id}
          userId={id}
          ownerId={searchId}
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

  componentWillMount = () =>{
    this.fetchBuckets();
  }

  render = () => {
    return (
      <div className="card-4 card-shadow-1">
        <Typography variant="title" style={styles}>
          <div className="text-1 text-medium ">
            Buckets
          </div>
        </Typography>
        {this.state.buckets}
      </div>
    );
  }
}

export default MyBuckets;
