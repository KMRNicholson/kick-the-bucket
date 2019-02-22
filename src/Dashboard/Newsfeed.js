//Various react components
import React, { Component } from 'react';

//Material UI components
import Typography from '@material-ui/core/Typography';

//Styling
import './Dashboard.css';

const styles = {
  margin:10
}

class Newsfeed extends Component {
  constructor(props){
    super(props);
    this.state={
      activity:[]
    }
  }

  componentWillMount(){
    //This information will be filled when calling the backend
    var activity = ["Sam Westfield created a new Vancouver Bucket List.",
      "You have gained 5 new followers in the last week.",
      "Brandon Richardson accepted your request to follow."];
    this.setState({
      activity:activity
    })
  }

  render() {
    return (
      <div>
        <form className="card-6 card-shadow-1">

          <Typography variant="title" style={styles}>
          <div className="text-big font-colour">
            <b>Newsfeed</b>
            </div>
          </Typography>

          <div className="text-md-sm">
            <li>{this.state.activity[0]}</li>
            <br/>
            <li>{this.state.activity[1]}</li>
            <br/>
            <li>{this.state.activity[2]}</li>
          </div>
        </form>
      </div>
    );
  }
}

export default Newsfeed;
