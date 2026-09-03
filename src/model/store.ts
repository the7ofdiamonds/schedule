import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook } from 'react-redux';

import { userSlice } from '@the7ofdiamonds/gateway';

import { scheduleSlice } from '../controllers/scheduleSlice';

export const store = configureStore({
    reducer: {
        schedule: scheduleSlice.reducer,
        users: userSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppSelectorHook = TypedUseSelectorHook<RootState>;