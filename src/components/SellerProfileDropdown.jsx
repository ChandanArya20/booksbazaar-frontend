import '../css/user_profile_dropdown.css';
import { FaUser, FaEdit, FaInbox, FaCog, FaQuestion, FaSignOutAlt } from 'react-icons/fa';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContex';
import { doSellerLogout, getCurrentSellerDetails } from '../Auth/sellerLoginFunc';

const SellerProfileDropdown = ({ showMenu, setShowMenu }) => {
  // Context and State
  const sellerData=getCurrentSellerDetails()
  const navigate = useNavigate();

  // Handle seller logout
  const logoutHandler=()=>{
    doSellerLogout(()=>{
      navigate('/')
    })
  }

  const closeProfileMenu = (e) => {
    e.stopPropagation();
    setShowMenu(false);
  };

  return (
    <>
      <div className="menu-container"  onClick={closeProfileMenu}></div>
      <div className={`dropdown-menu ${showMenu ? 'visible' : 'hidden'}`} id='menu-container-seller'>    
      <h3> {sellerData?.name} <br/> <span> {sellerData?.sellerId }</span> </h3>       
      <ul>
        <DropdownItem icon={<FaUser />} text={"My Profile"} />
        <DropdownItem icon={<FaEdit />} text={"Edit Profile"} />
        <DropdownItem icon={<FaInbox />} text={"Inbox"} />
        <DropdownItem icon={<FaCog />} text={"Settings"} />
        <DropdownItem icon={<FaQuestion />} text={"Helps"} />
        <DropdownItem icon={<FaSignOutAlt />} text={"Logout"} onClick={logoutHandler} />
      </ul>
      </div>
    </>
  );
};

const DropdownItem = (props) => {
  return (
    <li className="dropdownItem" onClick={props.onClick}>
      <div className="dropdown-icon">
        {props.icon}
      </div>
      <a> {props.text} </a>
    </li>
  );
};

export default SellerProfileDropdown;
