import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

// project imports
import useAuth from '@/hooks/useAuth';

const UserGuard = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [isLoggedIn]);

  return <Outlet />;
};

export default UserGuard;
