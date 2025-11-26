import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type FlowerBlob = {
  downloadUrl: string;
  pathname: string;
  size: number;
  uploadedAt: string;
  url: string;
};


export const blobsApi = createApi({
  reducerPath: "blobsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["FlowerBlobs"],
  endpoints: (builder) => ({
    // don't need to GET blobs. Use flowers API to get associated blobs by imageUrl.
    uploadBlob: builder.mutation< {url: string}, { file: File; filename: string }>({
      query: ({ file, filename }) => ({
        url: `api/blobs?filename=${encodeURIComponent(filename)}`,
        method: "POST",
        body: file,
      }),
      invalidatesTags: ["FlowerBlobs"],
    }),

    deleteBlob: builder.mutation<void, { url: string }>({
      query: ({ url }) => ({
        url: `api/blobs?url=${encodeURIComponent(url)}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FlowerBlobs"],
    }),
  }),
});

export const {  useUploadBlobMutation, useDeleteBlobMutation } = blobsApi;
