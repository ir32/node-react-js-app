import React, { useState } from 'react';
import axios from 'axios';
import '../css/style.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [loggedInUsername, setLoggedInUsername] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogout = () => {
    axios.get('http://localhost:3000/logout')
      .then(() => {
        setLoggedInUsername(''); // Clear the logged-in username
        console.log('Logout successful');
        // You can redirect the user or perform other actions after successful logout.
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', formData);
      if (response.status === 200) {
        const { username } = response.data;
        setLoggedInUsername(username);

        console.log('Login successful');
      } else {
        setErrorMessage('Login failed. Please check your credentials.');
        console.error('Login failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred during login. Please try again later.');
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      {loggedInUsername ? (
        <div>
          <div className="profile-username">{loggedInUsername}</div>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      ) : (
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
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
