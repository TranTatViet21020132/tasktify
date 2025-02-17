import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import '@/assets/fonts/Archivo-Regular.ttf'

import { ThemeProvider } from "@/hooks/useDarkMode";
import AppLoader from "@/app/AppLoader";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const queryClient = new QueryClient();
root.render(
  // <React.StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <HelmetProvider>
            <AppLoader />
          </HelmetProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  // </React.StrictMode>
);
