import { authApi } from './services/auth.service';

const middlewares = [authApi.middleware];

export default middlewares;
