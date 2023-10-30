// Carousel.js
import React, { useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const BannerCarousel = ({ banners }) => {
  const carouselRef = useRef();

  const handleNext = () => {
    carouselRef.current.next();
  };

  const handlePrev = () => {
    carouselRef.current.previous();
  };

  return (
    <div >
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={2000}
        showArrows={true}
        ref={carouselRef}
      >
        {banners.map((banner) => (
          <div key={banner.id}>
            <img
              src={`http://localhost:3000${banner.image}`}
              alt={banner.product}
              style={{ maxHeight: "400px", objectFit: "cover" }}
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
