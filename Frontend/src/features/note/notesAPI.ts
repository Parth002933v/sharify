import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export type TNote = {
    hashID: string;
    content: string;
    noteType: "lexical" | "markdown";
    owner?: string;
    isProtected?: boolean;
    publishedURL?: string
};

type TNoteRespose = {
    statusCode: number,
    message: string,
    data: TNote
}
type TNotePublishedRespose = {
    statusCode: number,
    message: string,
    data: {
        "publishedURL": string,
        "hashID": string,
        "noteType": TNote["noteType"],
        "isProtected": boolean,
    }
}

type TFetchNoteProps = {
    hashID: string,
    noteType: TNote["noteType"]
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
        fetchNote: builder.query<TNoteRespose, Partial<TFetchNoteProps> & Pick<TFetchNoteProps, "hashID">>({
            query: ({ hashID, noteType }) => ({
                method: "GET",
                url: `api/note/${hashID}`,
                params: { noteType },
            }),
            providesTags: (_result, _error, { hashID }) => [{ type: 'Note', id: hashID }],
        }),
        checkNoteExist: builder.query<TNoteRespose, string>({
            query: () => ({
                method: "GET",
                url: "api/note/check"
            }),
            providesTags: (_result, _error, id) => [{ type: 'Note', id: id }],

        }),

        publishNote: builder.mutation<TNotePublishedRespose, { hashID: string, noteType: TNote["noteType"] }>({
            query: (value) => ({
                url: "api/note/publish/",
                method: "PATCH",
                body: value,
            }),
            invalidatesTags: [{ type: 'Note', id: 'LIST' }],
        }),
    })
})

export const { useCreateNoteMutation, useFetchNoteQuery, useCheckNoteExistQuery, usePublishNoteMutation } = notesApi;
