import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ path, element }) => {
  const location = useLocation();
  const isAdmin = localStorage.getItem('role') === 'admin';

  if (!isAdmin) {
    alert("Please login first!");
    return (
      <Navigate
        to="/"
        state={{ from: location }}
        replace
      />
    );
  }

  return element;
};

export default AdminRoute;