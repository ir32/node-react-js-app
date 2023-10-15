// Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/style.css';
import '../css/product.css';
import Cart from '../Card/Cart'; // Assuming you have a Cart component

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartAmount, setCartAmount] = useState(0);

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
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleCartOpen = () => {
    setIsModalOpen(true);
  };

  const handleCartClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    let totalAmount = 0;
    for (const item of cartItems) {
      totalAmount += item.price * item.quantity;
    }
    setCartAmount(totalAmount);
  }, [cartItems]);

  return (
    <div>
      <h1>Products</h1>
      <div className="text-right">
        <Cart onClick={handleCartOpen} count={cartItems.length} />
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCartClose}>
              &times;
            </span>
            <h2>Cart Items</h2>
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  src={`http://localhost:3000/${item.product_image}`}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <div>{item.name}</div>
                  <div>Price: ${parseFloat(item.price).toFixed(2)}</div>
                  <div>Quantity: {item.quantity}</div>
                  <div>
                    <button
                      className="quantity-button"
                      onClick={() => {
                        const updatedCart = [...cartItems];
                        updatedCart[index].quantity += 1;
                        setCartItems(updatedCart);
                      }}
                    >
                      +
                    </button>
                    <button
                      className="quantity-button"
                      onClick={() => {
                        const updatedCart = [...cartItems];
                        if (updatedCart[index].quantity > 0) {
                          updatedCart[index].quantity -= 1;
                          setCartItems(updatedCart);
                        }
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div>Total Amount: ${cartAmount.toFixed(2)}</div>
          </div>
        </div>
      )}

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
          .modal {
            display: block;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgb(0,0,0);
            background-color: rgba(0,0,0,0.4);
          }
          .modal-content {
            background-color: #fefefe;
            margin: 15% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
          }
          .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
          }
          .close:hover,
          .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
          }
          .cart-item {
            display: flex;
            margin-bottom: 20px;
          }
          .cart-item-image {
            width: 50px;
            height: 50px;
            object-fit: cover;
            margin-right: 10px;
          }
          .cart-item-details {
            display: flex;
            flex-direction: column;
          }
          .quantity-button {
            margin-top: 5px;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
