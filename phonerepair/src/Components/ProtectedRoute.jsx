// Components/ProtectedRoute.jsx
import React from 'react';

const ProtectedRoute = ({ isLoggedIn, children, onLoginRequired }) => {
  if (!isLoggedIn) {
    onLoginRequired(); // Opens the login modal
    return null;        // Don't render the page content
  }

  return children;
};

export default ProtectedRoute;
