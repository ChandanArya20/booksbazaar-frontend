import React, { useState } from 'react';
import CartItem from './CartItem';   
import '../css/cart_page.css'
import book1 from "../Images/testbook1.jpg";
import book2 from "../Images/testbook3.jpg";
import {Scrollbars} from 'react-custom-scrollbars-2';
import { isLoggedin } from '../Auth/loginFunc';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    // Array of cart items with their details
    {
      id: 1,
      name: 'Science book',
      image: book1,
      quantity: 2,
      price: 999,
    },
    {
      id: 1,
      name: 'Romance book',
      image: book2,
      quantity: 2,
      price: 324,
    },
    {
      id: 1,
      name: 'Romance book',
      image: book2,
      quantity: 2,
      price: 324,
    },
    // {
    //   id: 1,
    //   name: 'Romance book',
    //   image: book2,
    //   quantity: 2,
    //   price: 324,
    // },
    // {
    //   id: 1,
    //   name: 'Romance book',
    //   image: book2,
    //   quantity: 2,
    //   price: 324,
    // },
    // {
    //   id: 1,
    //   name: 'Romance book',
    //   image: book2,
    //   quantity: 2,
    //   price: 324,
    // },
    // {
    //   id: 1,
    //   name: 'Romance book',
    //   image: book2,
    //   quantity: 2,
    //   price: 324,
    // },
    // Add more cart items as needed
  ]);

  const getTotalAmount = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  };

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      <div className="cart-items-container">
        <div className="cart-items">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
            ))}
        </div>
      </div>
        <div className='order-details'>
          <div className="total-amount">
            Total: ₹ {getTotalAmount()}
          </div>
          <button className="purchase-btn">Place order</button>
          </div>
      </div>
  );
};

export default CartPage;
