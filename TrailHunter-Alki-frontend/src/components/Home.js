import React from 'react';
import '../App.js';

import HeroSection from './HeroSection';
import Cards from './Cards';
import Review from './landingReview';

// import Footer from '../Footer';

function Home() {
  return (
    <>
      <HeroSection />
      <Cards/>
      <Review/>
    </>
  );
}

export default Home;