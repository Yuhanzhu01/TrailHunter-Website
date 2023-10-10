import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import './Profile.css';
import background from '../images/moutain.jpg';
import cardPic from '../images/img-3.jpg';
import LoginBackGround from '../images/img-4.jpg';

const customStyle = {
  
    
    display: 'flex',  justifyContent:'center', alignItems:'center', height: '40vh',width: '60vh', margin: '200px auto',
    backgroundImage: `url(${LoginBackGround})`,color:'white',fontSize: '20px'
  
}




function Profile() {
    const [ user, setUser ] = useState([]);
    const clientId = '856777731387-lhro6nfsjmh838rofbfqhpj35os3qvdr.apps.googleusercontent.com';
    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });


    const onSuccess = (res) => {
        setUser(res.profileObj);
    };

    const onFailure = (err) => {
        console.log('failed', err);
    };

    const logOut = () => {
        setUser(null);
    };

    return (
        <div className='pro'>
            <img src={background} alt="backrgoundgraph"/>
            <h2>React Google Login</h2>
            <br />
            <br />
            {user ? (
                <div className='card'>
                    <img src={cardPic} alt="user image" />
                    <h1>User Logged in</h1>
                    <br />
                    <br />
                    <h1>Name: {user.name}</h1>
                    <br />
                    <h1>Email Address: {user.email}</h1>
                    <br />
                    <br />
                    <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
                </div>
            ) : (
                <GoogleLogin 
                    clientId={clientId}
                    // buttonText="Sign in with Google"
                    render={renderProps => (
                        <button onClick={renderProps.onClick} style={customStyle}>Click this Google Login button</button>
                    )}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            )}
        </div>
    );
}
export default Profile;