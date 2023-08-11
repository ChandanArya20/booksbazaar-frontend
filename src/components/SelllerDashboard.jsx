import '../css/seller_dashboard.css';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardDropdown from './DashboardDropdown';
import Navbar from './Navbar';
import SellerBookItem from './SellerBookItem';
import {toast} from 'react-toastify'
import { getCurrentSellerDetails } from '../Auth/sellerLoginFunc';

const SellerDashboard = () => {

  const navigate=useNavigate()
  const [books, setBooks] = useState([]);

  useEffect(()=>{
    fetchSellerAllBooks()
  },[])
  useEffect(()=>{
    console.log(books);
  },[books])

  const sellBookButtonHandler=()=>{
    navigate("/bookAddSellerPage")
  }
  
  const fetchSellerAllBooks=async ()=>{

    const sellerId=getCurrentSellerDetails().id
    try {

      const response=await fetch(`http://localhost:8080/api/book/seller/${sellerId}/allBook`)

      if(response.ok){
        const bookList=await response.json()
        setBooks(bookList)
      }
    
      
    } catch (error) {
      console.error(error)
      toast.error("Server is down, try again later", {
        position: 'top-center',
        theme: 'dark'
      });
    }
    
  }

  const seeAllOrders=()=>{
    navigate("/sellerOrderPage")
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
      <button onClick={seeAllOrders} id='see-all-orders-btn'>See All Orders </button>
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
    </>
  )
}

export default SellerDashboard;
