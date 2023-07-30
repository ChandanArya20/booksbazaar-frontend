import '../css/navbar.css';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsCartPlusFill as CartIcon } from 'react-icons/bs';
import { FaUser as ProfileIcon } from 'react-icons/fa';
import bookapplogo from '../Images/bookapplogo.png';
import SearchBox from './SearchBox';
import { isLoggedin } from '../Auth/loginFunc';
import { isSellerLoggedin } from '../Auth/sellerLoginFunc';
import Dropdown from './Dropdown';
import { CartContext } from '../context/CartContext';

const Navbar = () => {

  const {cartQuantity}=useContext(CartContext)
  const login = isLoggedin();
  const selleLogin = isSellerLoggedin();
  const navigate = useNavigate();

  const cartClickHandler = () => {
    if (login) navigate('/cart');
    else navigate('/phoneLogin');
  };

  const myOrderClickHandler = () => {
    if (login) {
      navigate('/comingFeature');
    } else navigate('/phoneLogin');
  };

  const becomeSellerClickHandler = () => {
    if (selleLogin) {
      navigate('/sellerDashboard');
    } else navigate('/sellerLogin');
  };

  return (
    <>
      <nav>
        <div className="nav_left_content">
          <div className="book-app-logo">
            <img src={bookapplogo} alt="BookApp Logo" />
          </div>
          <ul>
            <li onClick={myOrderClickHandler}>
              <Link to="">Admin</Link>
            </li>
            <li onClick={myOrderClickHandler}>
              <Link to="">My Orders</Link>
            </li>
            <li>
            <Link to="">Services</Link>
            </li>
            <li onClick={becomeSellerClickHandler}>
              {selleLogin? <Link to="">Seller Dashboard</Link> : <Link to="">Login as seller</Link>}
            </li>
          </ul>
        </div>
        <div className="nav-right-content">
          <SearchBox />
          <div className="icons">
            <div className="cart-icon">
              <CartIcon className="icon" onClick={cartClickHandler} />
              {cartQuantity>0 && isLoggedin()? <p>{cartQuantity}</p>:''}
            </div>
            <div className="profile-icon">
              {isLoggedin() ? <Dropdown /> : 
                <Link to="/phonelogin">
                  <button className="login-button">Login</button>
                </Link>
              }
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
