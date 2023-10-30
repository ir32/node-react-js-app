// Carousel.js
import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const BannerCarousel = ({ banners }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
  };

  const handleNext = () => {
    const nextIndex = (selectedIndex + 1) % banners.length;
    setSelectedIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = selectedIndex === 0 ? banners.length - 1 : selectedIndex - 1;
    setSelectedIndex(prevIndex);
  };

  return (
    <div>
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={2000}
        showArrows={true}
        selectedItem={selectedIndex}
        onChange={handleSelect}
      >
        {banners.map((banner) => (
          <div key={banner.id}>
            <img
              src={`http://localhost:3000${banner.image}`}
              alt={banner.product}
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          </div>
        ))}
      </Carousel>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default BannerCarousel;
