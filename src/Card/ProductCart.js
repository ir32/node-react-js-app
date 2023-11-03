import React, { useState } from 'react';

const ProductCart = ({ product, handleAddToCart }) => {
  const [showCartPopup, setShowCartPopup] = useState(false);

  const openCartPopup = () => {
    setShowCartPopup(true);
  };

  const closeCartPopup = () => {
    setShowCartPopup(false);
  };

  return (
    <div className="product-card">
      <button onClick={openCartPopup}>Open Cart Popup</button>
      {showCartPopup && (
        <div className="cart-popup">
          <h1>Cart Popup Content</h1>
          <p>Product: {product.name}</p>
          <p>Price: ${parseFloat(product.price).toFixed(2)}</p>
          <button onClick={closeCartPopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ProductCart;
