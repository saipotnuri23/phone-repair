import React, { useState } from "react";
import "./NearShops.css";
import { useLocation } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaRupeeSign, FaCheckCircle } from "react-icons/fa";

const NearShops = () => {
  const { state } = useLocation();
  const selectedIssues = state?.issues || [];
  const description = state?.description || '';

  const [selectedShopIds, setSelectedShopIds] = useState([]);
  const [sentShopIds, setSentShopIds] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  const shops = [
    { id: 1, name: "FixIt Repair Center", location: "Hitech City, Hyderabad", rating: 4.6, distance: "1.2 km", price: 2500 },
    { id: 2, name: "Mobile Medics", location: "Madhapur, Hyderabad", rating: 4.3, distance: "2.1 km", price: 2200 },
    { id: 3, name: "Tech Clinic", location: "Kondapur, Hyderabad", rating: 4.5, distance: "2.9 km", price: 2400 },
    { id: 4, name: "Gadget Repair Hub", location: "Jubilee Hills", rating: 4.2, distance: "3.5 km", price: 2100 },
    { id: 5, name: "QuickFix Mobiles", location: "Gachibowli", rating: 4.4, distance: "1.8 km", price: 2000 },
    { id: 6, name: "Digital Repair Zone", location: "Begumpet", rating: 4.1, distance: "4.2 km", price: 2600 },
    { id: 7, name: "MobiCare", location: "Ameerpet", rating: 4.0, distance: "5.0 km", price: 2300 },
    { id: 8, name: "SmartTech Repairs", location: "Banjara Hills", rating: 4.3, distance: "3.0 km", price: 2450 },
  ];

  const toggleShopSelection = (shopId) => {
    if (selectedShopIds.includes(shopId)) {
      setSelectedShopIds(selectedShopIds.filter((id) => id !== shopId));
    } else {
      setSelectedShopIds([...selectedShopIds, shopId]);

      setSentShopIds(prev => [...prev, shopId]);
      setTimeout(() => {
        setSentShopIds(prev => prev.filter(id => id !== shopId));
      }, 1000);
    }
  };

  const handleOk = () => {
    if (selectedShopIds.length > 0) {
      const selectedShop = shops.find(shop => shop.id === selectedShopIds[0]);
      const orderData = {
        shop: selectedShop,
        issues: selectedIssues,
        description,
        orderDate: new Date()
      };
      localStorage.setItem("orderData", JSON.stringify(orderData));

      const existing = JSON.parse(localStorage.getItem("notifications")) || [];
      const time = new Date().toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit', hour12: true });

      const newNotifications = selectedShopIds.map(id => {
        const shop = shops.find(s => s.id === id);
        return {
          message: `Repair request sent to ${shop.name}`,
          time
        };
      });

      localStorage.setItem("notifications", JSON.stringify([...newNotifications, ...existing]));
      setShowMessage(true);
    }
  };

  const isShopSelected = (shopId) => selectedShopIds.includes(shopId);
  const isSent = (shopId) => sentShopIds.includes(shopId);

  return (
    <div className="shoplist-container">
      <h2 className="shoplist-heading">Shops Nearby You</h2>

      {/* ✅ Show Selected Issues */}
      {selectedIssues.length > 0 && (
        <p className="shoplist-subheading">
          <strong>Selected Issues:</strong> {selectedIssues.join(", ")}
        </p>
      )}

      {/* ✅ Show Description separately */}
      {description && (
        <p className="shoplist-description">
          <strong>Problem Description:</strong> {description}
        </p>
      )}

      <div className="shop-cards">
        {shops.map((shop) => (
          <div key={shop.id} className={`shop-card ${isShopSelected(shop.id) ? 'selected' : ''}`}>
            <h3 className="shop-name">{shop.name}</h3>

            {isSent(shop.id) && (
              <span className="sent-title animate-sent">
                <FaCheckCircle className="sent-icon" /> Sent
              </span>
            )}

            <p className="shop-location">{shop.location}</p>

            <div className="shop-info-row">
              <FaStar className="info-icon star" />
              <span>{shop.rating}</span>
            </div>

            <div className="shop-info-row">
              <FaMapMarkerAlt className="info-icon pin" />
              <span>{shop.distance}</span>
            </div>

            <div className="shop-info-row">
              <FaRupeeSign className="info-icon money" />
              <span>{shop.price}</span>
            </div>

            <button
              className="select-button"
              onClick={() => toggleShopSelection(shop.id)}
            >
              {isShopSelected(shop.id) ? "Cancel Request" : "Send Request"}
            </button>
          </div>
        ))}
      </div>

      {selectedShopIds.length > 0 && !showMessage && (
        <div className="ok-button-wrapper">
          <button className="ok-button" onClick={handleOk}>OK</button>
        </div>
      )}

      {showMessage && (
        <div className="info-message">
          Wait for a short time. As the shop accepts the request, we will inform you.
        </div>
      )}
    </div>
  );
};

export default NearShops;
