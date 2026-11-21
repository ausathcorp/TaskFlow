import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const App = lazy(() => import("./App"));
//Layouts
const AppLayout = lazy(() => import("./AppLayout"));
const FormLayout = lazy(() => import("@/features/auth/shared/layouts/Form"));
const ProtectedRoutesLayout = lazy(() => import("@/features/auth/shared/layouts/ProtectedRoutes"));
//Pages
const RegisterPage = lazy(() => import("@/features/auth/register/Page"));
const LoginPage = lazy(() => import("@/features/auth/login/Page"));
const ForgotPasswordPage = lazy(() => import("@/features/auth/forgot-password/Page"));
const ResetPasswordPage = lazy(() => import("@/features/auth/reset-password/Page"));

export default createBrowserRouter([
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
      { 
        element: <AppLayout />,
        children: [
          { path: '/dashboard?', element: <div>User Dashboard</div> }
        ]
      }
    ]
  }
]);
