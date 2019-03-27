//Various react components
import React, { Component } from 'react';
import Carousel from 'nuka-carousel';

//Project components
import PublicBar from './PublicBar.js'

//Images
import CarouselImage1 from './images/slide1.png';
import CarouselImage2 from './images/slide2.png';
import CarouselImage3 from './images/slide3.png';
import BucketKick from './images/kick2.png';
import BucketIdea from './images/bucket.png';

class LandingPage extends Component {
  componentWillMount(){
    console.log("Landing page");
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 200);
  }

  render() {
    return(
      <div>
      
        <PublicBar/>
        <Carousel>
          <img src={CarouselImage1} alt={"Carousel 1"} />
          <img src={CarouselImage2} alt={"Carousel 2"} />
          <img src={CarouselImage3} alt={"Carousel 3"} />
        </Carousel>

        <div className="float-left">
        <div className="float-left mg-sm move-down">
          <img src={BucketKick} alt={"Bucket Kick"} />
        </div>
          <div className="text-container text-bold text-medium mg-sm font-colour">
          <div className="text-large text-header text-bold">
            <p>OUR MISSION</p>
          </div>
            <p>
              Our mission is to help others complete their life-long dream in the most fulfilling way...with others!
              <i> Kick the Bucket </i> enables you to kick off your dreams with fully customizable bucketlists.
              Whether your bucketlists are private, or you choose to share them with the world, we are here to help you achieve your dreams.
            </p>
          </div>
        </div>

          <div className="float-right">
          <div className="float-right mg-sm">
            <img src={BucketIdea} alt={"Bucket Idea"} />
          </div>
          <div className="text-container text-bold text-medium mg-sm font-colour">
          <div className="text-large text-header text-bold">
            <p>HOW YOU CAN ACHIEVE IT</p>
          </div>
            <p>
            We offer you the tools to help you stay on track when it comes to completing your dreams.
            Follow the most popular buckets....and get ideas.
            Watch your achievement bar increase as you tick off items.
            Join your friends and make a group bucket....or follow theirs.
            Find the perfect recommended location or activity to add to your bucket.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
