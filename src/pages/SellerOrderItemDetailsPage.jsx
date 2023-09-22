import { useLocation, useNavigate } from 'react-router-dom';
import '../css/order_item_details_page.css';
import Navbar from '../components/Navbar';
import { formatDate } from '../Helper/helper';
import AddressItem from '../components/AddressItem';
import { useState } from 'react';
import {toast} from 'react-toastify'

const SellerOrderItemDetailsPage = () => {
  
  const location = useLocation()
  const navigate=useNavigate()
  const order=location.state
  const [status, setStatus]=useState(order.status)
  console.log(order);

  const handleCancelOrder=async()=>{
    try {
      const response= await fetch(`http://localhost:8080/api/order/${order.id}?status=Cancelled`,{
        method:'PATCH',
      }) 
      if(response.ok){
        // order.status='Cancelled'
        setStatus('Cancelled')
        toast.success("Order cancelled successfully...", {
          position: 'top-center',
          theme: 'dark'
        })
      } else{
        toast.error("Order cancellation failed..., try again", {
          position: 'top-center',
          theme: 'dark'
        })
      }

    } catch (error) {
      console.error(error)
      const errorObj={  errorMessage : error.message }
      navigate('/errorPage', {state:errorObj })
    }
  }

  return (
    <>
    <Navbar backButton={true}/>
    <div className="order-item-details-container">
      <div className="order-item-image">
        <img src={order.book.imageURL} alt={order.book.title} />
      </div>
      <div className="order-item-details">
        <h1>{order.book.title}</h1>
        <p><span>By: </span>{order.book.author}</p>
        <p><span>Book id: </span>{order.book.id}</p>
        <p><span>Order Date: </span>{formatDate(order.orderDate)}</p>
        <p> <span>Quantity: </span>{order.quantity}</p>
        <p> <span>Total price: </span>₹{order.quantity*order.book.price}</p>
        <p className={order.status==='Cancelled' ? 'text-with-line-through' : ''}>
          <span>Delivery Date: </span>{formatDate(order.deliveryDate)}</p>
        <p><span>Delivery Status: </span> 
        <span 
          className='delivery-status'  
          id={'order-'+order.status+'-status'} >{status}
        </span></p>
        <h2>Shipping Address</h2>
        <div className='order-item-details-extra'>
          <AddressItem address={order.deliveryAddress} />
        </div>
      </div>
    </div>
    </>
  );
};

export default SellerOrderItemDetailsPage;
