import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CartContextProvider from './context/CartContext';
import { ToastContainer } from 'react-toastify';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartContextProvider>
    <App/>
    <ToastContainer />
  </CartContextProvider>
);
