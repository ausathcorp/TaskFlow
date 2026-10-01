import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { StoreProvider } from './providers'
import { AppThemeProvider } from '@/features/theme'
import { SnackbarProvider } from '@/features/snackbar'

(async() => {
    if (!import.meta.env.DEV)
        return
    let eruda = await import('eruda');
    eruda.init();
})();

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