import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export interface UploadResponse {
    statusCode: number;
    message: string;
    data: {
        fileID: string;
        originalName: string;
        secureUrl: string;
        size: number;
        mimeType: string;
        uploadDate: string;
        downloadCount: number;
        _id: string;
        expiresAt: string;
        __v: number;
    };
}

export const fileApi = createApi({
    reducerPath: 'fileApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    endpoints: (builder) => ({
        uploadFile: builder.mutation<UploadResponse, FormData>({
            query: (formData) => ({
                url: '/api/upload',
                method: 'POST',
                body: formData,

            }),
        }),
        downloadFile: builder.query<Blob, string>({
            query: (fileId) => ({
                url: `api/file/${fileId}`,
                responseType: 'blob',
            }),
        }),
    }),
});

export const { useUploadFileMutation, useDownloadFileQuery } = fileApi;
