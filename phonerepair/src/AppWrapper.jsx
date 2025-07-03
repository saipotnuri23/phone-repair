import React from 'react';
import { useLocation } from 'react-router-dom';
import App from './App'; 

const AppWrapper = () => {
  const location = useLocation();
  const hideFooter = location.pathname === '/login';
  return <App hideFooter={hideFooter} />;
};

export default AppWrapper;
