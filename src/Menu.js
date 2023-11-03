import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css'; // Import the CSS file

const Menu = ({ products, cartItems }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemNames, setCartItemNames] = useState([]);
  const [cartItemPrices, setCartItemPrices] = useState([]);
  const [cartItemImages, setCartItemImages] = useState([]);
  const [cartItemQuantities, setCartItemQuantities] = useState([]);

  const getProductsInCart = products.filter(product => cartItems.some(item => item.id === product.id));

  useEffect(() => {
    //array data iterate over an array and render a list of items
    const names = cartItems.map(item => item.name);
    const prices = cartItems.map(item => item.price);
    const images = cartItems.map(item => item.product_image);
    const quantities = Array(cartItems.length).fill(1); // Initialize quantities to 1 for each item

    //new array create 
    setCartItemNames(names);
    setCartItemPrices(prices);
    setCartItemImages(images);
    setCartItemQuantities(quantities);
  }, [cartItems]);

  const handleIncrement = (index) => {
    const updatedQuantities = [...cartItemQuantities];
    updatedQuantities[index]++;
    setCartItemQuantities(updatedQuantities);
  };

  const handleDecrement = (index) => {
    const updatedQuantities = [...cartItemQuantities];
    if (updatedQuantities[index] > 0) {
      updatedQuantities[index]--;
      setCartItemQuantities(updatedQuantities);
    }
  };

  const calculateTotalAmount = () => {
    let totalAmount = 0;
    for (let i = 0; i < cartItems.length; i++) {
      totalAmount += cartItemPrices[i] * cartItemQuantities[i];
    }
    return totalAmount;
  };
  

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
          <Link to="/Admision" className="menu-link">Admission</Link>
        </li>
        <li className="menu-item">
          <Link to="/upload" className="menu-link">Upload Image</Link>
        </li>
        <li className="menu-item">
          <Link to="/student" className="menu-link">Student Registration</Link>
        </li>
        <li className="menu-item" style={{ float: 'right' }}>
            <Link to="/register" className="menu-link">Registration</Link>
          </li>
          <li className="menu-item" style={{ float: 'right' }}>
            <Link to="/login" className="menu-link">Login</Link>
          </li>
        <li className="menu-item" style={{ float: 'right' }}>
          <button
            type="button"
            className="btn btn-info btn-lg"
            data-toggle="modal"
            data-target="#menuModal"
            onClick={() => setIsCartOpen(true)}
          >
            Cart Box <span className="glyphicon glyphicon-shopping-cart">{cartItems.length}</span>
          </button>
        </li>
      </ul>
      {isCartOpen && (
        <div className="modal fade" id="menuModal" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" onClick={() => setIsCartOpen(false)}>&times;</button>
                <h4 className="modal-title">Cart</h4>
              </div>
              <div className="modal-body">
              {getProductsInCart.map((product, index) => (
                    <div key={index} className="row align-items-center my-3">
                      <div className="col-sm-2">
                        <img
                          src={`http://localhost:3000/${product.product_image}`}
                          alt={product.name}
                          style={{ maxWidth: '100%', height: 'auto' }}
                        />
                      </div>
                      <div className="col-sm-3">
                        <h3>{product.name}</h3>
                      </div>
                      <div className="col-sm-2">
                        <p>Price: {product.price}</p>
                      </div>
                      <div className="col-sm-2">
                        <p>Quantity: {cartItemQuantities[index]}</p>
                      </div>
                      <div className="col-sm-2">
                        <button onClick={() => handleIncrement(index)}>+</button>
                        <button onClick={() => handleDecrement(index)}>-</button>
                      </div>
                      
                    </div>
                  ))}

                <div className="row">
                  <div className="col-sm-12">
                    <h4>Total Amount: {calculateTotalAmount()}</h4>
                  </div>
                  <button style={{ marginRight: '5px' }} onClick={() => console.log("Buy button clicked for")}>
                    Buy
                  </button>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" onClick={() => setIsCartOpen(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
    )}

    </nav>
    
  );
};

export default Menu;
