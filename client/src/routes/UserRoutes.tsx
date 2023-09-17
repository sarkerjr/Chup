import { lazy } from 'react';

const Chats = lazy(() => import('@/pages/chats'));

const UserRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <Chats />,
    },
  ],
};

export default UserRoutes;
