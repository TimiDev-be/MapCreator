import { useCallback } from "react";
import { useOpenMapPage } from "./useOpenMapPage"
import type { MapMouseEvent } from "maplibre-gl";
import { LineString } from "../classes/LineString";
import { useFeature } from "./useFeature";

export const useDrawLine = () => {
  const {currentMap, currentGroup, maplibreMap, activeButton, setDrawPreviewFeatures, endDraw, pointsRef, cursorRef, handleClick, handleToggleActive} = useOpenMapPage();
  const {newFeature} = useFeature();

  const handleFinishLineDrawing = useCallback(async (e: MapMouseEvent | undefined = undefined) => {
    if (!maplibreMap.current || !currentMap) return;
    
    const Coords = e 
      ? [...pointsRef.current, e.lngLat.toArray()] 
      : [...pointsRef.current];
    if (Coords.length < 2) return;

    const { zoom } = currentMap?.attractionPoint ?? {
      zoom: maplibreMap.current.getZoom()
    };

    const newLine : LineString = new LineString(
      Coords,
      zoom,
      currentMap.id,
      currentGroup?.id ?? undefined,
      "normal-line"
    );

    await newFeature(newLine.toJson());
    endDraw();
  }, [currentMap, maplibreMap, currentGroup]);

  const handleLineCursor = useCallback((cursor: [number, number]) => {
    const CurrentPath = [...pointsRef.current, cursor];
    setDrawPreviewFeatures(prev => {
      const existingLine = prev.find(
        f => f.geometry.type === "LineString" && f.properties?.role === "draw-preview"
      );
      if (!existingLine)
        return [
          ...prev,
          {
            id: crypto.randomUUID(),
            type: "Feature",
            geometry: {type: "LineString", coordinates: CurrentPath},
            properties: {role: "draw-preview"}
          }
        ]
      return prev.map((f) => {
        if (f.geometry.type === "LineString" && f.properties?.role === "draw-preview")
          return {...f, geometry: {...f.geometry, coordinates: CurrentPath}}
        else 
          return f
      })
    });
  }, []);

  const handleMouseMove = (e: MapMouseEvent) => {
    if (pointsRef.current.length == 0) return;
    const lngLat = e.lngLat.toArray()
    cursorRef.current = lngLat;
    handleLineCursor(lngLat);
  }

  const handleRemoveLastLinePoint = useCallback(() => {
    if (pointsRef.current.length == 0 || !activeButton) return;
    pointsRef.current = pointsRef.current.slice(0, -1);

    setDrawPreviewFeatures(prev => {
      const LastPoint = prev.findLast(f => f.geometry.type === "Point");
      if (!LastPoint) return prev;
      return prev.filter(f => f.id !== LastPoint.id);
    })

    handleLineCursor(cursorRef.current);
  }, [activeButton, handleLineCursor, setDrawPreviewFeatures]);

  return {
    activeButton,
    handleToggleActive,
    handleFinishLineDrawing,
    handleRemoveLastLinePoint,
    handleMouseMove,
    maplibreMap,
    handleClick
  }
}