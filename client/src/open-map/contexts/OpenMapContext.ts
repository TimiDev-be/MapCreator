import { createContext, type Dispatch, type RefObject, type SetStateAction } from "react";
import type { Map } from "../../shared/types/Map";
import { Map as MaplibreMap, MapMouseEvent, type StyleSpecification } from "maplibre-gl";
import type { Feature } from "geojson";
import type { MapStyle } from "../../shared/types/MapStyle";
import type { Group } from "../../shared/types/Group";

export type MaplibreMapHook = {
  maplibreMap: RefObject<MaplibreMap | null>,
  setMaplibreMap: (map: MaplibreMap) => void,
  isMaplibreMapReady: boolean,
  areaForPrintFeature: Feature | null,
  setAreaForPrintFeature: Dispatch<SetStateAction<Feature | null>>,
  areaForPrintClientVisible: boolean,
  setAreaForPrintClientVisible: Dispatch<SetStateAction<boolean>>,
  maplibreMapZoom: number,
  setMaplibreMapZoom: Dispatch<SetStateAction<number>>,
  connectedDrawings: Map[],
  setConnectedDrawings: Dispatch<SetStateAction<Map[]>>
}

export type DrawingsHook = {
  activeButton: HTMLButtonElement | null,
  setActiveButton: Dispatch<SetStateAction<HTMLButtonElement | null>>,
  drawPreviewFeatures: Feature[],
  setDrawPreviewFeatures: Dispatch<SetStateAction<Feature[]>>,
  pointsRef: RefObject<number[][]>,
  cursorRef: RefObject<[number, number]>,
  handleClick: (e: MapMouseEvent) => void,
  handleToggleActive: (e: HTMLButtonElement | null) => void,
  endDraw: () => void
}

type Context = {
  currentMap: Map | null,
  setCurrentMap: React.Dispatch<SetStateAction<Map | null>>,
  currentMapLoading: boolean,
  currentStyle: MapStyle | null,
  currentGroup: Group | null,
  setCurrentGroup: Dispatch<SetStateAction<Group | null>>,
  feature: Feature | null,
  setFeature: Dispatch<SetStateAction<Feature | null>>,
  downloadURIData: (map: Map, style: string | StyleSpecification) => Promise<string | undefined>
} 
& MaplibreMapHook
& DrawingsHook;

export const OpenMapContext = createContext<Context | undefined>(undefined);