import type { Map } from "maplibre-gl";
import type { Feature } from "geojson";
import { createContext, type RefObject } from "react";

type Context = {
  map: RefObject<Map>;
  isReady: boolean;
  setIsReady: React.Dispatch<React.SetStateAction<boolean>>;
  setMapRef: (m: Map | null) => void;
  areaForPrintFeature: Feature;
  setAreaForPrintFeature: React.Dispatch<
    React.SetStateAction<Feature | undefined>
  >;
  feature: Feature | null;
  toggleFeaturePanel: (newFeature: Feature | null) => void;
};

export const MAP_CONTAINER_CONTEXT = createContext<Context | undefined>(
  undefined,
);
