import '../css/order_page.css'
import SellerOrderItem from '../components/SellerOrderItem';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import Navbar from '../components/Navbar';
import { getCurrentSellerDetails } from '../Auth/sellerLoginFunc';


const SellerOrderPage = () => {

    const [orders, setOrders]=useState([])
    const navigate=useNavigate()
  
    const fetchAllOrders=async ()=>{
        const sellerId=getCurrentSellerDetails().id
        try {    
            const response=await fetch(`http://localhost:8080/api/order/seller/${sellerId}/allOrders`)
        
            if(response.ok){
                const orderList=await response.json()
                setOrders(orderList)
            }else{
                const errorObj={errorMessage:"Something went wrong, try later..."}
                navigate("/errorPage",{state:errorObj})
            }              
        } catch (error) {
          console.error(error)
          toast.error("Server is down, try again later", {
            position: 'top-center',
            theme: 'dark'
          });
        }
        
      }

      useEffect(()=>{
        fetchAllOrders()
      },[])
  

  return (
    <>
    {
      orders.length===0?<div className="empty-cart">
          <h1 className='empty-cart-heading'>There is no recent orders...</h1>
          <button className='empty-cart-btn' onClick={()=>navigate('/')}>Continue Shopping</button>
          </div> :
      <>
      <Navbar/> 
      <div className="order-page">
        <h2>Users Order</h2>
        <div className="order-list">
          {orders?.map(order => (
            <SellerOrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
      </>
    }
    </>
  );
};

export default SellerOrderPage;
