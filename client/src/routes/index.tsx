import { useRoutes } from 'react-router-dom';

import PublicRoutes from '@/routes/PublicRoutes';
import UserRoutes from '@/routes/UserRoutes';

export default function Routes() {
  return useRoutes([PublicRoutes, UserRoutes]);
}
