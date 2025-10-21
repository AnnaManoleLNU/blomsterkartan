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
  endpoints: (builder) => ({
    getBlobs: builder.query<FlowerBlob[], void>({
      query: () => "api/blobs",
      transformResponse: (data: { blobs: FlowerBlob[] }) =>
        data.blobs
          .slice()
          .sort((a, b) => +new Date(b.uploadedAt) - +new Date(a.uploadedAt)),
    }),
  }),
});

export const { useGetBlobsQuery } = blobsApi;
