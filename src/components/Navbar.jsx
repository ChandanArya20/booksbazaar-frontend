import '../css//navbar.css';
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsCartPlusFill as CartIcon } from 'react-icons/bs';
import { FaUser as ProfileIcon } from 'react-icons/fa';
import { AiOutlineClose as CloseIcon } from 'react-icons/ai';
import { IoMenuOutline as MenuIcon } from 'react-icons/io5';
import bookapplogo from '../Images/bookapplogo.png';
import SearchBox from './SearchBox';
import { isLoggedin } from '../Auth/loginFunc';
import { isSellerLoggedin } from '../Auth/sellerLoginFunc';
import UserProfileDropdown from './UserProfileDropdown';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContex';
import '../css/back_button.css';
import {BiArrowBack as BackArrow} from 'react-icons/bi';


const Navbar = ({backButton,searchQuery}) => {

    // Context and State
    const { cartQuantity } = useContext(CartContext);
    const { currentUser, isUserLoggedin } = useContext(UserContext);
    const [login, setLogin] = useState(isUserLoggedin());
    const selleLogin = isSellerLoggedin();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [activeNavMenu, setActiveNavMenu]=useState(false);

    // Update login state when currentUser changes
    useEffect(() => {
        setLogin(isLoggedin());
    }, [currentUser]);

    // Click Handlers:-------->
    const cartClickHandler = () => {
        if (login) {
            navigate('/cart');
        } else {
            navigate('/userPhoneLogin');
        }
    };

    const myOrderClickHandler = () => {
        if (login) {
            navigate('/userOrders');
        } else {
            navigate('/userPhoneLogin');
        }
    };

    const becomeSellerClickHandler = () => {
        if (selleLogin) {
            navigate('/sellerDashboard');
        } else {
            navigate('/sellerLogin');
        }
    };

    const toggleNavMenuBtn=()=>{
      setActiveNavMenu(!activeNavMenu);
    }

    const closeActiveNavMenu=()=>{
      setActiveNavMenu(!activeNavMenu);

    }

    const goBack=()=>{
      navigate(-1);
   }

   


    return (
      <>
      <nav>
        <div className={`nav-left-content ${activeNavMenu ? 'activeMenu' : ''}`}>
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
            <li onClick={becomeSellerClickHandler} >
              {selleLogin ? <Link to="" id='seller'>Seller Dashboard</Link> : <Link to="" id='seller'>Login as seller</Link>}
            </li>
          </ul>
        </div>
        <div className="nav-right-content">
          {
            backButton ? <BackArrow className='icon' id='navbar-menu' onClick={goBack}/>:
            (<div>
                {!activeNavMenu && <MenuIcon id='navbar-menu' className='icon' onClick={toggleNavMenuBtn}/>}
                {activeNavMenu && <CloseIcon id='navbar-menu' className='icon' onClick={closeActiveNavMenu}/>}
             </div>
            )
          }
          <SearchBox className='icon' searchQuery={searchQuery}/>
          <div className={isLoggedin()? 'icons':'icons down-gap'}>
            <div className="cart-icon">
              <CartIcon className="icon" onClick={cartClickHandler} />
              {cartQuantity > 0 && <p className='cart-quantity'><span>{cartQuantity}</span></p>}
            </div>
            <div className="profile-icon">
              {isLoggedin() ? <ProfileIcon className='icon' onClick={() => setShowMenu(true)} /> :
                <Link to="/userPhoneLogin">
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
