import { authApi } from './services/auth.service';
import { chatApi } from './services/chat.service';

const middlewares = [authApi.middleware, chatApi.middleware];

export default middlewares;
