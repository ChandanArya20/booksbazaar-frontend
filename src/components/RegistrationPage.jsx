import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/login_page.css';

const RegistrationPage = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const goNext = (e) => {
    e.preventDefault();
    // Add your login logic here
    window.location.href = '/passwordPage';
    console.log('Login button clicked');
  };

  return (
    <div className="login-page-container">
    <div className="login-page" id='registration-page'>
      <h1>Registration</h1>
      <form>
        <input
          type="text"
          placeholder="Enter full name"
          value={name}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email ( optional )"
          value={email}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button className="login-button" onClick={goNext} >
         Continue
        </button>
      </form>
      <p className="create-account-link">
        Existing user? <Link to="/phonelogin">Login here</Link>
      </p>
    </div>
    </div>
  );
};

export default RegistrationPage;
