import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { store } from '@/store';

import { verifyToken, setSession } from '@/lib/helper';

interface State {
  isLoggedIn: boolean;
  isInitialized: boolean;
}

const initialState: State = {
  isLoggedIn: true,
  isInitialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      setSession(null);
    },
    initialize(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isInitialized = true;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

export const { login, logout, initialize } = authSlice.actions;

export default authSlice.reducer;

export const initStore = () => {
  try {
    const accessToken = window.localStorage.getItem('accessToken');
    if (accessToken && verifyToken(accessToken)) {
      setSession(accessToken);
      store.dispatch(
        initialize({
          isLoggedIn: true,
        })
      );
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
