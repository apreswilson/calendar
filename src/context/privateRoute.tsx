// components/ProtectedRoute.tsx
import React from 'react';
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/calendar/" />;
  }

  return children;
};

export default ProtectedRoute;