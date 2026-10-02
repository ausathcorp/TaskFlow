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
    })
});

export const { 
    useRegisterMutation,
    useLoginMutation } = api;
export default api;