import React from 'react'
import './Footer.css';

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-column1">
            <h4><i className="fas fa-mobile-alt"></i> Popular Brands</h4>
            <ul>
              <li>Apple</li>
              <li>Samsung</li>
              <li>Xiaomi</li>
              <li>Realme</li>
              <li>Oppo</li>
              <li>Huawei</li>
              <li>Infinix</li>
              <li>Nokia</li>
              <li>Oneplus</li>
              <li>Google</li>
            </ul>
          </div>
          <div className="footer-column2">
            <h4><i className="fas fa-tablet-alt"></i> Popular Mobiles</h4>
              <ul>
              <li>iPhone 15 Pro</li>
              <li>Samsung Galaxy S22</li>
              <li>OnePlus 12R</li>
              <li>Realme C67</li>
              <li>Oppo A18</li>
              <li>Xiaomi Redmi Note 13</li>
              <li>Samsung Galaxy S23</li>
              <li>Infinix Hot 40 Pro</li>
            </ul>
          </div>
          <div className="footer-column3">
            <h4>Want to be a Partner</h4>
            <p>Contact Us</p>
            <div className="subscribe-box">
              <input type="text" placeholder="" />
              <button>Subscribe</button>
            </div>
            <div className="social-icons">
              <span className="icon"><i className="fab fa-facebook-f"></i></span>
              <span className="icon"><i className="fab fa-instagram"></i></span>
              <span className="icon"><i className="fab fa-twitter"></i></span>
              <span className="icon"><i className="fab fa-linkedin-in"></i></span>
            </div>
          </div>
        </div>
        <hr />
        <p className="copyright">Copyright © Ltd. - All Rights Reserved.</p>
      </footer>
    </div>
  )
}

export default Footer
