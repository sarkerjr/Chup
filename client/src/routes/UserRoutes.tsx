import { lazy } from 'react';

import UserGuard from '@/routes/guards/UserGuard';

const Chats = lazy(() => import('@/pages/chats'));

const UserRoutes = {
  path: '/',
  element: <UserGuard />,
  children: [
    {
      path: '/chat',
      element: <Chats />,
    },
  ],
};

export default UserRoutes;
