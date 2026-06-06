import { createBrowserRouter } from "react-router-dom";
import MapsPage from "./maps/components/MapsPage";
import SourceProvider from "./shared/providers/SourceProvider";

export const router = createBrowserRouter([
  {
    path: "/",
    element: SourceProvider(),
    children: [
      { index: true, Component: MapsPage },
      { path: "/data-files", Component: null },
    ],
  },
]);
