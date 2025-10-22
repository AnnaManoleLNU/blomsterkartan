import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Flower = {
  id: number;
  name: string;
  imageUrl: string;
  location: string;
  notes?: string | null;
  createdAt: string;
  userId: string;
};

export type NewFlower = {
  name: string;
  imageUrl: string;
  location: string;
  notes?: string | null;
};

export const flowersApi = createApi({
  reducerPath: "flowersApi",
  tagTypes: ["Flower"],
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: (headers) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getFlowers: builder.query<Flower[], void>({
      query: () => "/api/flowers",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Flower" as const, id })),
              { type: "Flower" as const, id: "LIST" },
            ]
          : [{ type: "Flower" as const, id: "LIST" }],
    }),
    addFlower: builder.mutation<Flower, NewFlower>({
      query: (body) => ({
        url: "/api/flowers",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Flower", id: "LIST" }],
    }),
  }),
});

export const { useGetFlowersQuery, useAddFlowerMutation } = flowersApi;
