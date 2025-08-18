
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminAuth');
    if (!token || token !== 'authenticated') {
      navigate('/admin/login', { replace: true });
    }
  }, [navigate]);

  const token = localStorage.getItem('adminAuth');
  if (!token || token !== 'authenticated') {
    return null;
  }

  return <>{children}</>;
}
