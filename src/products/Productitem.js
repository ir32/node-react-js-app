import React, { useState } from 'react';
import axios from 'axios';

const ProductItem = () => {
  const [name, setName] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleCategoryIdChange = (e) => {
    setCategoryId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('product_image', productImage);
    formData.append('price', price);
    formData.append('category_id', categoryId);

    try {
      await axios.post('http://localhost:3000/products', formData);
      console.log('Product uploaded successfully');
      setName('');
      setProductImage(null);
      setPrice('');
      setCategoryId('');
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  return (
    <div className="col-md-6">
      <h2>Product Upload Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Image:</label>
          <input
            type="file"
            accept="image/*"
            name="product_image"
            onChange={handleImageChange}
          />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input type="text" value={price} onChange={handlePriceChange} />
        </div>
        <div className="form-group">
          <label>Category ID:</label>
          <input
            type="text"
            value={categoryId}
            onChange={handleCategoryIdChange}
          />
        </div>
        <button type="submit">Upload Product</button>
      </form>
    </div>
  );
};

export default ProductItem;
