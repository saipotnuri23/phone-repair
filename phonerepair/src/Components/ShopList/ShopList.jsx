import React, { useState } from 'react';
import './ShopList.css';
import { useNavigate } from 'react-router-dom';

const ShopList = ({ onSelect }) => {
  const [selectedShopId, setSelectedShopId] = useState(null);
  const navigate = useNavigate();

  const shops = [
    {
      id: 1,
      name: "Mark Rober",
      rating: 4.2,
      price: 2500,
      memberSince: "Jun 2019",
    },
    {
      id: 2,
      name: "Tech Fix",
      rating: 4.5,
      price: 2200,
      memberSince: "Feb 2020",
    },
    {
      id: 3,
      name: "PhonePro Repairs",
      rating: 4.0,
      price: 2000,
      memberSince: "Jan 2018",
    }
  ];

  const handleAccept = (id) => {
  setSelectedShopId(id);
  const selectedShop = shops.find((shop) => shop.id === id);

  const orderData = {
    issues: JSON.parse(localStorage.getItem("selectedIssues")) || [], // already selected issues from previous step
    shop: selectedShop,
    orderDate: new Date().toISOString() // ✅ Save exact time when order placed
  };

  localStorage.setItem("orderData", JSON.stringify(orderData));

  if (onSelect) onSelect(id);
  navigate('/payment'); // Or wherever your next step is
};

  return (
    <div className="shop-grid">
      {shops.map((shop) => (
        <div key={shop.id} className="shop-card">
          <div className="shop-header">
            <div className="shop-icon">👤</div>
            <div className="shop-info">
              <h3>{shop.name}</h3>
              <div className="rating">
                <span>{shop.rating}</span>
                <span className="badge">
                  {shop.rating >= 4.5 ? 'Top Rated' : 'Trusted'}
                </span>
              </div>
              <p>Member since {shop.memberSince}</p>
            </div>
            <div className="shop-price">₹{shop.price}</div>
          </div>
          <div className="shop-actions">
            <button className="btn-decline">Decline</button>
            <button className="btn-accept" onClick={() => handleAccept(shop.id)}>
              Accept
            </button>
          </div>
        </div>
      ))}
      <button className="btn-next">Next</button>
    </div>
  );
};

export default ShopList;
