import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/login_page.css';

const PasswordCreationPage = () => {

  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login button clicked');
  };

  const handleGoBack = () => {
    window.history.back();      // Go back to the previous page
  };

  return (
    <div className="login-page-container">
    <div className="login-page" id='password-page'>
      <h1>Create a password</h1>
      <form onSubmit={handleLogin}>
        <input
            type="text"
            placeholder="Create a password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            required
          />
        <input
            type="password"
            placeholder="Re-enter password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
          <button type="submit" className="login-button">
            Register
          </button>
      </form>
      <p className="create-account-link">
      <a href="#" onClick={handleGoBack}>Go Back</a>
      </p>
    </div>
    </div>
  );
};

export default PasswordCreationPage;
