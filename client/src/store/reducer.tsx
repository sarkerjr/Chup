import { combineReducers } from 'redux';

// slices import
import menuSlice from './slices/menu.slice';

const reducer = combineReducers({
  menu: menuSlice,
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
