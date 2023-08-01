import '../css/login_page.css';
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../context/UserContex';

const PasswordCreationPage = () => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const{loginUser}=useContext(UserContext)

  const onSubmit = async (data) => {

    const { name, phone, email } = location.state
    const { password1, password2 } = data

    if (password1 !== password2) {
      toast.error('Passwords do not match', {
        position: 'top-center',
        theme: 'dark'
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: email.length !== 0 ? JSON.stringify({name,phone,email,password:password1}) :
                                  JSON.stringify({name,phone,password:password1})
      })  
    
      if (response.ok) {
        const userData = await response.json();
        loginUser(userData,()=>{
          navigate("/")
        })
        
      } else if (response.status === 400) {
        const errorMessage = await response.text();
        toast.error(errorMessage, {
          position: 'top-center',
          theme: 'dark'
        });

      }else{
        const errorDetails=await response.json()
        throw new Error(errorDetails.status)
      }
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

          <button type="submit" className="login-button">
            Register
          </button>
        </form>
        <p className="create-account-link">
          <Link onClick={goBack}>Go Back</Link>
        </p>
      </div>
    </div>
  )
}
export default PasswordCreationPage;
