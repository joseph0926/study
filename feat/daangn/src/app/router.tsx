import { HomePage } from '@/pages/home.page';
import { InitPage } from '@/pages/init.page';
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
      {
        path: 'init',
        element: <InitPage />,
      },
      {
        path: 'post/:postId',
        lazy: async () => {
          const { PostPage: Component } = await import('@/pages/post.page');
          return { Component };
        },
      },
    ],
  },
];

export const router = createBrowserRouter([...unAuthenticatedRouter]);
