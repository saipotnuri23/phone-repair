import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './BuyNowPage.css';
import LoginSignupModal from '../Login/LoginSignupModal';

const pinToCity = {
  '500001': 'Hyderabad',
  '110001': 'Delhi',
  '600001': 'Chennai',
  '400001': 'Mumbai',
  '534001': 'Your Area'
};

const BuyNowPage = ({ isLoggedIn, onLoginSuccess }) => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState('');
  const [checkPin, setCheckPin] = useState('');
  const [city, setCity] = useState('');
  const [pinError, setPinError] = useState('');
  const [pinSaved, setPinSaved] = useState(false);
  const [isDeliverable, setIsDeliverable] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomedImage, setZoomedImage] = useState(null);

  const imageList = Array.isArray(state?.images) ? state.images : [state?.image];

  useEffect(() => {
    if (!state?.id) return;
    const savedPin = localStorage.getItem(`deliveryPincode-${state.id}`);
    if (savedPin && pinToCity[savedPin]) {
      setCheckPin(savedPin);
      setCity(pinToCity[savedPin]);
      setPinSaved(true);
      setIsDeliverable(true);
      calculateDeliveryDate(2);
    }
  }, [state?.id]);

  const calculateDeliveryDate = (days = 2) => {
    const today = new Date();
    today.setDate(today.getDate() + days);
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    setDeliveryDate(today.toLocaleDateString('en-IN', options));
  };

  const handleCheckPincode = () => {
    const isValid = /^\d{6}$/.test(checkPin);

    if (!isValid) {
      setPinError('❌ Please enter a valid pincode');
      setPinSaved(false);
      setIsDeliverable(null);
      return;
    }

    if (pinToCity[checkPin] && state?.inStock) {
      setCity(pinToCity[checkPin]);
      setIsDeliverable(true);
      setPinError('');
      setPinSaved(true);
      localStorage.setItem(`deliveryPincode-${state.id}`, checkPin);
      calculateDeliveryDate(2);
    } else {
      setIsDeliverable(false);
      setCity('');
      setPinSaved(true);
      setPinError('');
    }
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const exists = cart.find(item => item.id === state.id);

    if (!exists) {
      cart.push({ ...state, quantity: 1, image: state.image || state.images?.[0] });
      localStorage.setItem('cart', JSON.stringify(cart));
      setCartMessage('✔ Item added to cart');
    } else {
      setCartMessage('✔ Item already in the cart');
    }
    console.log(state.id, state.name);


    setIsAddedToCart(true);
    setTimeout(() => setCartMessage(''), 3000);
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      navigate('/address', { state });
    }
  };

  const handleGoToCart = () => navigate('/cart');

  if (!state || !state.name) return <p>Product not found</p>;

  return (
    <div className="buy-now-page">
      <div className="buy-now-left">
        <div className="main-image-wrapper">
          <img
            src={imageList[currentIndex]}
            alt={state.name}
            className="main-preview-img"
            onClick={() => setZoomedImage(imageList[currentIndex])}
          />
        </div>

        {imageList.length > 1 && (
          <div className="thumbnail-row">
            {imageList.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                className={`thumbnail-img ${idx === currentIndex ? 'active-thumb' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="buy-now-right">
        <div className="buy-now-scroll">
          <h2>{state.name}</h2>

          <ul>
            {state.features?.map((f, i) => <li key={i}>• {f}</li>)}
          </ul>

          <div className="price-block">
            <span className="current-price">₹{state.price}</span>
            {state.oldPrice && <span className="old-price">₹{state.oldPrice}</span>}
            {state.oldPrice && (
              <span className="discount-tag">
                {Math.round(((state.oldPrice - state.price) / state.oldPrice) * 100)}% OFF
              </span>
            )}
          </div>

          <div className="meta-row">
            <div className="rating">
              <span className="rating-number">{state.rating.toFixed(1)}</span>
              <div className="star-bar">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar key={i} className="star" style={{ color: i < Math.round(state.rating) ? 'orange' : '#ccc' }} />
                ))}
              </div>
            </div>
          </div>

          <p className={`stock-status ${state.inStock ? 'in-stock' : 'out-of-stock'}`}>
            {state.inStock ? '✅ In Stock' : '❌ Out of Stock'}
          </p>

          {state.deliveryCharge !== undefined && (
            <p className="delivery-charge">
              {state.deliveryCharge === 0 ? '🚚 Free Delivery' : `🚚 Delivery Charge: ₹${state.deliveryCharge}`}
            </p>
          )}

          {!pinSaved ? (
           <div className="pincode-checker">
  <div className="pincode-input-wrapper">
    <input
      type="text"
      placeholder="Enter Pincode"
      className="pincode-input"
      value={checkPin}
      onChange={(e) => {
        setCheckPin(e.target.value);
        setPinError('');
      }}
    />
    {pinError && <p className="pin-error-msg">{pinError}</p>}
  </div>
  <button className="pincode-btn" onClick={handleCheckPincode}>Check</button>
</div>

          ) : (
            <>
              {isDeliverable ? (
                <div className="pincode-summary">
                  <p className="pincode-status valid">
                    ✅ Delivering to <strong>{checkPin}</strong> ({city}) — Estimated delivery by <strong>{deliveryDate}</strong>
                  </p>
                  <span className="partner">Delivery by: NA</span>
                  <button className="change-pin-btn" onClick={() => setPinSaved(false)}>Change PIN</button>
                </div>
              ) : (
                <div className="pincode-summary">
                  <img src="https://i.imgur.com/llF5iyg.png" alt="No delivery" width="200" />
                  <p className="pincode-status invalid">❌ Delivery not available to <strong>{checkPin}</strong></p>
                  <button className="change-pin-btn" onClick={() => setPinSaved(false)}>Try Another PIN</button>
                </div>
              )}
            </>
          )}

         <div className="about-product">
  <h3>About this item</h3>
  <p>{state.about}</p>

  {state.highlights?.length > 0 && (
    <>
      <h4>Highlights:</h4>
      <ul>
        {state.highlights.map((highlight, index) => (
          <li key={index}>{highlight}</li>
        ))}
      </ul>
    </>
  )}
</div>


        </div>

        <div className="buy-now-buttons">
          {isAddedToCart ? (
            <>
              <button className="add-cart-btn go-to-cart" onClick={handleGoToCart}>Go to Cart</button>
              {cartMessage && <span className="added-msg">{cartMessage}</span>}
            </>
          ) : (
            <button className="add-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
          )}
          <button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>

      {showLoginModal && (
        <LoginSignupModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={() => {
            setShowLoginModal(false);
            onLoginSuccess?.();
            navigate('/address', { state });
          }}
        />
      )}

      {zoomedImage && (
        <div className="zoom-modal" onClick={() => setZoomedImage(null)}>
          <img src={zoomedImage} alt="Zoomed" className="zoomed-img" />
        </div>
      )}
    </div>
  );
};

export default BuyNowPage;
