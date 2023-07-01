import { BsCartPlusFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import bookapplogo from "../Images/bookapplogo.png";
import SearchBox from "./SearchBox";

const Navbar=()=>{
    return (
        <nav>          
          <div className="book-app-logo">
            <img src={bookapplogo} alt="BookApp Logo" />
          </div>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
          <div className="nav-right-content">
            <SearchBox></SearchBox>
            <div className="icons">
              <div className="cart-icon">
                <BsCartPlusFill className="icon"></BsCartPlusFill>
                {/* <p>cart</p> */}
              </div>
              <div className="profile-icon">
                <FaUser className="icon"></FaUser>
                {/* <p>profile</p> */}
              </div>              
            </div>
              <button className="login-button">Login</button>
          </div>
        </nav>
    )
}

export default Navbar;