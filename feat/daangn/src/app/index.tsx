import { RouterProvider } from 'react-router';
import { router } from './router';
import { ReactQueryProvider } from './provider/query-provider';
import { Toaster } from 'sonner';

export function Entry() {
  return (
    <ReactQueryProvider>
      <RouterProvider router={router} />
      <Toaster richColors closeButton position="bottom-right" />
    </ReactQueryProvider>
  );
}
