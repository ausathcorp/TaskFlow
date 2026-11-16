import { createRoot } from "react-dom/client";
import React, { StrictMode, Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from "./routes";
import { StoreProvider } from "./providers";
import { AppThemeProvider } from "@/features/theme";
import { SnackbarProvider } from "@/features/snackbar";
import LoadingPage from '@/shared/components/LoadingPage';

(async () => {
  if (!import.meta.env.DEV) return;
  let eruda = await import("eruda");
  eruda.init();
})();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StoreProvider>
      <AppThemeProvider>
        <SnackbarProvider>
          <Suspense fallback={<LoadingPage />}>
            <RouterProvider router={router} />
          </Suspense>
        </SnackbarProvider>
      </AppThemeProvider>
    </StoreProvider>
  </StrictMode>
);
