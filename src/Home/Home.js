import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/style.css';
import '../css/product.css';

const Home = () => {
  const [products, setProducts] = useState([]);

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
              <button className="add-to-cart-button">Add to Cart</button>
              <button className="buy-button">Buy</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
