import { lazy } from 'react';

const Login = lazy(() => import('@/pages/login'));

const PublicRoutes = {
  path: '/',
  children: [
    {
      path: '/login',
      element: <Login />,
    },
  ],
};

export default PublicRoutes;
