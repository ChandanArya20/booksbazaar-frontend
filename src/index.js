import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CartContextProvider from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import UserContextProvider from './context/UserContex';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartContextProvider>
    <UserContextProvider>
      <App/>
      <ToastContainer />
    </UserContextProvider>
  </CartContextProvider>
);
