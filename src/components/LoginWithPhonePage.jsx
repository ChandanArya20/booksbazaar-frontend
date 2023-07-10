import React, { useState } from 'react';
import { BiHide as PassHideIcon } from "react-icons/bi";
import { Link } from 'react-router-dom';

import '../css/login_page.css';

const LoginWithPhonePage = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login button clicked');
  };

  return (
    <div className="login-page-container">
    <div className="login-page">
      <h1>Login</h1>
      <p className="login-with-email-link">
          <Link to="/emailLogin">Login with Email</Link>
      </p>
      <form onSubmit={handleLogin}>
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* <div className="pass-hide-icon">
          <PassHideIcon />
        </div> */}
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

export default LoginWithPhonePage;
