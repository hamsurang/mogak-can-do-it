import '@radix-ui/themes/styles.css';
import './index.css';

import { Theme } from '@radix-ui/themes';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.tsx';
import ErrorPage from './pages/Error.tsx';
import HomePage from './pages/Home.tsx';
import MogakPage from './pages/Mogak.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/mogak',
    element: <MogakPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme>
      <RouterProvider router={router} />
    </Theme>
  </React.StrictMode>,
);
