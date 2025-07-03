import React from 'react';
import './AccessoryCard.css';
import { useNavigate } from 'react-router-dom';

const AccessoryCard = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/buy/${data.id}`, { state: data });
  };

  return (
    <div className="accessory-card" onClick={handleClick}>
      <img src={data.image} alt={data.name} />
      <h4>{data.name}</h4>
      <p className="ratings">
        {data.rating} | {data.reviews} Ratings
      </p>
      <ul className="features">
        {data.features.map((f, i) => <li key={i}>• {f}</li>)}
      </ul>
      <h3>₹{data.price}</h3>
    </div>
  );
};

export default AccessoryCard;
