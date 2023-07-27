import '../css/dropdown.css'
import user from '../Images/user.png';
import edit from '../Images/edit.png';
import inbox from '../Images/envelope.png';
import settings from '../Images/settings.png';
import help from '../Images/question.png';
import logout from '../Images/log-out.png';
import { FaUser as ProfileIcon } from 'react-icons/fa';
import React, {useState, useEffect, useRef} from 'react';
import { getCurrentUserDetails, doLogout } from '../Auth/loginFunc';
import {useNavigate } from 'react-router-dom';

function Dropdown() {

  const [open, setOpen] = useState(false);
  const userData=getCurrentUserDetails()
  let menuRef = useRef();
  const navigate=useNavigate()
  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
      }      
    };
    document.addEventListener("mousedown", handler);
    return() =>{
      document.removeEventListener("mousedown", handler);
    }
  });

  const logoutHandler=()=>{
    console.log("log out");
    doLogout(()=>{
      navigate('/')
    });
  }



  return (
    <div className="App">
      <div className='menu-container' ref={menuRef}>
        <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
        <div className="profile-icon">
            <ProfileIcon className="icon" />
          </div>
        </div>

        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
          <h3>{userData.name}<br/><span> { userData?.email || userData?.phone}</span></h3>
          <ul>
            <DropdownItem img = {user} text = {"My Profile"}/>
            <DropdownItem img = {edit} text = {"Edit Profile"}/>
            <DropdownItem img = {inbox} text = {"Inbox"}/>
            <DropdownItem img = {settings} text = {"Settings"}/>
            <DropdownItem img = {help} text = {"Helps"}/>
            <DropdownItem img = {logout} text = {"Logout"} onClick={logoutHandler}/>
          </ul>
        </div>
      </div>
    </div>
  );
}

function DropdownItem(props){
  return(
    <li className = 'dropdownItem' onClick={props.onClick}>
      <img src={props.img}></img>
      <a> {props.text} </a>
    </li>
  );
}

export default Dropdown;