import type { Map } from "maplibre-gl";
import { createContext, type RefObject } from "react";

type Context = {
  map: RefObject<Map>;
  isReady: boolean;
  setIsReady: React.Dispatch<React.SetStateAction<boolean>>;
  setMapRef: (m: Map | null) => void;
};

export const MAP_CONTAINER_CONTEXT = createContext<Context | undefined>(
  undefined,
);
