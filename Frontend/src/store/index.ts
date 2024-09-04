// src/app/store.ts
import { notesApi } from '@/features/note/notesAPI';
import { configureStore } from '@reduxjs/toolkit';
import noteReducer from "@/features/note/note-slice"
import { fileApi } from '@/features/file/fileApi';
export const store = configureStore({
    reducer: {
        notekṅḥfds: noteReducer,
        [notesApi.reducerPath]: notesApi.reducer,
        [fileApi.reducerPath]: fileApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(notesApi.middleware).concat(fileApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
