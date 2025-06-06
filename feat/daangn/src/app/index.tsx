import { RouterProvider } from 'react-router';
import { router } from './router';

export function Entry() {
  return <RouterProvider router={router} />;
}
