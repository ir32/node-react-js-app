// Cart.js
import React from 'react';

const Cart = ({ onClick, count }) => {
  return (
    <button onClick={onClick} className="btn btn-primary">
      Cart ({count}) <span className="glyphicon glyphicon-shopping-cart"></span>
    </button>
  );
};

export default Cart;
