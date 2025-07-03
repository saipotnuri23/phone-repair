import React from 'react';
import './Services.css';
import about from '../../assets/about.jpg';

const Services = () => {
  return (
    <div className="about-section">
      <div className="about-left">
        <h1>About Us</h1>
        <p className="about-description">
          We are open as a team and as a product. We act like owners and empower each other.
          Life is short, so we build something meaningful. We believe in honesty, kindness, and high standards.
        </p>
        <button className="learn-more-btn">Learn More</button>
      </div>
      <div className="about-right">
        <img src={about} alt="Team illustration" />
      </div>
    </div>
  );
};

export default Services;
