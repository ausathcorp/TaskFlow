import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { StoreProvider } from './providers'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <StoreProvider>
            <RouterProvider router={router} />
        </StoreProvider>
    </StrictMode>
);