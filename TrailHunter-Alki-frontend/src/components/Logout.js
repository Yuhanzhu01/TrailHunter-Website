import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;


const customStyle = {
    color:"#fff",
    // Background:""
    background: "linear-gradient(90deg, rgb(28, 27, 27) 0%, rgb(26, 23, 23) 100%)",
    marginTop: "1.5rem",
    fontFamily: 'PT Sans', 
    fontSize: "19.2px",
    
    // padding: 0.5rem 1rem,
    
}



function Logout({ setUser }) {
  const onSuccess = () => {
    setUser(null);
    console.log('Logout made successfully');
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        render={renderProps => (
            <button onClick={renderProps.onClick} style={customStyle}>Logout</button>
        )}
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;