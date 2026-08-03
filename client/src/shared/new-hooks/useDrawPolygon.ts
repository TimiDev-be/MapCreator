import { useCallback } from "react";
import { useOpenMapPage } from "./useOpenMapPage"
import type { MapMouseEvent } from "maplibre-gl";
import { Polygon } from "../classes/Polygon";
import { useFeature } from "./useFeature";

export const useDrawPolygon = () => {
  const {
    activeButton,
    pointsRef, 
    cursorRef, 
    handleClick, 
    handleToggleActive,
    endDraw,
    maplibreMap,
    currentGroup,
    currentMap,
    setDrawPreviewFeatures
  } = useOpenMapPage();
  const {newFeature} = useFeature();

  const handleFinishPolygonDrawing = useCallback(async (e: MapMouseEvent | null = null) => {
    if (
        !maplibreMap.current 
        || !currentMap
        || (e && pointsRef.current.length < 2)
        || (!e && pointsRef.current.length < 3)
    ) return;

    const Coords = e
      ? [
        [
          ...pointsRef.current,
          e.lngLat.toArray(),
          pointsRef.current[0]
        ]
      ] 
      : [
        [
          ...pointsRef.current,
          pointsRef.current[0]
        ]
      ];

    const { zoom } = currentMap.attractionPoint ?? {
      zoom: maplibreMap.current.getZoom()
    }

    const newPolygon : Polygon = new Polygon(
      Coords,
      currentMap.id,
      zoom,
      currentGroup?.id ?? undefined,
      "normal-polygon"
    );

    await newFeature(newPolygon.toJson());
    endDraw();
  }, [currentGroup, currentMap, maplibreMap]);

  const handlePolygonCursor = useCallback((cursor: [number, number]) => {
    const CurrentPath = [...pointsRef.current, cursor];
    setDrawPreviewFeatures((prev) => {
      const existingPolygon = prev.find(
        f => f.geometry.type === "Polygon" && f.properties?.role === "draw-preview"
      );
      if (!existingPolygon)
        return [
          ...prev,
          {
            id: crypto.randomUUID(),
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [[...CurrentPath, CurrentPath[0]]]
            },
            properties: {role: "draw-preview"}
          }
        ]
      return prev.map((f) => {
        if (f.geometry.type === "Polygon" && f.properties?.role === "draw-preview")
          return {
            ...f,
            geometry: {
              ...f.geometry,
              coordinates: [[...CurrentPath, CurrentPath[0]]]
            }
          }
        else 
          return f
      })
    })
  }, [])


  const handleMouseMove = (e: MapMouseEvent) => {
    if (pointsRef.current.length == 0) return;
    const lngLat = e.lngLat.toArray();
    cursorRef.current = lngLat;
    handlePolygonCursor(lngLat);
  }

  const handleRemoveLastPolygonPoint = useCallback(() => {
    if (pointsRef.current.length == 0 || !activeButton) return;
    pointsRef.current = pointsRef.current.slice(0, -1);

    setDrawPreviewFeatures(prev => {
      const LastPoint = prev.findLast(f => f.geometry.type === "Point");
      if (!LastPoint) return prev;
      return prev.filter(f => f.id !== LastPoint.id);
    })

    handlePolygonCursor(cursorRef.current);
  }, [activeButton, handlePolygonCursor, setDrawPreviewFeatures]);

  return {
    activeButton,
    maplibreMap,
    handleClick,
    handleToggleActive,
    handleFinishPolygonDrawing,
    handleMouseMove,
    handleRemoveLastPolygonPoint
  }
}