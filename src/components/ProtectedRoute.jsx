
import { Navigate } from 'react-router-dom';
import { useContext } from 'react'

import AuthContext from '../context/auth/AuthContext'

const ProtectedRoute = ({ children }) => {

  
  const context = useContext(AuthContext)
  const { check_session_validity} = context;
  const isAuthenticated = check_session_validity();

  if (!isAuthenticated) {
    // if not logged in, redirect to /login
    return <Navigate to="/login" replace />;
  }

  // otherwise, render the child component(s)
  return children;
};

export default ProtectedRoute;
