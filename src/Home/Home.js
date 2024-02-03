// Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import '../css/style.css';
import '../css/product.css';
import BannerCarousel from '../Banner/Carousel';
//import PaymentPage from '../payment/PaymentPage';

// This is a functional component named Home that takes in a prop called onAddToCart.
const Home = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]); /*const [products, setProducts] = useState([]);: 
  This line declares a state variable products and a function setProducts to update it using the 
  useState hook. The initial value of products is an empty array [].*/
  const [newArrivals, setNewArrivals] = useState([]);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, newArrivalsResponse, bannersResponse] = await Promise.all([
          axios.get('http://localhost:3000/getproducts'),
          axios.get('https://fakestoreapi.com/products'),
          axios.get('http://localhost:3000/get_banner')
        ]);

        setProducts(productsResponse.data);
        setNewArrivals(newArrivalsResponse.data);
        setBanners(bannersResponse.data);
        console.log(bannersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    onAddToCart(product);
    console.log(product); // Log the product value
  };

  return (
    <div>
      <div>
        <div>      
          <BannerCarousel banners={banners} />
        </div>
        <h1 className="title">Mobile </h1>
        <div className="product-grid">
          {products.map((product, index) => (
            <div key={index} className="product-card">

              <img
                src={`http://localhost:3000/${product.product_image}`}
                alt={product.name}
                className="product-image"
                style={{ width: "200px", height: "200px" }}
              />
              <h3>{product.name}</h3>
              <p>Price: ${parseFloat(product.price).toFixed(2)}</p>
              <div className="button-container">
                <button
                  className="add-to-cart-button"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <button className="buy-button">Buy</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1>New Arrival</h1>
        <div className="product-grid">
          {newArrivals.map((product, index) => (
            <div key={index} className="product-card">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
                style={{ width: "200px", height: "200px" }}
              />
              <h3>{product.category}</h3>
              <p>{product.title}</p>
              <p>Price: ${parseFloat(product.price).toFixed(2)}</p>
              <p>{product.rating.rate}</p>
              <div className="button-container">
                <button
                  className="add-to-cart-button"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <div className="button-container">
                <Link to={`/payment/${product.id}`} className="buy-button">
                  Buy
                </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
    </div>
  );
};

export default Home;
