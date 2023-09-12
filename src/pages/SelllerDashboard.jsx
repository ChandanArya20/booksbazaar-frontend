import '../css/seller_dashboard.css';
import { FaUser as ProfileIcon } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SellerProfileDropdown from './SellerProfileDropdown';
import Navbar from './Navbar';
import SellerBookItem from './SellerBookItem';
import {toast} from 'react-toastify';
import { getCurrentSellerDetails } from '../Auth/sellerLoginFunc';
import BackButton from './BackButton';

const SellerDashboard = () => {

    const navigate=useNavigate();
    const [books, setBooks] = useState([]);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(()=>{
        fetchSellerAllBooks();
    },[]);

    const sellBookButtonHandler=()=>{
        navigate("/bookAddSellerPage");
    };
  
    const fetchSellerAllBooks=async ()=>{

        const sellerId=getCurrentSellerDetails().id;
        try {
            const response=await fetch(`http://localhost:8080/api/book/seller/${sellerId}/allBook`);

            if(response.ok){
              const bookList=await response.json();
              setBooks(bookList);
            }
              
        } catch (error) {
            console.error(error);
            toast.error("Server is down, try again later", {
                position: 'top-center',
                theme: 'dark'
            });
        }
      
    }

    const seeAllOrders=()=>{
      navigate("/sellerOrderPage");
    };


    return (
      <>
      <Navbar/>
      <div className="seller-dashboard-container">
        <div className="seller-dashboard">
          <h2>Welcome, Book Seller!</h2>
          <div className="dashboard-main" id='dashboard-main-id'>
            <BackButton/>
            <button onClick={sellBookButtonHandler}>Sell a New Book </button>
            <div className="profile-icon seller-profile-icon"  onClick={() => setShowMenu(true)}>
              <ProfileIcon id='seller-profile'/>
            </div>  
            {showMenu && <SellerProfileDropdown setShowMenu={setShowMenu} showMenu={showMenu} />}    
          </div>
          <div className='see-all-orders-btn-container'>
            <button onClick={seeAllOrders} id='see-all-orders-btn'>See All Orders </button>
          </div>
          <div className="published-books">
            <h3>Published Books</h3>
          </div>
          <div className="seller-books">
            {
              books.map((book)=>{
                return(         
                    <SellerBookItem key={book.id} bookData={book}/>
                )
              })
            }     
          </div>
        </div>
      </div>
      </>
    )
}

export default SellerDashboard;
