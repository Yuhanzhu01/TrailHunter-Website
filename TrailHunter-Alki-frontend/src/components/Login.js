import React from "react";
import { useGoogleLogin, GoogleLogin} from 'react-google-login';
import { withTheme } from "styled-components";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;


function Login({setUser}){


    const onSuccess = (res)=>{
        console.log('Login Success: currentUser:', res.profileObj);
        setUser(res.profileObj)
    };

    const onFailure = (res) =>{
        console.log('Login failed: res:',res);
    }


    useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
    });


    const customStyle = {
        color:"#fff",
        // Background:""
        background: "linear-gradient(90deg, rgb(28, 27, 27) 0%, rgb(26, 23, 23) 100%)",
        marginTop: "1.5rem",
        fontFamily: 'PT Sans', 
        fontSize: "19.2px",
        
        // padding: 0.5rem 1rem,
        
    }



    return(
        <div>
        <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            render={renderProps => (
                <button onClick={renderProps.onClick} style={customStyle}>Login</button>
            )}

            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
        </div>
    );
}


export default Login;