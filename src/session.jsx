// src/components/Session.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const Session = ({ children }) => {
  const location = useLocation();
  const user = JSON.parse(sessionStorage.getItem('user'));

  // If there's no user in session storage, redirect to login
  if (!user) {
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  }

  // User is authenticated, render the children
  return children;
};

export default Session;
