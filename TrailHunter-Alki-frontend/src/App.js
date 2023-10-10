import Navbar from "./components/Navbar";
import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import { Routes ,Route } from 'react-router-dom';
import background from "./images/moutain.jpg";
import './App.css';

import Home from './components/Home';
import angels from "./images/AngelsLanding.jpg";

// add by Yuhan Dec09
import { useState, useEffect, useCallback } from 'react';
// add by Yuhan  Dec13 
import Profile from "./components/Profile.js";


import "bootstrap/dist/css/bootstrap.min.css";
import Trail from "./components/Trail";
import TrailsList from "./components/TrailsList.js";
import AddReview from "./components/AddReview.js";
import WishlistDataService from './services/wishlists';
import WishList from './components/WishList';



function App() {

  const [user, setUser] = useState(null);
  const [wishlists, setWishlists] = useState([]);
  const [doSaveWishes, setDoSaveWishes] = useState(false);

  const myStyle={
    backgroundImage: `url(${background})`,
    height:'100vh',
    marginTop:'-70px',
    fontSize:'50px',
    backgroundSize: 'cover',
    // backgroundRepeat: 'no-repeat',
  };

  // Added by Sifan 12/13
  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));
    if (loginData) {
      let loginExp = loginData.exp;
      let now = Date.now()/1000;
      if (now < loginExp) {
        // Not expired
        setUser(loginData);
      } else {
        // Expired
        localStorage.setItem("login", null);
      }
    }
  }, []);

  const retrieveWishlists = useCallback(() => {
    console.log("retrieve wishlists");
    WishlistDataService.get(user.googleId)
    .then(res => {
      setWishlists(res.data.wishlists);
    })
    .catch(e => {
      console.log(e);
    });
  }, [user]);
  
  const saveWishlists = useCallback(() => {
    var data = {
      _id: user.googleId,
      wishlists: wishlists
    }
  
    WishlistDataService.updateWishList(data)
    .catch(e => {
      console.log(e);
    })
  }, [wishlists, user]);
  
  
  useEffect(() => {
    if (user && doSaveWishes) {
      saveWishlists();
      setDoSaveWishes(false);
      localStorage.setItem("wishTrail", JSON.stringify(wishlists));   
    }
  // }, [doSaveFavs])
  }, [user, wishlists, saveWishlists, doSaveWishes]);
  
  useEffect(() => {
    if (user) {
      retrieveWishlists();
    }
  }, [user, retrieveWishlists]);
  
  const addWishlist = (trailId) => {
    setDoSaveWishes(true);
    setWishlists([...wishlists, trailId])
  }
  
  const deleteWishlist = (trailId) => {
    setDoSaveWishes(true);
    setWishlists(wishlists.filter(f => f !== trailId));
  }

  return (
    <>
    <Router>
      <Navbar user = {user} setUser = {setUser}/>
      <Routes>
        <Route exact path="/" element={<Home />}/> 
        
        <Route 
                        exact 
                        path={"/trails"} 
                        element={
                            <TrailsList 
                                user={ user }
                                addWishlist={ addWishlist }
                                deleteWishlist={ deleteWishlist }
                                wishlists={ wishlists }
                            />}
                    />
        <Route 
                        path={"/trails/id/:id/"} 
                        element={
                            <Trail 
                                user={ user } 
                            />
                        } 
                    />

        <Route 
                        path={"/trails/:id/review"} 
                        element={
                            <AddReview 
                                user={ user } 
                            />
                        }
                    />
        <Route exact path={"/wishlist"} element={
          user?
          <WishList 
            user={ user }
            setWishlists={ setWishlists }
            wishlists={ wishlists }
            setDoSaveWishes= { setDoSaveWishes }
            deleteWishlist={ deleteWishlist }
          />
          :
          <TrailsList 
            user={ user }
            addWishlist={ addWishlist }
            deleteWishlist={ deleteWishlist }
            wishlists={ wishlists }/>
        }/>


        <Route 
                        exact 
                        path={"/profile"} 
                        element={
                            <Profile 
                              user={ user }
                               
                            />}
                    />

      </Routes>
    </Router>

    </>
  );
}

export default App;







