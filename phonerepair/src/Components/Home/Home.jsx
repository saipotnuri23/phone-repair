import React, { useEffect, useRef } from 'react';
import './Home.css';

import Ipad from '../../assets/Ipad.png';
import android from '../../assets/android.png';
import iphone from '../../assets/iphone.png';
import tablet from '../../assets/tablet.png';
import ipad2 from '../../assets/ipad2.png';
import android1 from '../../assets/android1.png';
import iphone1 from '../../assets/iphone1.png';
import laptop1 from '../../assets/laptop1.png';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const deviceImgs = [iphone1, ipad2, android1, laptop1];

const Home = ({ isLoggedIn, onLoginRequired }) => {
  const navigate = useNavigate();
  const trackRef = useRef(null);

  const handleRepair = () => {
    if (isLoggedIn) {
      navigate('/PhoneModels');
    } else {
      onLoginRequired();
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const ITEM_WIDTH = 340;
      const totalWidth = ITEM_WIDTH * deviceImgs.length * 2;

      gsap.set(trackRef.current, { width: totalWidth });

      gsap.to(trackRef.current, {
        x: -(totalWidth / 2),
        duration: 18,
        ease: 'none',
        repeat: -1
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="home">
        <div className="home-container">
          <div className="left-section">
            <h2>Fast, affordable and reliable repairs...</h2>
            <h3>For your Devices</h3>
            <button onClick={handleRepair}>Book a Repair</button>
          </div>

          <div className="divider"></div>

          <div className="right-section">
            <div className="device-track-wrapper large">
              <div className="device-track" ref={trackRef}>
                {deviceImgs.concat(deviceImgs).map((src, i) => (
                  <img key={i} src={src} alt="device" className="device-img large" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="feature-section">
        <div className="feature-card">
          <i className="fas fa-tools"></i>
          <h4>Trusted Professionals</h4>
          <p>Rely on our team of professional technicians. We have a vast network of experts ready to assist you.</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-sync-alt"></i>
          <h4>Quick Turnaround</h4>
          <p>We aim to return your device as swiftly as possible.</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-cogs"></i>
          <h4>Repair</h4>
          <p>Unsure about the issue with your device? Don't worry, we often complete repairs in 30 minutes or less.</p>
        </div>
      </div>

      <section className="repairs-section">
        <h2>All kinds of repairs</h2>
        <div className="repairs-grid">
          <div className="repair-card">
            <img src={iphone} alt="iPhone" />
            <h4>IPHONE</h4>
            <p>Cracked screens, water damage, battery problems, and more.</p>
          </div>
          <div className="repair-card">
            <img src={Ipad} alt="iPad" />
            <h4>IPAD</h4>
            
            <p>Cracked screens, battery problems, and software issues.</p>
          </div>
          <div className="repair-card">
            <img src={android} alt="Android phone" />
            <h4>ANDROID</h4>
            <p>We can do complex repairs like motherboard replacements.</p>
          </div>
          <div className="repair-card">
            <img src={tablet} alt="Tablet" />
            <h4>TABLET</h4>
            <p>Fast and cost-effective solutions for all kinds of tablets.</p>
          </div>
        </div>
      </section>

      <section className="cta-panel">
        <h3>Get Your Mobile Device Repaired Today!</h3>
        <p>
          We use only the highest-quality parts and offer a wide range of repair
          services, from simple screen replacements to complex motherboard repairs.
          We also offer same-day repairs in most cases!
        </p>
        <button onClick={handleRepair}>Book a Repair</button>
      </section>
    </>
  );
};

export default Home;
