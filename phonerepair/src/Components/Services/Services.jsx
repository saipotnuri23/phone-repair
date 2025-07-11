import React, { useEffect } from "react";
import "./Services.css";
import {
  FaUserTie,
  FaBolt,
  FaGlobe,
  FaThumbsUp,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const services = [
  {
    icon: <FaUserTie />,
    title: "Professional Partners",
    points: [
      "We want the best for our customers and ourselves."," We coach people to their best potential.",
      'That’s why an "Arcader" is both a teammate and a customer.',
    ],
    color: "box2",
  },
  {
    icon: <FaBolt />,
    title: "Fast Service",
    points: [
      "We act like owners.",
      "Let’s empower each other.",
      "If we see something that needs change, we lead through it.",
    ],
    color: "box3",
  },
  {
    icon: <FaGlobe />,
    title: "Online Access",
    points: [
      "We play because we’re a creator tool.",
      "Life is short. Let’s build something meaningful.",
      "We play as a team because great teams build great things together.",
      "We keep those standards high.",
    ],
    color: "box4",
  },
  {
    icon: <FaThumbsUp />,
    title: "Trusted",
    points: [
      "We can be honest and kind.",
      "We can have high standards and be kind.",
      "We can say no and be kind.",
      "Kindness can vary across cultures, upbringings, and languages – but we try our best to be kind.",
    ],
    color: "box5",
  },
];

const Services = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="services-container">
      
      <div className="services-grid">
        {services.map((item, index) => (
          <div
            key={index}
            className={`service-card ${item.color}`}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <ul>
              {item.points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
