import '../css/cart_page.css';
import React, { useContext, useEffect, useState } from 'react';
import CartItem from './CartItem';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const CartPage = () => {
  const {cart, setCart, totalCartPrice,cartQuantity } = useContext(CartContext);
  const navigate=useNavigate()

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
        <button className="purchase-btn">Place order</button>
      </div>
    </div>
    }
    </>
  )
}

export default CartPage
