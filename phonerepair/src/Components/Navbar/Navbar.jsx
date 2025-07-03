// Navbar.jsx
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/Logo.png';
import './Navbar.css';

const Navbar = ({ onLoginClick, isLoggedIn }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    setUser(savedUser);
  }, [isLoggedIn]); // <-- rerun effect when login status changes

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    setUser(null);
    window.location.reload();
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
            <div className="user-dropdown">
              <span className="username">{getInitials(user.name)}</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <button onClick={onLoginClick} className="login-btn">Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
