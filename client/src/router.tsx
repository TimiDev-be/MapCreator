import { createBrowserRouter } from "react-router-dom";
import MapsPage from "./maps/components/MapsPage";
import SourceProvider from "./shared/providers/SourceProvider";
import DataFilesPage from "./data-files/components/DataFilesPage";
import NewMapPage from "./maps/components/NewMapPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SourceProvider />,
    children: [
      { index: true, Component: MapsPage },
      { path: "data-files", Component: DataFilesPage },
      { path: "new-map", Component: NewMapPage },
    ],
  },
]);
