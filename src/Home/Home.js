import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/style.css';
import '../css/product.css';

const Home = () => {
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
    console.log('Product added to cart:', product);
    setCartItems([...cartItems, product]);
  };

  return (
    <div>
      <h1>Products</h1>
      <div className="product-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <img
              src={`http://localhost:3000/${product.product_image}`}
              alt={product.name}
              className="product-image"
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

      <style>
        {`
          .product-image {
            width: 100%;
            height: 200px; /* Set the desired height for the images */
            object-fit: cover; /* Adjust how the image fits in the container */
          }
        `}
      </style>
    </div>
  );
};

export default Home;
