import React from 'react';

const Dashboard = ({ loggedInUsername }) => {
  const storedUsername = sessionStorage.getItem('loggedInUsername');
  console.log(storedUsername);
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {storedUsername}!</p> {/* Display the username here */}
      <p>Welcome to your dashboard! Here, you can add any content or functionality you need for your logged-in users.</p>
      {/* Add more components, features, or data here */}
    </div>
  );
};

export default Dashboard;
