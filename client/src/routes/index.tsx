import { useRoutes } from 'react-router-dom';

import UserRoutes from '@/routes/UserRoutes';

export default function Routes() {
  return useRoutes([UserRoutes]);
}
