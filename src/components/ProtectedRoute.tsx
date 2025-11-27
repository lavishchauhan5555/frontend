import React from 'react';
import { useAuth } from '../context/AuthContext';

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-4">Loading...</div>;

  if (!user) {
    return <div className="p-4 text-red-500">You must log in.</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
