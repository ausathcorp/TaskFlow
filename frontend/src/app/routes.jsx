import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const App = lazy(() => import("./App"));
//Layouts
const FormLayout = lazy(() => import("@/features/auth/shared/layouts/Form"));
const ProtectedRoutesLayout = lazy(() => import("@/features/auth/shared/layouts/ProtectedRoutes"));
//Pages
const RegisterPage = lazy(() => import("@/features/auth/register/Page"));
const LoginPage = lazy(() => import("@/features/auth/login/Page"));
const ForgotPasswordPage = lazy(() => import("@/features/auth/forgot-password/Page"));
const ResetPasswordPage = lazy(() => import("@/features/auth/reset-password/Page"));

export default createBrowserRouter([
  { path: "/", element: <App /> },
  {
    element: <FormLayout />,
    children: [
      { path: "register", element: <RegisterPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "reset-password/:token", element: <ResetPasswordPage /> },
    ],
  },
  {
    element: <ProtectedRoutesLayout />,
    children: [
      { path: '/dashboard', element: <h1>Welcome to Dashboard</h1>}
    ]
  }
]);
