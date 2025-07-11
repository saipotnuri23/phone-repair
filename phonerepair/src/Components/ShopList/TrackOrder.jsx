import React, { useEffect, useState } from "react";
import "./TrackOrder.css";
import {
  FaClipboardList,
  FaTools,
  FaCheckCircle,
  FaTruck,
  FaStore,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaClock,
} from "react-icons/fa";

const TrackOrder = () => {
  const orderData = JSON.parse(localStorage.getItem("orderData"));
  const issues = orderData?.issues || [];
  const shop = orderData?.shop || null;

  const steps = [
    { label: "Requested", icon: <FaClipboardList /> },
    { label: "Testing", icon: <FaTools /> },
    { label: "Repaired", icon: <FaCheckCircle /> },
    { label: "Delivery", icon: <FaTruck /> },
  ];

  const currentStep = 2; // Change this dynamically in real use
  const isOrderAvailable = shop && issues.length > 0;

  // Expected delivery setup
  const expectedDelivery = new Date();
  expectedDelivery.setDate(expectedDelivery.getDate() + 2);
  expectedDelivery.setHours(18, 0, 0);
  const formattedExpected = expectedDelivery.toLocaleString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // Order date
  const orderDate = orderData?.orderDate
    ? new Date(orderData.orderDate)
    : new Date();
  const formattedOrder = orderDate.toLocaleString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // Status logic
  const now = new Date();
  const isDelivered = now > expectedDelivery;
  const deliveryStatus = isDelivered
    ? `Delivered on ${formattedExpected}`
    : "In Progress";

  // Countdown Timer
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    if (isDelivered) return;
    const timer = setInterval(() => {
      const diff = expectedDelivery - new Date();
      if (diff <= 0) {
        clearInterval(timer);
        setCountdown("00:00:00");
        return;
      }
      const hrs = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);
      setCountdown(
        `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
      );
    }, 1000);
    return () => clearInterval(timer);
  }, [isDelivered, expectedDelivery]);

  return (
  <div className="track-order-container">
    <h2 className="track-heading">Track Your Order</h2>

    {isOrderAvailable ? (
      <>
        {/* Stepper first */}
        <div className="modern-stepper">
          {steps.map((step, index) => (
            <div key={index} className="step-wrapper">
              <div className={`step-circle ${index <= currentStep ? "active" : ""}`}>
                {step.icon}
              </div>
              {index < steps.length - 1 && (
                <div className={`step-line ${index < currentStep ? "filled" : ""}`} />
              )}
              <div className={`step-title ${index <= currentStep ? "active" : ""}`}>
                {step.label}
              </div>
            </div>
          ))}
        </div>

        
        <div className="order-info">
          <p><FaTools className="icon" /> <strong>Selected Issues:</strong> <span>{issues.join(", ")}</span></p>

          <p><FaStore className="icon" /> <strong>Repair Shop:</strong> <span>{shop.name}</span></p>
<p><FaMapMarkerAlt className="icon" /> <strong>Location:</strong> <span>{shop.location}</span></p>
<p><FaRupeeSign className="icon" /> <strong>Price:</strong> <span>₹{shop.price}</span></p>
<p><FaClock className="icon" /> <strong>Order Date:</strong> <span>{formattedOrder}</span></p>
<p><FaClock className="icon" /> <strong>Expected Delivery:</strong> <span>{formattedExpected}</span></p>
<p><FaCheckCircle className="icon" /> <strong>Status:</strong> <span>{deliveryStatus}</span></p>
{!isDelivered && (
  <p><FaClock className="icon" /> <strong>Time Left:</strong> <span>{countdown}</span></p>
)}

        </div>
      </>
    ) : (
      <div className="no-order">
        <p><strong>Currently no orders available...</strong></p>
      </div>
    )}
  </div>
);

};

export default TrackOrder;
