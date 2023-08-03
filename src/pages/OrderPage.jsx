import '../css/order_page.css'
import OrderItem from '../components/OrderItem';
import { getCurrentUserDetails } from '../Auth/loginFunc';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

const OrderPage = () => {

    const [orders, setOrders]=useState()
    const navigate=useNavigate()
  
    const fetchAllOrders=async ()=>{
        const userId=getCurrentUserDetails().id

        try {    
            const response=await fetch(`http://localhost:8080/api/order//user/${userId}/allOrders`)
        
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
    <div className="order-page">
      <h2>All Orders</h2>
      <div className="order-list">
        {orders?.map(order => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
