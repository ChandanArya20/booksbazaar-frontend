import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/login_page.css';

const PasswordCreationPage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const{name,phone,email}=location.state
    const { password1, password2 } = data;
    console.log(data);

    if (password1 !== password2) {
      toast.error('Passwords do not match',{
        position:'top-center',
        theme: "dark"
      });
      return;
    }
  
  };
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="login-page-container">
      <div className="login-page" id='password-page'>
        <h1>Create a password</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Create a password"
            {...register("password1", {
              required: "First create a password",
              pattern: {
                value: /^(?!.*\s).*$/,
                message: "Space is not allowed"
              },
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
          <p className="error-message">{errors.password1?.message}</p>

          <input
            type="password"
            placeholder="Re-enter password"
            {...register("password2", {
              required: "Re-enter password",
              pattern: {
                value: /^(?!.*\s).*$/,
                message: "Space is not allowed"
              },
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
          <p className="error-message">{errors.password2?.message}</p>

          <button type="submit" className="login-button">
            Register
          </button>

        </form>
        <p className="create-account-link">
          <Link onClick={goBack}>Go Back</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PasswordCreationPage;
