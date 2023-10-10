import React from 'react';
import '../App.css';
import { Button } from './Button';
import background from '../images/moutain.jpg';
import './HeroSection.css';
import SearchBar from './SearchBar';
import trailsData from '../AllTrails data.json';
function HeroSection() {
  return (
    <div className='hero-container'>
      {/* <video src='../videos/video-1.mp4' autoPlay loop muted /> */}
      <img src={background} alt="backrgoundgraph"/>
      <h1>TRAIL AWAITS</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        {/* <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          WATCH TRAILER <i className='far fa-play-circle' />
        </Button> */}
         {/* <div class = "main Search" > */}
            <SearchBar placeholder="Search the trail" data={trailsData}/>
              {/* </div>
              <div class = "state search">
              <SearchBar placeholder="Search by state" data={statesData}/>
              </div> */}
      </div>
    </div>
  );
}

export default HeroSection;