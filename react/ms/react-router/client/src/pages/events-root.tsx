import { Outlet } from "react-router-dom";

import EventsNavigation from "../components/events-navigation";

function EventsRootLayout() {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  );
}

export default EventsRootLayout;
