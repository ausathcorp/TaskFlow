import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { StoreProvider } from './providers'
import { AppThemeProvider } from '@/features/theme'
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <StoreProvider>
            <AppThemeProvider>
                <RouterProvider router={router} />
            </AppThemeProvider>
        </StoreProvider>
    </StrictMode>
);