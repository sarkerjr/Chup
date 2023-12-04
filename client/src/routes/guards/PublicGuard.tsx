import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// project imports
import useAuth from '@/hooks/useAuth';

const PublicGuard = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/chat', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return <Outlet />;
};

export default PublicGuard;
