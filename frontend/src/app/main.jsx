import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { StoreProvider } from './providers'
import { AppThemeProvider } from '@/features/theme'
import { SnackbarProvider } from '@/features/snackbar'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <StoreProvider>
            <AppThemeProvider>
                <SnackbarProvider>
                    <RouterProvider router={router} />
                </SnackbarProvider>
            </AppThemeProvider>
        </StoreProvider>
    </StrictMode>
);