import '../css/seller_dashboard.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardDropdown from './DashboardDropdown';
import Navbar from './Navbar';

const SellerDashboard = () => {

  const navigate=useNavigate()

  const sellBookButtonHandler=()=>{
    navigate("/booksellerPage")
  }
  
  return (
    <>
    <Navbar/>
    <div className="seller-dashboard">
      <h2>Welcome, Book Seller!</h2>

      <div className="dashboard-main">
        <Link to="/">Go to Home</Link>
        <button onClick={sellBookButtonHandler}>Sell a New Book </button>
        <div className="profile-icon seller-profile-icon">
          <DashboardDropdown/>
        </div>
      </div>

      <div className="published-books">
        <h3>Published Books</h3>
      </div>
    </div>
    </>
  )
}

export default SellerDashboard;
