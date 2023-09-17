import { lazy } from 'react';

// import GuestLayout from '@/layouts/GuestLayout';

const Chats = lazy(() => import('@/pages/chats'));

const UserRoutes = {
  path: '/',
  // element: <GuestLayout />,
  children: [
    {
      path: '/',
      element: <Chats />,
    },
  ],
};

export default UserRoutes;
