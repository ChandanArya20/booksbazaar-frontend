import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import App from './App';
import CartPage from './components/CartPage';
import LoginWithEmailPage from './components/LoginWithEmailPage';
import LoginWithPhonePage from './components/LoginWithPhonePage';
import RegistrationPage from './components/RegistrationPage';
import PasswordCreationPage from './components/PasswordCreationPage';
import ErrorPage from './components/ErrorPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
  <Routes>
    <Route path='/' element={<App/>}/>
    <Route path='/cart' element={<CartPage/>}/>
    <Route path='/emailLogin' element={<LoginWithEmailPage/>}/>
    <Route path='/phoneLogin' element={<LoginWithPhonePage/>}/>
    <Route path='/signup' element={<RegistrationPage/>}/>
    <Route path='/passwordPage' element={<PasswordCreationPage/>}/>
    <Route path='/errorPage' element={<ErrorPage />}/>
  </Routes>
</Router>
);
