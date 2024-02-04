// Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import '../css/style.css';
import '../css/product.css';
import BannerCarousel from '../Banner/Carousel';

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
    console.log(product); 
  };

  

  const handleBuyClick = async (product) => {
    const amount = product.price * 100;
    const currency = 'INR';
    //const receiptId = product.id.toString(); // Change this based on your product ID
    const receiptId = "qwsaq1";

    try {
      const response = await fetch("http://localhost:3000/initiate_razorpay_payment", {
        method: "POST",
        body: JSON.stringify({
          amount,
          currency,
          receipt: receiptId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const order = await response.json();
      
      var options = {
        key: order.key_id,
        amount,
        currency,
        name: "Acme Corp",
        description: "Test Transaction",
        order_id: order.orderId,
        handler: async function (response) {
          const body = { ...response };

          const validateRes = await fetch(
            "http://localhost:3000/order/validate",
            {
              method: "POST",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const jsonRes = await validateRes.json();
          console.log(jsonRes);
        },
        prefill: {
          name: "Web Dev Matrix",
          email: "alamirfan1092@gmail.com",
          contact: "8240494754",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
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
                
                <button className="buy-button" onClick={() => handleBuyClick(product)}>
                  Buy1
                </button>
                
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
