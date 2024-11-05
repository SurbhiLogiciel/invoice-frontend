import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { hasRegisteredEmail } = useAuth();
  return hasRegisteredEmail ? (
    children
  ) : (
    <Navigate to="/registerEmail" replace />
  );
};

export default ProtectedRoute;
