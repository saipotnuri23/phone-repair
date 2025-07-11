import React from 'react';
import './AccessoryCard.css';
import { useNavigate } from 'react-router-dom';

const AccessoryCard = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/buy/${data.id}`, { state: data });
  };

  // Fallback logic for image source
  const imageSrc = data.image || (Array.isArray(data.images) ? data.images[0] : '');

  return (
    <div className="accessory-card" onClick={handleClick}>
      <img src={imageSrc} alt={data.name} />

      <h4 className="product-title">{data.name}</h4>

      <p className="product-features">{data.features}</p>

      <p className="subtitle">{data.subtitle}</p>

      <div className="rating-line">
        <span className="rating">{data.rating} ★</span>
        <span className="reviews">({Number(data.reviews).toLocaleString()})</span>
      </div>

      <div className="price-line">
        <span className="price">₹{data.price}</span>
      </div>
    </div>
  );
};

export default AccessoryCard;
