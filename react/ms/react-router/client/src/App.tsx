import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { action as manipulateEventAction } from "./components/event-form";
import EditEventPage from "./pages/edit-event";
import ErrorPage from "./pages/error";
import EventDetailPage, {
  action as deleteEventAction,
  loader as eventDetailLoader,
} from "./pages/event-detail";
import EventsPage, { loader as eventsLoader } from "./pages/events";
import EventsRootLayout from "./pages/events-root";
import HomePage from "./pages/home";
import NewEventPage from "./pages/new-event";
import NewsletterPage, { action as newsletterAction } from "./pages/newsletter";
import RootLayout from "./pages/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ":eventId",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: manipulateEventAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: manipulateEventAction,
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
