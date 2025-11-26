import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Flower } from "./flowersApi";

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  flowers: Flower[];
};

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (id) => `/api/user/${id}`,
    }),
  }),
})

export const { useGetUserQuery } = userApi

