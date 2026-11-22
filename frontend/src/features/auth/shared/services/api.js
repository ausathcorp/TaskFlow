import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSelector } from '@reduxjs/toolkit'

const { VITE_API_URL = "http://localhost:5000/api" } = import.meta.env;

const authApi = createApi({
  reducerPath: "api",
  tagTypes: ['Auth'],
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, data }) => ({
        url: `/auth/reset-password/${token}`,
        method: "POST",
        body: data,
      }),
    }),
    getMe: builder.query({
      query: () => '/auth/me',
      providesTags: ['Auth'],
    }),
  }),
});

const selectGetMeResult = (state) => 
  authApi.endpoints.getMe.select()(state);

export const selectCurrentUser = createSelector(
  [selectGetMeResult],
  ({ data, isFetching, isError }) => ({
    user: data?.user,
    isFetching,
    isError,
  })
);

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetMeQuery,
} = authApi;
export default authApi;
