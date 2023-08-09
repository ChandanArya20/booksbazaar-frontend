import {toast} from 'react-toastify'
import '../css/seller_book_item.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SellerBookItem = ({ bookData }) => {

  const[book, setBook]=useState(bookData)
  console.log(book);
  const navigate=useNavigate()

  const updateBookData=()=>{
      navigate("/bookUpdateSellerPage", { state: book })
  }

  const productDetailsHandler=()=>{
    navigate("/productDetailsPage", { state: book })
  }

  const changeStatus=async()=>{
    try {
      const initialStatus=book.status
      const response=await fetch(`http://localhost:8080/api/book/${book.id}/changeStatus/`, {
        method:"PATCH"
      })
      if(response.ok){
        const message= await response.text()
        toast.success(message, {
          position: 'top-center',
          theme: 'dark'
        });
        setBook({...book, status:!initialStatus})
      }
      
    } catch (error) {
      console.error(error)
      const errorObj={  errorMessage : error.message }
      navigate('/errorPage', {state:errorObj })
    }
  }

  return (
    
    <div className="seller-book-card">    

      <img src={book.imageURL} alt={book.title} className="book-image"/>
      <div className="book-details">
        <h6 className="book-title">{book.title}</h6>
        <div className='book-details-info' >
            <p className="book-author">By {book.author}</p>
            <p className="book-price">₹{book.price}</p>
            <p className="book-stock">Stock: {book.stockAvailability}</p>
        </div>
        <div className='book-details-button'>
            <button className='update-btn uppper-btn' onClick={updateBookData}>Update</button>
            <button className='update-btn'  onClick={changeStatus}         
              id={book.status ? 'deactivate-btn' : 'activate-btn'}
            >{book.status?'Deactivate':'Activate'}</button>
            <button onClick={productDetailsHandler}>See as User</button>
        </div>
      </div>
    </div>
  );
};

export default SellerBookItem;
