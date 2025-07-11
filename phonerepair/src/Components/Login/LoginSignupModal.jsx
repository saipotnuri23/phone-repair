import React, { useState } from 'react';
import './LoginSignupModal.css';

const LoginSignupModal = ({ isOpen, onClose, onLoginSuccess }) => {
  if (!isOpen) return null;

  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [contact, setContact] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [slide, setSlide] = useState(1);
  const [errors, setErrors] = useState({});

  const resetFields = () => {
    setUsername('');
    setContact('');
    setName('');
    setEmail('');
    setOtp('');
    setGeneratedOtp('');
    setOtpVerified(false);
    setSlide(1);
    setErrors({});
  };

  const handleClose = () => {
    resetFields();
    setIsSignup(false);
    onClose();
  };

  const switchMode = () => {
    resetFields();
    setIsSignup(!isSignup);
  };

  const isEmail = (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
  const isMobile = (input) => /^\d{10}$/.test(input);

  const handleLogin = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (slide === 1) {
      if (!username.trim()) newErrors.username = 'Please enter your name.';
      if (!contact.trim()) {
        newErrors.contact = 'Please enter valid email or mobile number.';
      } else if (!isEmail(contact) && !isMobile(contact)) {
        newErrors.contact = isNaN(contact) ? 'Please enter valid email ID.' : 'Please enter valid mobile number.';
      }

      if (Object.keys(newErrors).length > 0) return setErrors(newErrors);

      const otpGen = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(otpGen);
      setSlide(2);
      alert(`Your OTP is: ${otpGen}`);
    } else if (slide === 2) {
      if (!otp.trim()) {
        return setErrors({ otp: 'Please enter OTP' });
      }
      if (otp !== generatedOtp) {
        return setErrors({ otp: 'Invalid OTP' });
      }
      const userData = { name: username, contact };
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', 'true');
      resetFields();
      onClose();
      if (onLoginSuccess) onLoginSuccess();
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!name.trim()) newErrors.name = 'Please enter your name.';
    if (!email.trim() || !isEmail(email)) newErrors.email = 'Please enter a valid email.';
    if (!isMobile(contact)) newErrors.contact = 'Please enter a valid 10-digit phone number.';
    if (!otpVerified) newErrors.otp = 'Please verify OTP.';

    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);

    const userData = { name, phone: contact, email };
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
    resetFields();
    setIsSignup(false);
    onClose();
    if (onLoginSuccess) onLoginSuccess();
  };

  const getContactIcon = () => {
    if (!contact) return 'fas fa-question-circle';
    return isMobile(contact) ? 'fas fa-mobile-alt' : 'fas fa-envelope';
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card-wrapper">
        <div className={`modal-card ${isSignup ? 'flip' : ''}`}>
          {/* LOGIN */}
          <div className="modal-page front">
            <div className="left-panel">
              <h1>WELCOME back</h1>
              <p>Join us to explore more features.</p>
              <div className="mobile-buttons">
                <div className="mobile-button back-btn" />
                <div className="mobile-button home-btn" />
                <div className="mobile-button recent-btn" />
              </div>
            </div>
            <div className="form-panel">
              <h2>Login</h2>
              <form onSubmit={handleLogin}>
                {slide === 1 && (
                  <>
                    <div className={`input-icon ${errors.username ? 'error-border' : ''}`}>
                      <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          setErrors({ ...errors, username: '' });
                        }}
                      />
                      <i className="fas fa-user" />
                    </div>
                    {errors.username && <p className="error">{errors.username}</p>}

                    <div className={`input-icon ${errors.contact ? 'error-border' : ''}`}>
                      <input
                        type="text"
                        placeholder="Email or Mobile Number"
                        value={contact}
                        onChange={(e) => {
                          setContact(e.target.value);
                          setErrors({ ...errors, contact: '' });
                        }}
                      />
                      <i className={getContactIcon()} />
                    </div>
                    {errors.contact && <p className="error">{errors.contact}</p>}

                    <button type="submit">Send OTP</button>
                  </>
                )}
                {slide === 2 && (
                  <>
                    <div className={`input-icon ${errors.otp ? 'error-border' : ''}`}>
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => {
                          setOtp(e.target.value);
                          setErrors({ ...errors, otp: '' });
                        }}
                      />
                    </div>
                    {errors.otp && <p className="error">{errors.otp}</p>}
                    <button type="submit">Login</button>
                  </>
                )}
              </form>
              <div className="bottom-switch">
                Don't have an account?<span onClick={switchMode}> Sign Up</span>
              </div>
            </div>
          </div>

          {/* SIGNUP */}
          <div className="modal-page back">
            <div className="left-panel">
              <h1>Hello, WELCOME!</h1>
              <p>Join us to explore more features.</p>
              <div className="mobile-buttons">
                <div className="mobile-button back-btn" />
                <div className="mobile-button home-btn" />
                <div className="mobile-button recent-btn" />
              </div>
            </div>
            <div className="form-panel">
              <h2>Sign Up</h2>
              <form onSubmit={handleSignup}>
                <div className={`input-icon ${errors.name ? 'error-border' : ''}`}>
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors({ ...errors, name: '' });
                    }}
                  />
                  <i className="fas fa-user" />
                </div>
                {errors.name && <p className="error">{errors.name}</p>}

                <div className={`input-icon ${errors.contact ? 'error-border' : ''}`}>
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={contact}
                    maxLength={10}
                    onChange={(e) => {
                      setContact(e.target.value.replace(/\D/g, ''));
                      setGeneratedOtp('');
                      setOtp('');
                      setOtpVerified(false);
                      setErrors({ ...errors, contact: '' });
                    }}
                  />
                  <i className="fas fa-mobile-alt" />
                </div>
                {errors.contact && <p className="error">{errors.contact}</p>}

                {contact.length === 10 && generatedOtp === '' && (
                  <button
                    type="button"
                    className="small-button"
                    onClick={() => {
                      const otp = Math.floor(1000 + Math.random() * 9000).toString();
                      setGeneratedOtp(otp);
                      alert(`Your OTP is: ${otp}`);
                      setErrors({});
                    }}
                  >
                    Send OTP
                  </button>
                )}

                {generatedOtp && (
                  <div className="otp-verify-group">
                    <div className={`input-icon ${errors.otp ? 'error-border' : ''}`}>
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => {
                          setOtp(e.target.value);
                          setErrors({ ...errors, otp: '' });
                        }}
                        disabled={otpVerified}
                      />
                      <i className="fas fa-key" />
                    </div>
                    {!otpVerified && (
                      <button
                        type="button"
                        className="verify-button"
                        onClick={() => {
                          if (otp === generatedOtp) {
                            setOtpVerified(true);
                            setErrors({});
                          } else {
                            setErrors({ otp: 'Please enter valid OTP' });
                          }
                        }}
                      >
                        Verify OTP
                      </button>
                    )}
                    {otpVerified && <span className="verified-text">✅ Verified</span>}
                  </div>
                )}
                {errors.otp && <p className="error">{errors.otp}</p>}

                <div className={`input-icon ${errors.email ? 'error-border' : ''}`}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors({ ...errors, email: '' });
                    }}
                  />
                  <i className="fas fa-envelope" />
                </div>
                {errors.email && <p className="error">{errors.email}</p>}

                <button type="submit">Sign Up</button>
              </form>
              <div className="bottom-switch">
                Already have an account?<span onClick={switchMode}> Login</span>
              </div>
            </div>
          </div>
        </div>
        <button className="close-btn" onClick={handleClose}>×</button>
      </div>
    </div>
  );
};

export default LoginSignupModal;