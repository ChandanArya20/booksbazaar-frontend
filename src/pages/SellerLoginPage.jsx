import '../css/login_page.css';
import React, { useState } from 'react';
import { BiHide as PassHideIcon } from "react-icons/bi";
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { doSellerLogin } from '../Auth/sellerLoginFunc';
import axios from 'axios';


const SellerLoginPage = () => {
  
  const{register ,handleSubmit, formState:{errors}} = useForm()
  const navigate = useNavigate()


  const loginSeller = async(data) => {
   
    try {
        let response= await fetch('http://localhost:8080/api/seller/login',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
      })

      if (response.ok) {
        const sellerData = await response.json()
        doSellerLogin(sellerData,()=>{
          navigate("/sellerDashboard")
        })
    
      } else if(response.status===500){
        const errorDetails=await response.json()
        throw new Error(errorDetails.status)

      } else {
        const errorMessage = await response.text()
        toast.error(errorMessage, {
          position: 'top-center',
          theme: 'dark'
        })
      }

    } catch (error) {
      console.error(error)
      const errorObj={  errorMessage : error.message }
      navigate('/errorPage', {state:errorObj })
    }
  }

  return (
    <div className="login-page-container">
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(loginSeller)}>
      <input
          type="text"
          placeholder="Seller id"
          {...register("sellerId", {
            required: "Enter Seller id",
            minLength: {
              value: 8,
              message: "Seller id should not be less than 8"
            },
            maxLength: {
              value: 15,
              message: "Seller id should not be greater than 15"
            }
          })}
        />
        <p className="error-message">{errors.sellerId?.message}</p>

        <input
          type="text"
          placeholder="Password"
          {...register("password", {
            required: "Enter password",
            minLength: {
              value: 8,
              message: "Password should not be less than 8"
            },
            maxLength: {
              value: 15,
              message: "Password should not be greater than 15"
            }
          })}
        />
        <p className="error-message">{errors.password?.message}</p>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p className="create-account-link">
        New seller? <Link to="/SellerSignup">Become a seller</Link>
      </p>
    </div>
    <ToastContainer />
    </div>
  );
};

export default SellerLoginPage;
