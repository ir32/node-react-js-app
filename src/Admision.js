import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const Admision = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:3000/getpic')
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Image Gallery</h1>
      <div className="image-gallery">
        {images.map((image, index) => (
          <div key={image.id} className={`image-item${(index + 1) % 4 === 0 ? ' last-in-row' : ''}`}>
            <img src={`http://localhost:3000${image.image}`} alt={image.name} />
            <p>{image.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admision;
