import { Link ,NavLink} from "react-router-dom";
import { BsCartPlusFill as CartIcon } from "react-icons/bs";
import { FaUser as ProfileIcon } from "react-icons/fa";
import bookapplogo from "../Images/bookapplogo.png";
import SearchBox from "./SearchBox";
import '../css/navbar.css'

const Navbar=()=>{
    return (
        <nav> 
            <div className="nav_left_content">
              <div className="book-app-logo">
                <img src={bookapplogo} alt="BookApp Logo" />
              </div>
              <ul>
                <li>
                  <NavLink exact to="/" activeClassName="active-link">
                    Home
                  </NavLink>
                </li>
                <li><a href="#footer">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#footer">Contact</a></li>
              </ul>              
            </div>         
            <div className="nav-right-content">
                <SearchBox></SearchBox>
                <div className="icons">
                    <div className="cart-icon">
                      <Link to="/cart">
                        <CartIcon className="icon" />
                      </Link>
                    </div>
                    <div className="profile-icon">
                      <ProfileIcon className="icon" />
                    </div>              
                </div>
                <Link to='/phonelogin'>
                  <button className="login-button">Login</button>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;