import React, { useEffect, useState } from "react";
import "./Notifications.css";
import { FaBell, FaClock } from "react-icons/fa";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(stored);
  }, []);

  return (
    <div className="notifications-container">
      <h2 className="notifications-heading">Notifications</h2>

      {notifications.length === 0 ? (
        <div className="no-notifications">
          <FaBell className="no-icon" />
          <p>No notifications yet.</p>
        </div>
      ) : (
        <ul className="notification-list">
          {notifications.map((note, idx) => (
            <li key={idx} className="notification-item">
              <FaBell className="notif-icon" />
              <div className="notif-content">
                <p>{note.message}</p>
                <span className="notif-time">
                  <FaClock /> {note.time}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
