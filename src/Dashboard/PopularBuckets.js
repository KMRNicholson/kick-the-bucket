//Various react components
import React, { Component } from 'react';

//Material UI components
import Typography from '@material-ui/core/Typography';

//Styling
import './Dashboard.css';

//Images
import Travel from './travel.png'
import Friend from './friends.png'


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
        <form className="card-7 card-shadow-1">
          <Typography variant="title" style={styles}>
            <div className="text-big font-colour text-1">
              <b>Popular Buckets</b>
            </div>
          </Typography>
          <br/>

          <div className="float-left">

          <div className = "float-left mg-sm mode-down">
            <img src={Travel} alt={"Travel"} style={{width:450, height:370}} />
            </div>

              <div className="text-large text-header text-bold">
                <p>Best Travel Tips: 2019 Edition</p>
              </div>
                <p>
                  tips tips tips tips tips tips tips TIPS
                  tips tips tips tips tips tips tips TIPS
                  tips tips tips tips tips tips tips TIPS
                  tips tips tips tips tips tips tips TIPS

                </p>

          </div>


          <div className = "float-right">
          <div className="float-right mg-sm">
              <img src={Friend} alt={"Friend"} style={{width:450, height:370}}/>
          </div>

          <div className="text-large text-header text-bold">
            <p>Best Travel Tips: 2019 Edition</p>
          </div>
            <p>
              tips tips tips tips tips tips tips TIPS
              tips tips tips tips tips tips tips TIPS
              tips tips tips tips tips tips tips TIPS
              tips tips tips tips tips tips tips TIPS

            </p>
          </div>


        </form>
      </div>
    );
  }
}

export default PopularBuckets;
