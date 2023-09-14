import '../css/login_page.css';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doSellerLogin } from '../Auth/sellerLoginFunc';
import ClipLoader  from "react-spinners/ClipLoader";

const SellerPasswordCreationPage = () => {
  
  const navigate = useNavigate();
  const stateLocation = useLocation();
  const [loading, setLoading]=useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {

    const { name, location, phone, email } = stateLocation.state;
    const { sellerId, password1, password2 } = data;

    if (password1 !== password2) {
      toast.error('Passwords do not match', {
        position: 'top-center',
        theme: 'dark'
      });
      return;
    }

    try {
      setLoading(true);
      const requestdata=phone.length !== 0 ? { name, phone, email,location, sellerId, password: password1 } : 
                                             { name, email,location, sellerId, password: password1 };         

        const response= await fetch('http://localhost:8080/api/seller/register',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(requestdata)
      })

      if (response.ok) {
          const sellerData = await response.json()
          doSellerLogin(sellerData,()=>{
          navigate("/sellerDashboard")
        })
        setLoading(false);
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
      setLoading(false);
    } catch (error) {
      console.error(error)
      const errorObj={  errorMessage : error.message }
      navigate('/errorPage', {state:errorObj })
    }
  }

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="login-page-container">
      <div className="login-page" id="password-page">
        <h1>Create a password</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Create a seller id"
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
            placeholder="Create a password"
            {...register('password1', {
              required: 'First create a password',
              pattern: {
                value: /^(?!.*\s).*$/,
                message: 'Space is not allowed'
              },
              minLength: {
                value: 8,
                message: 'Password should not be less than 8'
              },
              maxLength: {
                value: 15,
                message: 'Password should not be greater than 15'
              }
            })}
          />
          <p className="error-message">{errors.password1?.message}</p>

          <input
            type="password"
            placeholder="Re-enter password"
            {...register('password2', {
              required: 'Re-enter password',
              pattern: {
                value: /^(?!.*\s).*$/,
                message: 'Space is not allowed'
              },
              minLength: {
                value: 8,
                message: 'Password should not be less than 8'
              },
              maxLength: {
                value: 15,
                message: 'Password should not be greater than 15'
              }
            })}
          />
          <p className="error-message">{errors.password2?.message}</p>

          <button type="submit" className="login-button" disabled={loading ? true: false}>
          { loading ? 'Waiting...' : 'Register'}
          {loading && <div className="loading-overlay-btn">
                          <ClipLoader color="#620c88" />
                      </div>
          }
          </button>
        </form>
        <p className="create-account-link">
          <Link onClick={goBack}>Go Back</Link>
        </p>
      </div>
    </div>
  )
}
export default SellerPasswordCreationPage;
