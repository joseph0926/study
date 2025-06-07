import { Outlet } from 'react-router';

export const RootLayout = () => {
  return (
    <div className="flex min-h-screen w-full justify-center">
      <main className="h-full w-[640px] overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};
