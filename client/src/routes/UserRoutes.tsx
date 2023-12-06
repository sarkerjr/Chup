import { lazy } from 'react';

import Loadable from '@/components/Loadable';
import UserGuard from '@/routes/guards/UserGuard';

const Chats = Loadable(lazy(() => import('@/pages/chats')));
const ChatHistory = Loadable(
  lazy(() => import('@/page-sections/chats/ChatHistory'))
);

const UserRoutes = {
  path: '/',
  element: <UserGuard />,
  children: [
    {
      path: '/chat',
      element: <Chats />,
      children: [
        {
          path: ':chatId',
          element: <ChatHistory />,
        },
      ],
    },
  ],
};

export default UserRoutes;
