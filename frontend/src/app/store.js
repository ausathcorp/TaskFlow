import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/register/authSlice'
import api from '@/features/auth/register/api'
export default configureStore({
    reducer: {
        auth: authReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(api.middleware)
})