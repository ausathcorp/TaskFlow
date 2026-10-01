import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/shared/services/authSlice'
import api from '@/features/auth/shared/services/api'
export default configureStore({
    reducer: {
        auth: authReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(api.middleware)
})