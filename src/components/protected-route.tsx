import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, hasAccess } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (allowedRoles && !hasAccess(allowedRoles)) {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
}