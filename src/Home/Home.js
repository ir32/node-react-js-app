// Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/style.css';
import '../css/product.css';

// This is a functional component named Home that takes in a prop called onAddToCart.
const Home = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]); /*const [products, setProducts] = useState([]);: 
  This line declares a state variable products and a function setProducts to update it using the 
  useState hook. The initial value of products is an empty array [].*/

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:3000/getproducts')
      .then((response) => {
        setProducts(response.data);
        //function setProducts
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleAddToCart = (product) => {
    onAddToCart(product);
    console.log(product); // Log the product value
  };

  return (
    <div>
      <h1>Products</h1>
      <div className="product-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
                      console.log(product);

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
    </div>
  );
};

export default Home;
