import type { Map } from "../../shared/types/Map";
import type { Map as MaplibreMap } from "maplibre-gl";
import type { Feature } from "geojson";
import { createContext, type RefObject } from "react";

type Context = {
  map: RefObject<MaplibreMap | null>;
  isReady: boolean;
  setIsReady: React.Dispatch<React.SetStateAction<boolean>>;
  setMapRef: (m: MaplibreMap | null) => void;
  areaForPrintFeature: Feature | undefined;
  setAreaForPrintFeature: React.Dispatch<
    React.SetStateAction<Feature | undefined>
  >;
  feature: Feature | null;
  toggleFeaturePanel: (newFeature: Feature | null) => void;
  mapZoom: number;
  setMapZoom: React.Dispatch<React.SetStateAction<number>>;
  activeButton: HTMLButtonElement | null;
  toggleActiveButton: (button: HTMLButtonElement) => void;
  drawFeatures: Feature[];
  setDrawFeatures: React.Dispatch<React.SetStateAction<Feature[]>>;
  areaForPrintClientPreview: boolean;
  setAreaForPrintClientPreview: React.Dispatch<React.SetStateAction<boolean>>;
  connectedMaps: Map[];
  setConnectedMaps: React.Dispatch<React.SetStateAction<Map[]>>;
};

export const MAP_CONTAINER_CONTEXT = createContext<Context | undefined>(
  undefined,
);
