// Carousel.js
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const BannerCarousel = ({ banners }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (selectedIndex + 1) % banners.length;
      setSelectedIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedIndex, banners.length]);

  return (
    <div>
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true} // Changed this attribute to true
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
    </div>
  );
};

export default BannerCarousel;
