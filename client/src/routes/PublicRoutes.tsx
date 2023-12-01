import { lazy } from 'react';

import Loadable from '@/components/Loadable';

const Login = Loadable(lazy(() => import('@/pages/login')));
const Register = Loadable(lazy(() => import('@/pages/register')));

const PublicRoutes = {
  path: '/',
  children: [
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
  ],
};

export default PublicRoutes;
