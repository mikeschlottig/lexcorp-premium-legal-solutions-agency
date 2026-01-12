import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { App } from '@/App'
import { HomePage } from '@/pages/HomePage'
import { BlogIndex } from '@/pages/BlogIndex'
import { BlogPost } from '@/pages/BlogPost'
import { ServicesPage } from '@/pages/ServicesPage'
import { AboutPage } from '@/pages/AboutPage'
import { PrivacyPage } from '@/pages/PrivacyPage'
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/blog", element: <BlogIndex /> },
      { path: "/blog/:id", element: <BlogPost /> },
      { path: "/services", element: <ServicesPage />, errorElement: <RouteErrorBoundary /> },
      { path: "/about", element: <AboutPage />, errorElement: <RouteErrorBoundary /> },
      { path: "/privacy", element: <PrivacyPage />, errorElement: <RouteErrorBoundary /> },
    ]
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
)