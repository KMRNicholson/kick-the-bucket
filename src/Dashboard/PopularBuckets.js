//Various react components
import React, { Component } from 'react';

//Material UI components
import Typography from '@material-ui/core/Typography';

//Styling
import './Dashboard.css';

const styles = {
  margin:10
}

class PopularBuckets extends Component {
  constructor(props){
    super(props);
    this.state={
      buckets:[]
    }
  }

  componentWillMount(){
    //This information will be filled when calling the backend
    var buckets = [0,1,2,3,4];
    this.setState({
      buckets:buckets
    })
  }

  render() {
    return (
      <div>
        <form className="card-6 card-shadow-1">
          <Typography variant="title" style={styles}>
            <div className="text-big font-colour">
            <b>Popular Buckets</b>
            </div>
          </Typography>
        </form>
      </div>
    );
  }
}

export default PopularBuckets;
