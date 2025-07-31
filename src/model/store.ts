import { configureStore } from '@reduxjs/toolkit';

import { scheduleSlice } from '@/controllers/scheduleSlice';
import { userSlice } from '@the7ofdiamonds/gateway';

export const store = configureStore({
    reducer: {
        schedule: scheduleSlice.reducer,
        users: userSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;