import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import angels from '../images/AngelsLanding.jpg';
import vernal from '../images/vernal.jpg';
import emerald from '../images/Emerald.jpg';
import skypond from '../images/skypond.jpg';
import dedicate from '../images/dedicate.jpg';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these Top-rated Trails!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src={angels}
              text='Angels Landing Trail(Springdale,UT)'
              label='Adventure'
              path='/trails'
            />
            <CardItem
              src={vernal}
              text='Vernal and Nevada Falls via the Mist Trail(Yosemite Valley,CA)'
              label='Luxury'
              path='/trails'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src={emerald}
              text='Emerald Lake Trail(Estes Park,CO)'
              label='Mystery'
              path='/trails'
            />
            <CardItem
              src={skypond}
              text='Sky Pond via Glacier Gorge Trail(Estes Park,CO)'
              label='Adventure'
              path='/trails'
            />
            <CardItem
              src={dedicate}
              text='Delicate Arch Trail(Moab,UT)'
              label='Adrenaline'
              path='/trails'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;