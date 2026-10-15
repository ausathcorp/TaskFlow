import { 
    createApi, 
    fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const { VITE_API_URL = 'http://localhost:5000/api' } = import.meta.env;

const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_API_URL,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (body) => ({
                url: '/auth/register',
                method: 'POST',
                body
            })
        }),
        login: builder.mutation({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body
            })
        }),
        forgotPassword: builder.mutation({
            query: (body) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body
            })
        }),
        resetPassword: builder.mutation({
            query: ({token, data}) => ({
                url: `/auth/reset-password?token=${token}`,
                method: 'POST',
                body: data
            })
        })
    })
});

export const { 
    useRegisterMutation,
    useLoginMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation } = api;
export default api;