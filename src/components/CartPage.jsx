import '../css/cart_page.css';
import React, { useContext } from 'react';
import CartItem from './CartItem';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import {getWholeUserData } from '../Auth/helper';

const CartPage = () => {

    const {cart, totalCartPrice, cartQuantity} = useContext(CartContext);
    const navigate=useNavigate()

    const handlePlaceOrder=async()=>{
        const user=await getWholeUserData()
        const book=null;
        if(user.address.length!==0){
          navigate("/addressContinue", {state:{book,user}})
        } else{
          navigate("/addressFormPage", {state:{book,user}})
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
            <div className="cart-all-item">
              <h1>Shopping Carts</h1>
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
          </div>
      }
      </>
    )
}

export default CartPage
