import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BuyNowPage.css';
import LoginSignupModal from '../Login/LoginSignupModal';

const BuyNowPage = ({ isLoggedIn, onLoginRequired, onLoginSuccess }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>Product not found.</p>;

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      navigate('/address', { state });
    }
  };

  const handleAddToCart = () => {
    alert('Item added to cart!');
  };

  return (
    <div className="buy-now-page">
      <div className="buy-now-left">
        <img src={state.image} alt={state.name} />
      </div>

      <div className="buy-now-right">
        <div>
          <h2>{state.name}</h2>
          <p className="price">₹{state.price}</p>
          <ul>
            {state.features.map((f, i) => (
              <li key={i}>• {f}</li>
            ))}
          </ul>
        </div>

        <div className="buy-now-buttons">
          <button className="add-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
          <button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>

      {showLoginModal && (
        <LoginSignupModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={() => {
            setShowLoginModal(false);
            onLoginSuccess?.(); // Update login state in App.jsx
            navigate('/address', { state });
          }}
        />
      )}
    </div>
  );
};

export default BuyNowPage;
