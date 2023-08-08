import '../css/cart_page.css';
import React, { useContext, useEffect, useState } from 'react';
import CartItem from './CartItem';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { getCurrentUserDetails } from '../Auth/loginFunc';
import {getWholeUserData } from '../Auth/helper';
import {toast } from 'react-toastify';

const CartPage = () => {

  const {cart, setCart, totalCartPrice,cartQuantity, deleteCartItems, placeOrder } = useContext(CartContext);
  const navigate=useNavigate()

  const handlePlaceOrder=async()=>{

      const user=await getWholeUserData()
      const orderAddress=user.address

      if(orderAddress.length!==0){

        if(orderAddress.length===1){
          const orderData=cart.map(item=>{
          return {book:item.book, quantity:item.quantity,deliveryAddress: orderAddress[0], user:user}
          })
          const status = await placeOrder(orderData) 

          if(status===true){
            navigate("/orderSuccessPage")
          }else{
            toast.error("Placing order failed..., try again later", {
              position: 'top-center',
              theme: 'dark'
            })
          }
        }else{       
          navigate("/addressSelectorPage", {state:user})
        }
    } else{
      navigate("/addressFormPage", {state:user})
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
