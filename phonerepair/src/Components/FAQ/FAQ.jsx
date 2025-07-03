import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FAQ.css";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <div className="faq-icon">{isOpen ? "×" : "+"}</div>
        <h2>{question}</h2>
      </div>
      {isOpen && <p className="faq-answer">{answer}</p>}
    </div>
  );
};

const FAQ = () => {
  const navigate = useNavigate();

  return (
    <div className="faqs-container">
      <h1 className="faqs-heading">Most Frequently Asked FAQ's</h1>

      <div className="faq-list">
        <FAQItem
          question="Do you have a revenue share?"
          answer="No, we offer a buy-rate, interchange-plus pricing model giving you the most control over your revenue."
        />
        <FAQItem
          question="Do you have any minimum fees or fixed monthly fees?"
          answer="No minimum fees or fixed monthly fees are charged."
        />
        <FAQItem
          question="Do you charge any PCI DSS program or non-compliance fees?"
          answer="No PCI DSS program or non-compliance fees are charged."
        />
        <FAQItem
          question="Can I set the pricing to my merchants?"
          answer="Yes, you can set your own pricing for your merchants."
        />
        <FAQItem
          question="Are the pricing tiers 'pick a tier' or 'fill a tier'?"
          answer="Our pricing structure supports flexible tier options."
        />
        <FAQItem
          question="Do you charge an ACH volume-based fee?"
          answer="No ACH volume-based fee is charged."
        />
      </div>

      <div className="faq-cta">
        <h2>Still have questions or want to know more?</h2>
        <p>
          We use only the highest quality parts and offer a wide range of repair services,
          from simple screen replacements to complex motherboard repairs.
        </p>
        <button onClick={() => navigate("/contact")}>Contact Us</button>
      </div>
    </div>
  );
};

export default FAQ;
