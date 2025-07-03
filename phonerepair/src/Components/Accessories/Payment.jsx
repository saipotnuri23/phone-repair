import React, { useState } from 'react';
import './Payment.css';
import phonepe from '../../assets/phonepe.png';
import gpay from '../../assets/gpay.png';
import paytm from '../../assets/paytm.png';

const Payment = () => {
  const [method, setMethod] = useState('UPI');

  // Form States
  const [selectedUPIApp, setSelectedUPIApp] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  // Error States
  const [upiAppError, setUpiAppError] = useState('');
  const [upiError, setUpiError] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [expiryError, setExpiryError] = useState('');
  const [cvvError, setCvvError] = useState('');

  const paymentMethods = [
    'UPI',
    'Credit / Debit / ATM Card',
    'Net Banking',
    'Cash on Delivery'
  ];

  const handlePay = () => {
    // Reset all errors
    setUpiAppError('');
    setUpiError('');
    setCardNumberError('');
    setExpiryError('');
    setCvvError('');

    let valid = true;

    if (method === 'UPI') {
      if (!selectedUPIApp) {
  const upiRegex = /^[\w.-]+@[\w.-]+$/;

  if (!upiId || !upiRegex.test(upiId)) {
    setUpiError('Enter a valid UPI ID.');
    valid = false;
  }
} else {
  // if app selected, we skip UPI ID validation
  setUpiError('');
}

    }

    if (method === 'Credit / Debit / ATM Card') {
      const cardRegex = /^[0-9]{12,19}$/;
      const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      const cvvRegex = /^[0-9]{3}$/;

      if (!cardNumber || !cardRegex.test(cardNumber)) {
        setCardNumberError('Enter a valid card number.');
        valid = false;
      }

      if (!expiry || !expiryRegex.test(expiry)) {
        setExpiryError('Enter valid expiry (MM/YY).');
        valid = false;
      }

      if (!cvv || !cvvRegex.test(cvv)) {
        setCvvError('Enter valid 3-digit CVV.');
        valid = false;
      }
    }

    if (valid) {
      alert('Payment Successful!');
     
    }
  };

  return (
    <div className="payment-wrapper">
      <div className="payment-box">
        
        <div className="payment-methods">
          <h2>Complete Payment</h2>
          <ul className="method-list">
            {paymentMethods.map((item) => (
              <li
                key={item}
                className={method === item ? 'active' : ''}
                onClick={() => setMethod(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        
        <div className="payment-details">
        {method === 'UPI' && (
  <div className="upi-box">
    <label>Select a UPI App</label>
    <div className="upi-options">
      <label className="upi-option">
        <input
          type="radio"
          name="upi"
          checked={selectedUPIApp === 'PhonePe'}
          onChange={() => setSelectedUPIApp('PhonePe')}
        />
        <img src={phonepe} alt="PhonePe" />
        
      </label>

      <label className="upi-option">
        <input
          type="radio"
          name="upi"
          checked={selectedUPIApp === 'GPay'}
          onChange={() => setSelectedUPIApp('GPay')}
        />
        <img src={gpay} alt="GPay" />
        
      </label>

      <label className="upi-option">
        <input
          type="radio"
          name="upi"
          checked={selectedUPIApp === 'Paytm'}
          onChange={() => setSelectedUPIApp('Paytm')}
        />
        <img src={paytm} alt="Paytm" />
        
      </label>
    </div>
    {upiAppError && <p className="input-error">{upiAppError}</p>}

    <label>Enter your UPI ID</label>
    <input
      type="text"
      placeholder="example@upi"
      value={upiId}
      onChange={(e) => setUpiId(e.target.value)}
      onFocus={() => {
        if (!upiId) {
          setSelectedUPIApp('');
        }
      }}
    />
    {upiError && <p className="input-error">{upiError}</p>}

    
    <button className="pay-btn" onClick={handlePay}>
      {selectedUPIApp
        ? `Proceed to Pay with ${selectedUPIApp}`
        : 'Proceed to Pay'}
    </button>
  </div>
)}




          {method === 'Credit / Debit / ATM Card' && (
            <div className="card-box">
              <input
                type="text"
                placeholder="Enter your Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              {cardNumberError && <p className="input-error">{cardNumberError}</p>}

              <div className="row">
                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                  />
                  {expiryError && <p className="input-error">{expiryError}</p>}
                </div>

                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                  {cvvError && <p className="input-error">{cvvError}</p>}
                </div>
              </div>

              <button className="pay-btn" onClick={handlePay}>Proceed to Pay</button>
            </div>
          )}

          {method === 'Net Banking' && (
            <div className="netbanking-box">
              <select>
                <option>Choose your bank</option>
                <option>SBI</option>
                <option>HDFC</option>
                <option>ICICI</option>
                <option>Federal Bank</option>
                <option>Kotak mahindra Bank</option>
                <option>Axis Bank</option>
                <option>Indian Bank</option>
              </select>
              <button className="pay-btn" onClick={handlePay}>Proceed to Pay</button>
            </div>
          )}

          {method === 'Cash on Delivery' && (
            <div className="cod-box">
              <p>Pay by cash at the doorstep.</p>
              <button className="pay-btn" onClick={handlePay}>Place Order</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
