import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './Menu';
import Home from './Home/Home';
import Contact from './Contact';
import Workshop from './Workshop';
import Admision from './Admision';
import ImageUploadForm from './ImageUploadForm';
import Registration from '../src/Login/Registration';
import Login from '../src/Login/Login';
import Studentregistation from '../src/Student/Studentregistation';
import Studenttest from '../src/Dashboard/dashboard';
import Prodcutitem from '../src/products/Productitem';
import axios from 'axios';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:3000/getproducts')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
    // console.log("Product added to cart:", product); // Log the product here
    // console.log("From home page");
  };

  return (
    <Router>
      <div>
        <Menu products={products} onAddToCart={handleAddToCart} cartItems={cartItems} />
        <Routes>
          <Route
            path="/"
            element={<Home products={products} onAddToCart={handleAddToCart} />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/Admision" element={<Admision />} />
          <Route path="/upload" element={<ImageUploadForm />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student" element={<Studentregistation />} />
          <Route path="/dashboard" element={<Studenttest />} />
          <Route path="/products" element={<Prodcutitem />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
