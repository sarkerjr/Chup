import { useEffect } from 'react';

import { useSelector } from '@/store';
import { initStore } from '@/store/slices/auth.slice';

const useAuth = () => {
  const { isLoggedIn, isInitialized } = useSelector((state) => state.auth);

  useEffect(() => {
    initStore();
  }, []);

  return { isLoggedIn, isInitialized };
};

export default useAuth;
