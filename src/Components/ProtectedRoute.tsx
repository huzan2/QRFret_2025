import React from 'react';
import { useAdminStore } from '../store/adminStore';
import PasswordPage from '../Pages/PasswordPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuthenticated = useAdminStore((state) => state.isAuthenticated);
  if (isAuthenticated) {
    return <>{children}</>;
  }
  return <PasswordPage />;
};

export default ProtectedRoute;
