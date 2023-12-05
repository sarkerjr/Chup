import { combineReducers } from 'redux';

// slices import
import menuSlice from './slices/menu.slice';
import authSlice from './slices/auth.slice';

// services import
import { authApi } from './services/auth.service';
import { chatApi } from './services/chat.service';

const reducer = combineReducers({
  menu: menuSlice,
  auth: authSlice,

  // services
  [authApi.reducerPath]: authApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer,
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
