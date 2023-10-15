import React from 'react';

const Cart = ({ cartItems, isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.name} - ${parseFloat(item.price).toFixed(2)}
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close Cart</button>
    </div>
  );
};

export default Cart;
