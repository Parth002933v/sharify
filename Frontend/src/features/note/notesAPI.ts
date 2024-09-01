import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type TNote = {
    hashID: string;
    content: string;
    noteType: "lexical" | "markdown";
    owner?: string;
    isProtected: boolean;
};

type TNoteRespose = {
    statusCode: number,
    message: string,
    data: TNote
}

export const notesApi = createApi({
    reducerPath: 'notesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
    tagTypes: ['Note'],
    endpoints: (builder) => ({
        createNote: builder.mutation<TNote, Partial<TNote> & Pick<TNote, "hashID"> & Pick<TNote, "content">>({
            query: (newNote) => ({
                url: "api/note",
                method: "POST",
                body: newNote,
            }),
            invalidatesTags: [{ type: 'Note', id: 'LIST' }],
        }),
        fetchNote: builder.query<TNoteRespose, string>({
            query: (hashID: string) => ({
                method: "GET",
                url: `api/note/${hashID}`,
            }),
            providesTags: (_result, _error, id) => [{ type: 'Note', id }],
        }),
        checkNoteExist: builder.query<TNoteRespose, string>({
            query: () => ({
                method: "GET",
                url: "api/note/check"
            }),
            providesTags: (_result, _error, id) => [{ type: 'Note', id: id }],

        })
    })
});

export const { useCreateNoteMutation, useFetchNoteQuery, useCheckNoteExistQuery } = notesApi;
