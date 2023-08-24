import '../css/navbar.css';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsCartPlusFill as CartIcon } from 'react-icons/bs';
import { FaUser as ProfileIcon } from 'react-icons/fa';
import { FaSearch as SearchIcon} from 'react-icons/fa';
import { AiOutlineClose as CloseIcon } from 'react-icons/ai';
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
    const [showSearchBox, setShowSearchBox]=useState(false)

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
            navigate('/userOrderPage');
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
        console.log("Shyam");
        setShowMenu(false);
    };

    const toggleSearchBox = () => {
      setShowSearchBox(!showSearchBox);
    };

    const closeSearchBox=()=>{

    }


    return (
      <>
      <nav>
        <div className="nav_left_content">
          <div className="book-app-logo">
            <img src={bookapplogo} alt="BookApp Logo" />
          </div>
          <ul>
            <li >
              <Link to="/comingFeature">Admin</Link>
            </li>
            <li onClick={myOrderClickHandler}>
              <Link to="">My Orders</Link>
            </li>
            <li onClick={becomeSellerClickHandler}>
              {selleLogin ? <Link to="">Seller Dashboard</Link> : <Link to="">Login as seller</Link>}
            </li>
          </ul>
        </div>
        <div className="nav-right-content">
          <SearchBox showSearchBox={showSearchBox} toggleSearchBox={toggleSearchBox} />
          <div className="icons">
            <div className="search-icon">
              {showSearchBox ? <CloseIcon className='icon' id='close-icon' onClick={()=>toggleSearchBox()} /> : 
              <SearchIcon className='icon' onClick={()=>toggleSearchBox()}/>}
            </div>
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
            </div>
            {showMenu && <UserProfileDropdown setShowMenu={setShowMenu} showMenu={showMenu} />}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
