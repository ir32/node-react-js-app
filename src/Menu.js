import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css'; // Import the CSS file

const Menu = () => {
  return (
    <nav className="menu">
      <ul className="menu-list">
        <li className="menu-item">
          <Link to="/" className="menu-link">Home</Link>
        </li>
        <li className="menu-item">
          <Link to="/contact" className="menu-link">Contact</Link>
        </li>
        <li className="menu-item">
          <Link to="/workshop" className="menu-link">Workshop</Link>
        </li>
        <li className="menu-item">
        <Link to="/Admision" className="menu-link">Admision</Link>
        </li>
        <li className="menu-item">
          <Link to="/upload" className="menu-link">Upload Image</Link> {/* New link for ImageUploadForm */}
        </li>
        <li className="menu-item">
          <Link to="/student" className="menu-link">Student Registation</Link>
        </li>
        <li className="menu-item" style={{ float: 'right' }}>
        <Link to="/register" className="menu-link">Registration</Link>
        </li>
        <li className="menu-item" style={{ float: 'right' }}>
        <Link to="/login" className="menu-link">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
