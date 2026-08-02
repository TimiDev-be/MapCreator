import { Map as MaplibreMap } from "maplibre-gl";
import { useRef, useState } from "react";
import type { MaplibreMapHook } from "../../open-map/contexts/OpenMapContext";
import type { Feature } from "geojson";
import type { Map } from "../types/Map";

export const useMaplibreMap = () : MaplibreMapHook => {
  const MaplibreMap = useRef<MaplibreMap | null>(null);
  const [isMaplibreMapReady, setIsMaplibreMapReady] = useState<boolean>(false);
  const [areaForPrintFeature, setAreaForPrintFeature] = useState<Feature | null>(null);
  const [areaForPrintClientVisible, setAreaForPrintClientVisible] = useState<boolean>(false); 
  const [maplibreMapZoom, setMaplibreMapZoom] = useState<number>(0);
  const [connectedDrawings, setConnectedDrawings] = useState<Map[]>([]);

  const setMaplibreMap = (map: MaplibreMap) => {
    MaplibreMap.current = map;
    setIsMaplibreMapReady(true);
  }

  return {
    maplibreMap: MaplibreMap,
    setMaplibreMap,
    isMaplibreMapReady,
    areaForPrintFeature,
    setAreaForPrintFeature,
    areaForPrintClientVisible,
    setAreaForPrintClientVisible,
    maplibreMapZoom,
    setMaplibreMapZoom,
    connectedDrawings,
    setConnectedDrawings
  }
}