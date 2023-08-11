import '../css/navbar.css';
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsCartPlusFill as CartIcon } from 'react-icons/bs';
import { FaUser as ProfileIcon } from 'react-icons/fa';
import bookapplogo from '../Images/bookapplogo.png';
import SearchBox from './SearchBox';
import { isLoggedin } from '../Auth/loginFunc';
import { isSellerLoggedin } from '../Auth/sellerLoginFunc';
import UserProfileDropdown from './UserProfileDropdown';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContex';

const Navbar = () => {

    // Context and State
    const { cartQuantity } = useContext(CartContext);
    const { currentUser, isUserLoggedin } = useContext(UserContext);
    const [login, setLogin] = useState(isUserLoggedin());
    const selleLogin = isSellerLoggedin();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    // Update login state when currentUser changes
    useEffect(() => {
        setLogin(isLoggedin());
    }, [currentUser]);

    // Click Handlers:-------->
    const cartClickHandler = () => {
        if (login) {
            navigate('/cart');
        } else {
            navigate('/phoneLogin');
        }
    };

    const myOrderClickHandler = () => {
        if (login) {
            navigate('/orderPage');
        } else {
            navigate('/phoneLogin');
        }
    };

    const becomeSellerClickHandler = () => {
        if (selleLogin) {
            navigate('/sellerDashboard');
        } else {
            navigate('/sellerLogin');
        }
    };

    // Close profile dropdown menu
    const closeProfileMenu = () => {
        setShowMenu(false);
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
              <Link to="#services">Services</Link>
            </li>
            <li onClick={becomeSellerClickHandler}>
              {selleLogin ? <Link to="">Seller Dashboard</Link> : <Link to="">Login as seller</Link>}
            </li>
          </ul>
        </div>
        <div className="nav-right-content">
          <SearchBox />
          <div className="icons">
            <div className="cart-icon">
              <CartIcon className="icon" onClick={cartClickHandler} />
              {cartQuantity > 0 && <p className='cart-quantity'><span>{cartQuantity}</span></p>}
            </div>
            <div className="profile-icon">
              {isLoggedin() ? <ProfileIcon className='icon' onClick={() => setShowMenu(true)} /> :
                <Link to="/phonelogin">
                  <button className="login-button">Login</button>
                </Link>
              }
              {showMenu && <UserProfileDropdown closeProfileMenu={closeProfileMenu} showMenu={showMenu} />}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
