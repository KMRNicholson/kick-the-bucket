//Various react components
import React, { Component } from 'react';

//Material UI components
import Typography from '@material-ui/core/Typography';

//Styling
import './Dashboard.css';

const styles = {
  margin:10
}

class Trending extends Component {
  constructor(props){
    super(props);
    this.state={
      activity:[]
    }
  }

  componentWillMount(){
    //This information will be filled when calling the backend
    var activity = ["#asiatrip",
      "#MonctonSkydiving",
      "#2018Adventures",
      "#europe",
      "#ecofriendly",
      "#tripadvisor",
      "#gogreen",
      "#bfftrip",
      "#gradgoals",
      "#goclean2019",
      "#KicktheBucket",
      "#programmingSkills",
      "#BestTeamEver"
    ];
    this.setState({
      activity:activity
    })
  }

  render() {
    return (
      <div>
        <form className="card-8 card-shadow-1">
          <Typography variant="title" style={styles}>
          <div className="font-colour">
            <b>#Trending</b>
            </div>
          </Typography>
          <div className="text-md-sm rec-activity">
            <ul>
              <li>{this.state.activity[0]}</li>
              <li>{this.state.activity[1]}</li>
              <li>{this.state.activity[2]}</li>
              <li>{this.state.activity[3]}</li>
              <li>{this.state.activity[4]}</li>
              <li>{this.state.activity[5]}</li>
              <li>{this.state.activity[6]}</li>
              <li>{this.state.activity[7]}</li>
              <li>{this.state.activity[8]}</li>
              <li>{this.state.activity[9]}</li>
              <li>{this.state.activity[10]}</li>
              <li>{this.state.activity[11]}</li>
              <li>{this.state.activity[12]}</li>
            </ul>
          </div>
        </form>
      </div>
    );
  }
}

export default Trending;
