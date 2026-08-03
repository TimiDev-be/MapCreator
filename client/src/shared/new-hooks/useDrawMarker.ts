import { useCallback } from "react";
import { useOpenMapPage } from "./useOpenMapPage"
import type { MapMouseEvent } from "maplibre-gl";
import { Marker } from "../classes/Marker";
import { useFeature } from "./useFeature";

export const useDrawMarker = () => {
  const {activeButton, handleToggleActive, maplibreMap, currentMap, currentGroup, endDraw} = useOpenMapPage();
  const {newFeature} = useFeature();

  const handleFinishMarkerDrawing = useCallback(async (e: MapMouseEvent) => {
    if (!currentMap || !maplibreMap.current) return;
    
    const lngLat = e.lngLat.toArray();
    const {zoom} = currentMap.attractionPoint ?? {
      zoom: maplibreMap.current.getZoom()
    };
    const NewFeature : Marker = new Marker(
      lngLat,
      currentMap.id,
      zoom,
      currentGroup?.id ?? undefined
    )

    await newFeature(NewFeature.toJson());
    endDraw();
  }, [currentMap, currentGroup, maplibreMap]);

  return {
    activeButton,
    handleToggleActive,
    handleFinishMarkerDrawing,
    maplibreMap
  }
}