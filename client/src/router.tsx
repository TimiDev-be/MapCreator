import { createBrowserRouter } from "react-router-dom";
import MapsPage from "./maps/components/MapsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: MapsPage(),
  },
]);
