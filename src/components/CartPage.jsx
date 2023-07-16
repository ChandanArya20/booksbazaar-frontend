import '../css/cart_page.css';
import React, { useContext, useEffect, useState } from 'react';
import CartItem from './CartItem';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
  const {cart, totalCartPrice } = useContext(CartContext);

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      <div className="cart-items-container">
        <div className="cart-items">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
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
  );
};

export default CartPage;
