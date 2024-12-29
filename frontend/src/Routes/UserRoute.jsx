import React, {useE} from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const UserRoute = ({ path, element }) => {
  const location = useLocation();
  const isUser = localStorage.getItem('role') === 'user';

  if (!isUser) {
    alert("Please login first!");
    return (
      <Navigate
        to="/"
        state = {{ from: location }}
        replace
      />
    );
  }

  return element;
};

export default UserRoute;