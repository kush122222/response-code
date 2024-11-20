import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css'; // Import CSS file for styles

const LoginSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Email regex to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Handle Signup logic
  const handleSignup = async () => {
    setError(''); // Clear previous errors

    // Validate email format
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    try {
      await axios.post('/api/auth/register', { email, password });
      alert('Signup successful!');
      navigate('/search');
    } catch (error) {
      alert(`Signup failed: ${error.response?.data?.message || error.message}`);
    }
  };

  // Handle Login logic
  const handleLogin = async () => {
    setError(''); // Clear previous errors

    // Validate email format
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    try {
      await axios.post('/api/auth/login', { email, password });
      alert('Login successful!');
      navigate('/search');
    } catch (error) {
      alert(`Login failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div
      className="login-signup-container"
      style={{
        background: 'url(/images/code.jpg) no-repeat center center fixed',
        backgroundSize: 'cover',
      }}
    >
      <h1 className="title">Welcome!</h1>
      <p className="subtitle">Please login or sign up to continue</p>
      <div className="form">
        {/* Email Input */}
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        {/* Password Input */}
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Error message display */}
        {error && <p className="error-message">{error}</p>}

        <div className="button-group">
          {/* Signup button */}
          <button className="button signup" onClick={handleSignup}>
            Signup
          </button>
          
          {/* Login button */}
          <button className="button login" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
