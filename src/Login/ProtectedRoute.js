import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isAuthenticated, redirectPath }) => {
  return isAuthenticated ? (
    element
  ) : (
    <Navigate to={redirectPath} />
  );
};

export default ProtectedRoute;
