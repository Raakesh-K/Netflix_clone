import React, { useState } from 'react';
import '../styles/navbar.scss';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../context/Temp";



export const Navbar = () => {
  const { logout } = useContext(AuthContext);

  const [isScrolled, setScrolled] = useState(false);

  window.onscroll = () => {
    setScrolled(window.pageYOffset === 0 ? false : true);
    console.log(isScrolled)
  };
  



  return (
    <div className={isScrolled ? "navbar scrolled":"navbar"}>
      <div className="container">
        <div className="left">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/512px-Netflix_2015_logo.svg.png" 
            alt="Netflix Logo" 
          />
       <Link to='/' className='link'><span>Home</span></Link>
         <Link to='/series' className='link'><span>Series</span></Link>
         <Link to='/movies' className='link'><span>Movies</span></Link>
          <span>New and Popular</span>
         <span>My List</span>
        </div>

        <div className="right">
          <SearchIcon className='icon' />
          <span>KID</span>
          <NotificationsIcon className='icon' />
          
          <img 
            src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
            alt="profile"
          />

          <div className="profile">
            <ArrowDropDownIcon className="icon" />
            <div className="options">
              <span>Settings</span>
             <span onClick={logout}>Logout</span>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
