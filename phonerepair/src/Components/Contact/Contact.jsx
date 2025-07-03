import React from "react";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconPhone,
  IconMail,
  IconMapPin,
} from "@tabler/icons-react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <main className="container">
        <div className="header">
          <h2>Contact Us</h2>
          <p>Any question or remarks? Just write us a message!</p>
        </div>

        <div className="contact-section">
          {/* Left: Info */}
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p className="sub">Say something to start a live chat!</p>
            <div className="info-item">
              <IconPhone size={20} />
              <span>+91 012 3465 789</span>
            </div>
            <div className="info-item">
              <IconMail size={20} />
              <span>support@fixit.com</span>
            </div>
            <div className="info-item">
              <IconMapPin size={20} />
              <span>Sircilla, Hyderabad, Telangana, India.</span>
            </div>

            <div className="social">
              <span>Follow Us</span>
              <a href="#"><IconBrandFacebook size={22} /></a>
              <a href="#"><IconBrandInstagram size={22} /></a>
            </div>
          </div>

          {/* Right: Form */}
          <form className="contact-form">
            <div className="form-row">
              <div className="input-group">
                <label>First Name</label>
                <input type="text" placeholder="First Name" />
              </div>
              <div className="input-group">
                <label>Last Name</label>
                <input type="text" placeholder="Last Name" />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>Email</label>
                <input type="email" placeholder="Email" />
              </div>
              <div className="input-group">
                <label>Phone Number</label>
                <input type="text" placeholder="+91 012 3465 789" />
              </div>
            </div>

            <div className="radio-group">
              <label>Select Subject?</label>
              <div>
                <label><input type="radio" name="subject" defaultChecked /> General Inquiry</label>
                <label><input type="radio" name="subject" /> Complaint</label>
                <label><input type="radio" name="subject" /> Feedback</label>
                <label><input type="radio" name="subject" /> Support</label>
              </div>
            </div>

            <div className="input-group full">
              <label>Message</label>
              <textarea placeholder="Write your message..." rows={4}></textarea>
            </div>

            <div className="submit-btn">
              <button type="submit">Send Message</button>
            </div>
          </form>
        </div>

        {/* Locations */}
        <div className="location-section">
          <h2>Locations near your Area</h2>
          <div className="location-content">
            <div className="map-container">
              <iframe
                title="FixIt Location"
                src="https://www.google.com/maps?q=Sircilla,+Hyderabad,+Telangana,+India&output=embed"
                width="100%"
                height="260"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
            <div className="shop-list">
              <h3>Title - Shops</h3>
              <ul>
                {Array.from({ length: 6 }).map((_, i) => (
                  <li key={i}>
                    <div className="shop-icon"></div>
                    <div>
                      <div className="shop-title">Location-{i + 1}</div>
                      <div className="shop-desc">Description</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
