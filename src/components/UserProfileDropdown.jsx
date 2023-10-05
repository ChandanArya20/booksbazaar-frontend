import '../css/user_profile_dropdown.css';
import { FaUser, FaEdit, FaInbox, FaCog, FaQuestion, FaSignOutAlt } from 'react-icons/fa';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContex';

const UserProfileDropdown = ({ showMenu, setShowMenu }) => {

    // Context and State
    const { getCurrentUserDetails, logoutUser } = useContext(UserContext);
    const userData = getCurrentUserDetails();
    const navigate = useNavigate();

    // Handle user logout
    const logoutHandler = () => {
        logoutUser(() => {
            setShowMenu(false);
            navigate("/");
        });
    };

    const closeProfileMenu = (e) => {
        e.stopPropagation();
        setShowMenu(false);
    };

	
    return (
        <>
            <div className="menu-container" onClick={closeProfileMenu}></div>
            <div className={`dropdown-menu ${showMenu ? "visible" : "hidden"}`}>
                <h3>
                    {" "}
                    {userData?.name} <br />{" "}
                    <span> {userData?.email || userData?.phone}</span>{" "}
                </h3>
                <ul>
                    <DropdownItem icon={<FaUser />} text={"My Profile"} />
                    <DropdownItem icon={<FaEdit />} text={"Edit Profile"} />
                    <DropdownItem icon={<FaInbox />} text={"Inbox"} />
                    <DropdownItem icon={<FaCog />} text={"Settings"} />
                    <DropdownItem icon={<FaQuestion />} text={"Helps"} />
                    <DropdownItem
                        icon={<FaSignOutAlt />}
                        text={"Logout"}
                        onClick={logoutHandler}
                    />
                </ul>
            </div>
        </>
    );
};

const DropdownItem = (props) => {
    return (
        <li className="dropdownItem" onClick={props.onClick}>
            <div className="dropdown-icon">{props.icon}</div>
            <a> {props.text} </a>
        </li>
    );
};

export default UserProfileDropdown;
