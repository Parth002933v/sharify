// src/app/store.ts
import { notesApi } from '@/features/note/notesAPI';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        [notesApi.reducerPath]: notesApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(notesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
