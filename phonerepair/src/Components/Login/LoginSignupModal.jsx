import React, { useState } from 'react';
import './LoginSignupModal.css';

const LoginSignupModal = ({ isOpen, onClose, onLoginSuccess }) => {
  if (!isOpen) return null;

  const [isSignup, setIsSignup] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [slide, setSlide] = useState(1);

  const resetFields = () => {
    setPhone('');
    setName('');
    setEmail('');
    setOtp('');
    setOtpError('');
    setGeneratedOtp('');
    setSlide(1);
  };

  const handleSendOTP = () => {
    if (!phone || phone.length !== 10) {
      setOtpError('Enter a valid 10-digit phone number');
      return;
    }

    if (isSignup && (!name || !email)) {
      setOtpError('Please fill all fields');
      return;
    }

    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(randomOtp);
    setOtpError('');
    setSlide(2);
    alert(`Your OTP is: ${randomOtp}`); // demo only
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();

    if (!otp) {
      setOtpError('Enter OTP');
      return;
    }

    if (otp !== generatedOtp) {
      setOtpError('Invalid OTP');
      return;
    }

    const userData = { name, phone, email };
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');

    resetFields();
    setIsSignup(false);
    onClose();
    if (onLoginSuccess) onLoginSuccess();
  };

  const handleClose = () => {
    resetFields();
    setIsSignup(false);
    onClose();
  };

  const switchMode = () => {
    const newMode = !isSignup;
    setIsSignup(newMode);
    resetFields();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card-wrapper">
        <div className={`modal-card ${isSignup ? 'signup-mode' : ''}`}>
          <div className={`left-panel ${isSignup ? 'left-panel-signup' : ''}`}>
            <h1>{isSignup ? 'WELCOME!' : 'WELCOME BACK!'}</h1>
            <p>
              {isSignup
                ? 'Join us to explore more features.'
                : "Let's get you back to fixing your devices."}
            </p>
          </div>

          <div className="form-panel">
            <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>

            <form
              onSubmit={
                slide === 1
                  ? (e) => {
                      e.preventDefault();
                      handleSendOTP();
                    }
                  : handleOTPSubmit
              }
            >
              {slide === 1 && (
                <>
                  <input
                    type="text"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <input
                    type="tel"
                    placeholder="Phone"
                    value={phone}
                    maxLength={10}
                    onChange={(e) => {
                      const onlyNums = e.target.value.replace(/\D/g, '');
                      setPhone(onlyNums);
                    }}
                  />

                  {isSignup && (
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  )}

                  {otpError && <p className="error">{otpError}</p>}
                  <button type="submit">Send OTP</button>
                </>
              )}

              {slide === 2 && (
                <>
                  <div
                    className="top-left-back-arrow"
                    onClick={() => {
                      setOtp('');
                      setSlide(1);
                    }}
                  >
                    <i className="fas fa-arrow-left"></i>
                  </div>

                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value);
                      setOtpError('');
                    }}
                  />

                  {otpError && <p className="error">{otpError}</p>}

                  <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
                </>
              )}
            </form>

            <div className="bottom-switch">
              <p>
                {isSignup ? 'Already have an account?' : "Don't have an account?"}
                <span onClick={switchMode}>
                  {isSignup ? ' Login' : ' Sign Up'}
                </span>
              </p>
            </div>
          </div>
        </div>

        <button className="close-btn" onClick={handleClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default LoginSignupModal;
