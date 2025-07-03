import React, { useState } from 'react';
import './AddressPage.css';
import { useNavigate } from 'react-router-dom';

const AddressPage = () => {
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    pincode: '',
    locality: '',
    fullAddress: '',
    city: '',
    state: '',
    landmark: '',
    alternatePhone: '',
    addressType: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });

    // Clear error for the field when user types
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = () => {
    const newErrors = {};
    const requiredFields = ['name', 'phone', 'pincode', 'locality', 'fullAddress', 'city', 'state', 'addressType'];

    requiredFields.forEach((field) => {
      if (!address[field]?.trim()) {
        newErrors[field] = 'Please enter the required field';
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate('/payment');
    }
  };

  return (
    <div className="address-container">
      <h3>ADD YOUR ADDRESS</h3>

      <div className="row">
        <div className="input-group">
          <input name="name" placeholder="Name" value={address.name} onChange={handleChange} />
          {errors.name && <p className="input-error">{errors.name}</p>}
        </div>
        <div className="input-group">
          <input name="phone" placeholder="10-digit mobile number" value={address.phone} onChange={handleChange} />
          {errors.phone && <p className="input-error">{errors.phone}</p>}
        </div>
      </div>

      <div className="row">
        <div className="input-group">
          <input name="pincode" placeholder="Pincode" value={address.pincode} onChange={handleChange} />
          {errors.pincode && <p className="input-error">{errors.pincode}</p>}
        </div>
        <div className="input-group">
          <input name="locality" placeholder="Locality" value={address.locality} onChange={handleChange} />
          {errors.locality && <p className="input-error">{errors.locality}</p>}
        </div>
      </div>

      <div className="input-group full-width">
        <textarea
          name="fullAddress"
          placeholder="Address (Area and Street)"
          value={address.fullAddress}
          onChange={handleChange}
        />
        {errors.fullAddress && <p className="input-error">{errors.fullAddress}</p>}
      </div>

      <div className="row">
        <div className="input-group">
          <input name="city" placeholder="City/District/Town" value={address.city} onChange={handleChange} />
          {errors.city && <p className="input-error">{errors.city}</p>}
        </div>
        <div className="input-group">
          <select name="state" value={address.state} onChange={handleChange}>
            <option value="">--Select State--</option>
            <option>Andhra Pradesh</option>
            <option>Telangana</option>
            <option>Karnataka</option>
            <option>Tamil Nadu</option>
            <option>Maharashtra</option>
            <option>Kerala</option>
          </select>
          {errors.state && <p className="input-error">{errors.state}</p>}
        </div>
      </div>

      <div className="row">
        <input name="landmark" placeholder="Landmark (Optional)" value={address.landmark} onChange={handleChange} />
        <input name="alternatePhone" placeholder="Alternate Phone (Optional)" value={address.alternatePhone} onChange={handleChange} />
      </div>

      <div className="address-type">
        <label>
          <input type="radio" name="addressType" value="Home" checked={address.addressType === 'Home'} onChange={handleChange} /> Home
        </label>
        <label>
          <input type="radio" name="addressType" value="Work" checked={address.addressType === 'Work'} onChange={handleChange} /> Work
        </label>
        {errors.addressType && <p className="input-error">{errors.addressType}</p>}
      </div>

      <div className="actions">
        <button className="save-btn" onClick={handleSubmit}>DELIVER HERE</button>
      </div>
    </div>
  );
};

export default AddressPage;
