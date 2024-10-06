import React, { useState, useEffect } from 'react';
import '../styles/BannerCarusel.css';

const images = [
  "banner1.jpg",
  "banner2.jpg",
  "banner3.jpg"
];

export default function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // Меняем изображение каждые 3 секунды

    return () => clearInterval(interval); // Очищаем интервал при демонтировании компонента
  }, []);

  // Обработчик для переключения по клику на точки
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };
  return (
    <div className="banner-carousel">
      <img
        src={images[currentIndex]}
        alt="Баннер"
        className="banner-image"
      />
      
      {/* Пагинация (точки) */}
      <div className="pagination">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}
