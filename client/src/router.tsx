import { createHashRouter } from "react-router-dom";
import MapsPage from "./maps/components/MapsPage";
import SourceProvider from "./shared/providers/SourceProvider";
import DataFilesPage from "./data-files/components/DataFilesPage";
import NewMapPage from "./maps/components/NewMapPage";
import OpenMapPage from "./open-map/components/OpenMapPage";
import TemplatePreviewSubpage from "./data-files/components/TemplatePreviewSubpage";

export const router = createHashRouter([
  {
    path: "/",
    element: <SourceProvider />,
    children: [
      { index: true, Component: MapsPage },
      {
        path: "data-files",
        Component: DataFilesPage,
        children: [
          {
            path: "template/preview/:name/:id",
            Component: TemplatePreviewSubpage,
          },
        ],
      },
      { path: "new-map", Component: NewMapPage },
      { path: "open-map/:name/:id", Component: OpenMapPage },
    ],
  },
]);
