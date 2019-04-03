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
        <div className ="sm-padding">

          <Typography variant="title" style={styles}>
            <div className="text-bigger font-colour text-1 sm-padding">
              <b>Latest Tips & Tricks</b>
            </div>
          </Typography>

          <br/>

          <div className="float-left full-width">

          <div className = "float-left mg-sm">
            <img src={Travel} alt={"Travel"} style={{width:450, height:370}} />
            </div>

            <div className = "text-2">
              <div className="text-header text-2 top-padding">
              <div className = "text-large">
                <p><b>Best Travel Tips: 2019 Edition</b></p>
                </div>
                <div className ="text-medium">
                <p>
                  <b>Is your suitcase bursting at the seems? Unsure of how much to spend in the country you're visiting?</b>
                </p>
                </div>
              </div>

                <p>
                We've collected some of the best travel tips....with videos included! Check them out:
                </p>
                <p>
                <b>Packing:</b> Ever heard of the <i>KonMari</i> method? This method of cleaning up your
                life will also help you clean up your suitcase. No need no 300 pairs of underwear and 29
                pairs of jeans for a 2 day vacation! Check out the link below to find out how to pack your suitcase
                efficiently.
                </p>
                <p><a href="https://www.youtube.com/watch?v=NWCmeklWJug">How to Pack a Suitcase with Marie Kondo</a></p>

                <p>
                <b>Money:</b> Trying to plan a trip with your friends? Only have 4 dollars in your bank account?
                You've bought the plane tickets....but now you can't eat for 2 weeks. Maybe it's time you started
                budgetting your travel expenses. Check out these links in order to maximize your budget without eating
                instant ramen 24/7.
                </p>
                <p><a href="https://www.budgetyourtrip.com/countrylist.php">Travel Calculator</a></p>
                <p><a href="https://www.lonelyplanet.com/travel-tips-and-articles/lonely-planets-travel-money-essentials/40625c8c-8a11-5710-a052-1479d277e6a0">Lonely Planet's Travel Money Essentials</a></p>
              </div>
          </div>


          <div className = "float-right full-width">
          <div className="float-right mg-sm">
              <img src={Friend} alt={"Friend"} style={{width:450, height:370}}/>
          </div>

            <div className = "add-padding text-2 left-padding">
            <div className="text-header text-bold text-2 top-padding">
              <div className = "text-large">
                <p>Planning with your Best Buds: Do's & Don'ts</p>
                </div>
                <div className ="text-medium">
                <p>
                  <b>Whether it's graduating together or road tripping, having your best friends
                    with you is great...until it's not.</b>
                </p>
                </div>
                </div>


            <p>
              You support your friends and your friends support you but sometimes ideas do not align...and that's okay!
              Here are some tips that we recommend reading in order for you and your friends to successfully complete a joined BucketList.
            </p>

            <p>
            <b>Rule 1:</b> Talk openly about your ideas and plans. Even though everyone is excited for <i>the roadtrip</i>
            that doesn't mean everyone has the same <i>idea</i> of what the roadtrip will be like. Make sure everyone has layed out
            their expectations....then make a <b>Bucket</b> for it!
            </p>
            <p>
            <b>Rule 2:</b> Alone time is essential! "Why would I need alone time if I love travelling with my friends?"
            Even if you love your bestie like no other....you'll still need time to breathe and be alone. Talk about how you guys
            want to use your alone time .. solo adventuring...reading..napping. We guarantee this will refresh your attitudes!
            </p>
            <p>Check out more tips we love here: <a href="https://www.lonelyplanet.com/travel-tips-and-articles/lonely-planets-travel-money-essentials/40625c8c-8a11-5710-a052-1479d277e6a0">5 Ways to Stay Sane when Planning a Trip with Friends</a></p>
          </div>

            </div>

          </div>
        </form>
      </div>

    );
  }
}

export default PopularBuckets;
