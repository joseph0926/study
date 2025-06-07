import { RouterProvider } from 'react-router';
import { router } from './router';
import { ReactQueryProvider } from './provider/query-provider';

export function Entry() {
  return (
    <ReactQueryProvider>
      <RouterProvider router={router} />
    </ReactQueryProvider>
  );
}
