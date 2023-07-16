import '../css/navbar.css';
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsCartPlusFill as CartIcon } from 'react-icons/bs';
import { FaUser as ProfileIcon } from 'react-icons/fa';
import bookapplogo from '../Images/bookapplogo.png';
import SearchBox from './SearchBox';
import { isLoggedin, getCurrentUserDetails } from '../Auth/loginFunc';
import Dropdown from './Dropdown';

const Navbar = () => {

  const login=isLoggedin()
  const navigate=useNavigate();

  const cartClickHandler=()=>{
    if(login)
        navigate("/cart")
    else
      navigate("/phoneLogin")
  }

  const featureName={
    feature:'Order management feature'
  }
  const myOrderClickHandler=()=>{
    if(login){
      navigate("/comingFeature")
    }
    else
      navigate("/phoneLogin")
  }

  return (
    <>
    <nav>
      <div className="nav_left_content">
        <div className="book-app-logo">
          <img src={bookapplogo} alt="BookApp Logo" />
        </div>
        <ul>
          <li onClick={myOrderClickHandler}>
            <a href="">Admin</a>
          </li>
          <li onClick={myOrderClickHandler}>
            <a href="">My Orders</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li onClick={myOrderClickHandler}>
            <a href="">Become a seller</a>
          </li>
        </ul>
      </div>
      <div className="nav-right-content">
        <SearchBox/>
        <div className="icons">
          <div className="cart-icon">          
            <CartIcon className="icon" onClick={cartClickHandler}/>           
          </div>
          <div className="profile-icon">
            {isLoggedin() && <Dropdown/>}       
            {!isLoggedin() && (
              <Link to="/phonelogin">
                <button className="login-button">Login</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
       
        </>
  );
};

export default Navbar;
