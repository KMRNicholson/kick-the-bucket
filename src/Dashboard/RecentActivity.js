//Various react components
import React, { Component } from 'react';

//Material UI components
import Typography from '@material-ui/core/Typography';

//Styling
import './Dashboard.css';

const styles = {
  margin:10
}

class RecentActivity extends Component {
  constructor(props){
    super(props);
    this.state={
      activity:[]
    }
  }

  componentWillMount(){
    //This information will be filled when calling the backend
    var activity = ["Liked Camping Trip 2018 2hrs ago",
      "Followed Japan 2019 8hrs ago",
      "Completed bucket PEI 2018 23hrs ago"
    ];
    this.setState({
      activity:activity
    })
  }

  render() {
    return (
      <div>
        <form className="card-5 card-shadow-1">
          <Typography variant="title" style={styles}>
          <div className="font-colour">
            <b>Recent Activity</b>
            </div>
          </Typography>
          <div className="text-md-sm rec-activity">
            <ul>
              <li>{this.state.activity[0]}</li>
              <li>{this.state.activity[1]}</li>
              <li>{this.state.activity[2]}</li>
            </ul>
          </div>
        </form>
      </div>
    );
  }
}

export default RecentActivity;
