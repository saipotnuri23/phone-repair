import React, { useEffect, useState } from 'react';
import './RespondedOffers.css';
import { useNavigate } from 'react-router-dom';

const RespondedOffers = () => {
  const [respondedShops, setRespondedShops] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const sent = JSON.parse(localStorage.getItem('sentShops')) || [];
    const selectedIssues = JSON.parse(localStorage.getItem('selectedIssues')) || [];

    // Simulate response from all shops after 3 seconds
    const simulatedOffers = sent.map(shop => ({
      ...shop,
      offeredPrice: shop.price - Math.floor(Math.random() * 300),
      estimatedDays: Math.floor(Math.random() * 3) + 1,
    }));

    setTimeout(() => {
      setRespondedShops(simulatedOffers);
    }, 1000);
  }, []);

  const handleAccept = (shop) => {
    const selectedIssues = JSON.parse(localStorage.getItem('selectedIssues')) || [];
    const orderData = {
      shop,
      issues: selectedIssues,
      orderDate: new Date().toISOString(),
    };
    localStorage.setItem("orderData", JSON.stringify(orderData));
    navigate('/payment');
  };

  const handleDecline = (id) => {
    setRespondedShops(prev => prev.filter(shop => shop.id !== id));
  };

  return (
    <div className="offers-container">
      <h2>Repair Offers from Shops</h2>
      {respondedShops.length === 0 ? (
        <p className="no-offers">No offers yet. Please wait...</p>
      ) : (
        <div className="offers-list">
          {respondedShops.map(shop => (
            <div key={shop.id} className="offer-card">
              <h3>{shop.name}</h3>
              <p><strong>Rating:</strong> {shop.rating}</p>
              <p><strong>Estimated:</strong> {shop.estimatedDays} day(s)</p>
              <p><strong>Offer Price:</strong> ₹{shop.offeredPrice}</p>
              <div className="actions">
                <button className="accept-btn" onClick={() => handleAccept(shop)}>Accept</button>
                <button className="decline-btn" onClick={() => handleDecline(shop.id)}>Decline</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RespondedOffers;
