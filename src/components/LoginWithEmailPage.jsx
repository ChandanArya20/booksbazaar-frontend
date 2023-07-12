import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import '../css/login_page.css';

const LoginWithEmailPage = () => {

  const{register,handleSubmit, formState:{errors}}=useForm()

  const onSubmit = (data) => {    
    console.log(data);  
    
  };

  return (
    <div className="login-page-container">
    <div className="login-page">
      <h1>Login</h1>
      <p className="login-with-phone-link">
          <Link to="/phoneLogin">Login with Phone</Link>
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
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
    </div>
  );
};

export default LoginWithEmailPage;
