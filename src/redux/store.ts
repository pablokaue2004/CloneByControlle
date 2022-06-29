import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './reducers/accountReducer';
import releasesReducer from './reducers/releasesReducer';
import userReducer from './reducers/userReducer';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    user: userReducer,
    releases: releasesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
