import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { store } from '@/store';

import { LoggedInUser } from '@/lib/types';
import { verifyToken, setSession, decodeToken } from '@/lib/helper';

interface State {
  isLoggedIn: boolean;
  user: LoggedInUser | null;
}

const initialState: State = {
  isLoggedIn: true,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.isLoggedIn = true;
      state.user = decodeToken(action.payload).user;
    },
    logout(state) {
      state.isLoggedIn = false;
      setSession(null);
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

export const initStore = () => {
  try {
    const accessToken = window.localStorage.getItem('accessToken');
    if (accessToken && verifyToken(accessToken)) {
      setSession(accessToken);
      store.dispatch(login(accessToken));
    } else {
      store.dispatch(logout());
    }
  } catch (err) {
    store.dispatch(logout());
  }
};

export const logoutUser = () => {
  setSession(null);
  store.dispatch(logout());
};
