import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/login_page.css';

const LoginWithEmailPage = () => {
  const [email, setEmail] = useState('');
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
      <p className="login-with-phone-link">
          <Link to="/phoneLogin">Login with Phone</Link>
      </p>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
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
