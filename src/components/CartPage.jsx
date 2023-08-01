import '../css/cart_page.css';
import React, { useContext, useEffect, useState } from 'react';
import CartItem from './CartItem';
import {  toast } from 'react-toastify';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { getCurrentUserDetails } from '../Auth/loginFunc';

const CartPage = () => {
  const {cart, setCart, totalCartPrice,cartQuantity, deleteCartItems } = useContext(CartContext);
  const navigate=useNavigate()

  const handlePlaceOrder=async()=>{

    const orderData=cart.map(item=>{
      return {book:item.book, quantity:item.quantity,user:getCurrentUserDetails()}
    })
          
    try {
        const response=await fetch(`http://localhost:8080/api/order/placeOrder`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData)
        });
        if(response.ok){
          deleteCartItems(cart)
          setCart([])
          navigate("/orderSuccessPage")
        }
        else{
          toast.error("Placing order failed..., try again later", {
            position: 'top-center',
            theme: 'dark'
          })
        }

      console.log("Cart item quantity updated on the server!");
      } catch (error) {
        console.error(error)
        const errorObj={  errorMessage : error.message }
        navigate('/errorPage', {state:errorObj })
      }
    }



  return (
    <>
    <Navbar/>
    {
      cartQuantity===0?<div className="empty-cart">
        <h1 className='empty-cart-heading'>Cart is Empty...</h1>
        <button className='empty-cart-btn' onClick={()=>navigate('/')}>Continue Shopping</button>
        </div> :
    
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      <div className="cart-items-container">
        <div className="cart-items">
          {cart.map((item,index) => (
            <CartItem key={index} cartItem={item} />
          ))}
        </div>
      </div>
      <div className="order-details">
        <div className="total-amount">
          Total: ₹ {totalCartPrice.toFixed(2)}
        </div>
        <button className="purchase-btn" onClick={handlePlaceOrder}>Place order</button>
      </div>
    </div>
    }
    </>
  )
}

export default CartPage
