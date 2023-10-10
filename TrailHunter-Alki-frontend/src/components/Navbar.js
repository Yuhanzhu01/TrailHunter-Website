import React,{useState} from 'react';
import {Link} from "react-router-dom";
import homepage from "../images/trailhunter.jpg";
import {Button} from './Button';
import './Navbar.css';
import { gapi } from "gapi-script";
import Login from './Login';
import Logout from './Logout';


window.gapi.load('client:auth2', () => {
    window.gapi.client.init({
        clientId: '856777731387-b3g886724cqlqasniqkomvl3emqspm0r.apps.googleusercontent.com',
        plugin_name: "chat"
    })
});


// Modified by Sifan 12/13
function Navbar({ user, setUser }) {

    const [click,setClick] = useState(false);
    const [button,setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () =>{
        if(window.innerWidth <= 960){
            setButton(false);
        }
        else{
            setButton(true);
        }
    };

    window.addEventListener('resize',showButton);

    // const Fname = user.getFamilyName();

    // const mystyle = {
    //     // marginTop: 'px',
    //     backgroundColor: "DodgerBlue",
    //     color:"white"
    //   };


  return (

        <div>
                    
        <nav className='navbar'>


            <div className='navbar-container'>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times': 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>

                    <li className='nav-item'>
                        <Link to='/trails' className='nav-links' onClick={closeMobileMenu}>
                            All Trails
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/wishlist' className='nav-links' onClick={closeMobileMenu}>
                            WishList
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/profile' className='nav-links' onClick={closeMobileMenu}>
                            Profile
                        </Link>
                    </li>
                    <li className='nav-item'  >
                        {/* <Link to='/login' className='nav-links' onClick={closeMobileMenu}> */}
                            {user ? (
                                <Logout className='google-login' setUser={setUser} />
                                ):(
                                <Login className='google-login' setUser={setUser} />)
                                   
                                
                                    
                                    
                                    
                                // Fname={user.getFamilyName()}
                                    // console.log('Family Name: ' + user.getFamilyName()),
                                    // console.log('Image URL: ' + user.getImageUrl()),
                                    // console.log('Email: ' + user.getEmail())
                               

                                
                                
                                
                                
                                
                                
                            
                                }
                    </li>
                </ul>
            
            </div>
        </nav>
        </div>
        )
        }

export default Navbar