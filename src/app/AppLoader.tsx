import React, { Suspense } from "react";
import LoadingPage from "@/views/LoadingPage/LoadingPage";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "@/views/ErrorPage/ErrorPage";
import { Toaster } from 'sonner';
import i18nTranslation from "@/configs/i18n";

const App = React.lazy(async () => {
  await Promise.all([
    i18nTranslation.initialize(),
  ]);
  return import("./App");
});

const AppLoader = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <Suspense fallback={<LoadingPage />}>
        <Toaster richColors position="bottom-left" closeButton/>
        <App />
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppLoader;
