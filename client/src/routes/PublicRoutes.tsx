import { lazy } from 'react';

import Loadable from '@/components/Loadable';
import PublicGuard from '@/routes/guards/PublicGuard';

const Login = Loadable(lazy(() => import('@/pages/login')));
const Register = Loadable(lazy(() => import('@/pages/register')));

const PublicRoutes = {
  path: '/',
  element: <PublicGuard />,
  children: [
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/',
      element: <Login />,
    },
  ],
};

export default PublicRoutes;
