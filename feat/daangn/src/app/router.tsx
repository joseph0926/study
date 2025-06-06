import { HomePage } from '@/pages/home.page';
import { RootLayout } from '@/pages/layout/root.layout';
import { createBrowserRouter, type RouteObject } from 'react-router';

const unAuthenticatedRouter: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
];

export const router = createBrowserRouter([...unAuthenticatedRouter]);
