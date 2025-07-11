import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaBars,
  FaBell,
  FaBoxOpen,
  FaClipboardList,
  FaInfoCircle,
  FaSignOutAlt,
  FaShoppingCart
} from 'react-icons/fa';
import logo from '../../assets/Logo.png';
import './Navbar.css';

const Navbar = ({ onLoginClick, isLoggedIn }) => {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3); // Example count
  const [cartCount, setCartCount] = useState(0); // New: cart item count
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    setUser(savedUser);
  }, [isLoggedIn]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cartItems.length);
  }, [isLoggedIn]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    setUser(null);
    setShowConfirmLogout(false);
    window.location.reload();
  };

  const handleMenuClick = (action) => {
    setShowMenu(false);
    switch (action) {
      case 'notifications':
        setNotificationCount(0);
        navigate('/notifications');
        break;
        case 'responses':
  navigate('/responded-offers');
  break;

      case 'track':
        navigate('/track-order');
        break;
      case 'orders':
        navigate('/my-orders');
        break;
      case 'cart':
        navigate('/cart');
        break;
      case 'about':
        navigate('/about');
        break;
      case 'logout':
        setShowConfirmLogout(true);
        break;
      default:
        break;
    }
  };

  const getInitials = (name) => {
    if (!name) return '';
    const matches = name.match(/([A-Z])/g) || name.match(/\b\w/g);
    return matches.join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="Navbar">
      <img src={logo} alt="Logo" className="logo" />
      <ul className="Navbar-menu">
        <li><NavLink to="/" end className={({ isActive }) => isActive ? 'Active' : ''}>Home</NavLink></li>
        <li><NavLink to="/services" className={({ isActive }) => isActive ? 'Active' : ''}>Services</NavLink></li>
        <li><NavLink to="/accessories" className={({ isActive }) => isActive ? 'Active' : ''}>Accessories</NavLink></li>
        <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'Active' : ''}>Contact us</NavLink></li>
        <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? 'Active' : ''}>Dashboard</NavLink></li>
        <li><NavLink to="/faq" className={({ isActive }) => isActive ? 'Active' : ''}>FAQs</NavLink></li>
        <li>
          {isLoggedIn && user ? (
            <div className="menu-dropdown-container" ref={menuRef}>
              <span className="username">{getInitials(user.name)}</span>
              <FaBars className="menu-icon" onClick={() => setShowMenu(!showMenu)} />
              {showMenu && (
                <div className="dropdown-menu">
                  <div className="dropdown-item-with-badge" onClick={() => handleMenuClick('notifications')}>
                    <FaBell className="dropdown-icon" />
                    Notifications
                    {notificationCount > 0 && (
                      <span className="notification-badge">{notificationCount}</span>
                    )}
                  </div>

                  <div className="dropdown-item-with-badge" onClick={() => handleMenuClick('cart')}>
                    <FaShoppingCart className="dropdown-icon" />
                    My Cart
                    {cartCount > 0 && (
                      <span className="notification-badge">{cartCount}</span>
                    )}
                  </div>

                  <div onClick={() => handleMenuClick('track')}>
                    <FaBoxOpen className="dropdown-icon" /> Track Your Order
                  </div>
                  <div onClick={() => handleMenuClick('responses')}>
  <FaClipboardList className="dropdown-icon" /> View Responses
</div>


                  <div onClick={() => handleMenuClick('orders')}>
                    <FaClipboardList className="dropdown-icon" /> My Orders
                  </div>

                  <div onClick={() => handleMenuClick('about')}>
                    <FaInfoCircle className="dropdown-icon" /> About Us
                  </div>

                  <div onClick={() => handleMenuClick('logout')}>
                    <FaSignOutAlt className="dropdown-icon" /> Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button onClick={onLoginClick} className="login-btn">Login</button>
          )}
        </li>
      </ul>

      {showConfirmLogout && (
        <div className="logout-modal-overlay">
          <div className="logout-modal">
            <p>Are you sure you want to logout?</p>
            <div className="logout-buttons">
              <button className="confirm-btn" onClick={handleLogout}>Yes, Logout</button>
              <button className="cancel-btn" onClick={() => setShowConfirmLogout(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
