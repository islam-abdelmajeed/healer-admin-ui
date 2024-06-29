import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth.js';

const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to="/" /> : children;
};

export default PublicRoute;
