import '../css/login_page.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { doLogin } from '../Auth/loginFunc';

const LoginWithEmailPage = () => {

  const{register, handleSubmit, formState:{errors}} = useForm()
  const navigate = useNavigate()


  const loginUser = async(data) => {       
    try {

      let response= await fetch('http://localhost:8080/api/user/login',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
      })

      if (response.ok) {
        const userData = await response.json()
        doLogin(userData,()=>{
          navigate("/")
        })
        // toast.success("Login successfull", {
        //   position: 'top-center',
        //   theme: 'dark'
        // })
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
      const errorObj={  
        errorMessage : error.message
      }
      navigate('/errorPage', {state:errorObj })
    }

  }

  return (
    <div className="login-page-container">
    <div className="login-page">
      <h1>Login</h1>
      <p className="login-with-phone-link">
          <Link to="/phoneLogin">Login with Phone</Link>
      </p>
      <form onSubmit={handleSubmit(loginUser)}>
        <input
            type="email"
            placeholder="Email"
            {...register('email',{
              required:'Email is required',
              pattern:{
                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email address!"
              },
            })}
        />
        <p className="error-message">{errors.email?.message}</p>
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
        New user? <Link to="/signup">Create an account</Link>
      </p>
    </div>
    <ToastContainer />
    </div>
  );
};

export default LoginWithEmailPage;
