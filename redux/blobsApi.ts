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
    getBlobs: builder.query<FlowerBlob[], void>({
      query: () => "api/blobs",
      transformResponse: (data: { blobs: FlowerBlob[] }) =>
        data.blobs
          .slice()
          .sort(
            (a, b) =>
              new Date(b.uploadedAt).getTime() -
              new Date(a.uploadedAt).getTime()
          ),
      providesTags: ["FlowerBlobs"],
    }),

    uploadBlob: builder.mutation<any, { file: File; filename: string }>({
      query: ({ file, filename }) => ({
        url: `api/upload?filename=${encodeURIComponent(filename)}`,
        method: "POST",
        body: file,
      }),
      invalidatesTags: ["FlowerBlobs"],
    }),
  }),
});

export const { useGetBlobsQuery, useUploadBlobMutation } = blobsApi;
