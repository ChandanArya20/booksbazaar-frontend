import '../css/user_profile_dropdown.css';
import user from '../Images/user.png';
import edit from '../Images/edit.png';
import inbox from '../Images/envelope.png';
import settings from '../Images/settings.png';
import help from '../Images/question.png';
import logout from '../Images/log-out.png';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContex';

const UserProfileDropdown = ({ closeProfileMenu, showMenu }) => {
  
    // Context and State
    const { getCurrentUserDetails, logoutUser } = useContext(UserContext);
    const userData = getCurrentUserDetails();
    const navigate = useNavigate();

    // Handle user logout
    const logoutHandler = () => {
        logoutUser(() => {
            navigate('/');
        });
    };

    return (
      <>
      <div className="menu-container" onClick={closeProfileMenu}></div>
        <div className={`dropdown-menu ${showMenu ? 'visible' : 'hidden'}`}>
          <h3>
            {userData.name}
            <br />
            <span> {userData?.email || userData?.phone}</span>
          </h3>
          <ul>
            <DropdownItem img={user} text={"My Profile"} />
            <DropdownItem img={edit} text={"Edit Profile"} />
            <DropdownItem img={inbox} text={"Inbox"} />
            <DropdownItem img={settings} text={"Settings"} />
            <DropdownItem img={help} text={"Helps"} />
            <DropdownItem img={logout} text={"Logout"} onClick={logoutHandler} />
          </ul>    
      </div>
      </>
    );
};

const DropdownItem = (props) => {
    return (
      <li className="dropdownItem" onClick={props.onClick}>
        <img src={props.img} alt={props.text} />
        <a> {props.text} </a>
      </li>
    );
};

export default UserProfileDropdown;
