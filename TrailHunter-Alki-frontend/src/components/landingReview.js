
import React from 'react';
import './landingReview.css';
import video from '../videos/video.mp4';
import img1 from '../images/story-img-1.jpg';
import img2 from '../images/story-img-2.jpg';
function Review() {
  return (
    <div className='stories'>
      
 <div className="video-container">
   <video className="bg-video" autoPlay muted loop>
     <source src={video} type="video/mp4" />
   </video>
 </div>
 <div className="stories-wrapper">
   <div className="story-bg">
     <div className="story">
       <img src={img1} alt="Customer image" className="story-image" />
       <div className="story-text">
         <h1 className="story-heading">
           These were the best days of this year
         </h1>
         <p className="story-paragraph">
         We visited Zion National Park previously and the first 2 times we decided against hiking Angels Landing. 
         Our 3rd visit we entered the Lottery pick and was chosen to hike. It was thee most exhilarating, demanding, 
         overwhelming hike I’ve ever experienced. I’m so glad we did it and yes I’m a beginner hiker. 
         This is a must one in a lifetime experience.
         </p>
       </div>
     </div>
   </div>
   <div className="story-bg">
     <div className="story">
       <img src={img2} alt="Customer image" className="story-image" />
       <div className="story-text">
         <h1 className="story-heading">
             One of the best hikes on the Park.
         </h1>
         <p className="story-paragraph">
         One of the best, if not the most popular, trails in RMNP. It starts at the Bear Lake trailhead and is about 3.6 miles round trip. 
         It encompasses the Nymph, Dream and Emerald lakes which are all not bad (but I think Dream is the best). 
         It is a not that easy of a hike but quite doable with a total incline of about 600 feet. 
         I thought that the stretch between Dream and Emerald lakes was the toughest. 
         We hiked in mid-August in the morning but got crowded as the day wore on. 
         This hike is a must, if you are short on time.
         </p>
       </div>
     </div>
   </div>
 </div>
</div>);
}


export default Review;