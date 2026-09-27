import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'

const App = lazy(() => import('./App'))
const FormLayout = lazy(() => import('@/features/auth/register/layouts/Form'));
const RegisterPage = lazy(() => import('@/features/auth/register/Page'));

export default createBrowserRouter([
    { path: '/', element: <App /> },
    {
        element: <FormLayout />,
        children: [
            { path: 'register', element: <RegisterPage /> }
        ]
    }
]);