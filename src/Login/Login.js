import React, { useState } from 'react';
import axios from 'axios';
import '../css/style.css'; // Import your CSS file

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState(''); // State variable for error message
  const [loggedInUsername, setLoggedInUsername] = useState(''); // State variable for logged-in username

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', formData);
      if (response.status === 200) {
        const { username } = response.data;
        setLoggedInUsername(username); // Set the logged-in username

        console.log('Login successful');
        // You can redirect the user to a different page or perform other actions upon successful login.
      } else {
        setErrorMessage('Login failed. Please check your credentials.'); // Set error message
        console.error('Login failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred during login. Please try again later.'); // Set error message
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <div className="profile-username">{loggedInUsername}</div> {/* Display the username in the top right corner */}
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}{' '}
          {/* Render error message */}
        </form>
      </div>
    </div>
  );
};

export default Login;
