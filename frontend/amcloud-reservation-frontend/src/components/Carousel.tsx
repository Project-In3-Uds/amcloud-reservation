import React, { useState, useEffect } from 'react';

const images = [
  '/images/IMG1.jpg',
  '/images/IMG2.jpg',
  '/images/IMG3.jpg',
  '/images/IMG4.jpg',
  '/images/IMG5.jpg',
  '/images/IMG6.jpg',
];

const Carousel: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        margin: '3vw 0', // marge verticale proportionnelle à la largeur de la page
      }}
    >
      <div
        style={{
          width: '100%',
          height: 350,
          maxWidth: '95vw',
          background: '#f8faff',
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <img
          src={images[index]}
          alt="Carrousel"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover', // adapte l'image à la taille du conteneur
            borderRadius: 12,
            transition: 'opacity 0.5s',
            display: 'block',
          }}
        />
       
        
      </div>
    </div>
  );
};

export default Carousel;