import { Outlet, Navigate, useParams } from 'react-router-dom';
import { getLocaleToken } from '../functions/getLocaleToken';
import { takeRoleFromJwt } from '../functions/jwtRetriever';

interface ProtectedRouteProps {
    requiredRole?: 'User' | 'Admin';
  }
  
  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const jwt = getLocaleToken();
  const userRole = takeRoleFromJwt(jwt)===null?'':takeRoleFromJwt(jwt);

  if (!userRole) {
    return <Navigate to="/" replace />;
  }
  else if (requiredRole !==userRole) {
    return <Navigate to="/not-found" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;