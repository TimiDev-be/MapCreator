import { useCallback, useEffect, useRef } from "react";
import type { MapMouseEvent } from "maplibre-gl";
import { useMapContainer } from "./MapContainer";
import { useFeature } from "./Feature";
import { LineString } from "../classes/LineString";
import { Polygon } from "../classes/Polygon";
import { Marker } from "../classes/Marker";
import { useMap } from "./Map";
import { useGroup } from "./Group";

export const useDraw = () => {
  const { map, activeButton, toggleActiveButton, setDrawFeatures } =
    useMapContainer();
  const { currentMap } = useMap();
  const { currentGroup } = useGroup();
  const { newFeature } = useFeature();
  const PointsRef = useRef<number[][]>([]);
  const CursorRef = useRef<number[]>([]);

  const CloseDraw = useCallback(() => {
    setDrawFeatures([]);
    PointsRef.current = [];
    CursorRef.current = [];
  }, [setDrawFeatures, toggleActiveButton]);

  const FinishLine = useCallback(
    (e?: MapMouseEvent) => {
      if (!map.current) return;

      const { lng, lat } = e?.lngLat ?? {};
      const Coords = e
        ? [...PointsRef.current, [lng, lat]]
        : [...PointsRef.current];

      if (Coords.length < 2) return;

      newFeature(
        new LineString(
          Coords,
          map.current.getZoom(),
          currentMap.id,
          currentGroup?.id ?? undefined,
          "normal-line",
        ),
      );
      CloseDraw();
    },
    [map, currentMap, currentGroup, newFeature],
  );

  const FinishPolygon = useCallback(
    (e?: MapMouseEvent) => {
      if (!map.current) return;
      const Coords = e
        ? [
            [
              ...PointsRef.current,
              [e.lngLat.lng, e.lngLat.lat],
              PointsRef.current[0],
            ],
          ]
        : [[...PointsRef.current, PointsRef.current[0]]];

      if (
        (e && PointsRef.current.length < 2) ||
        (!e && PointsRef.current.length < 3)
      )
        return;

      newFeature(
        new Polygon(
          Coords,
          currentMap.id,
          map.current.getZoom(),
          currentGroup?.id ?? undefined,
          "normal-polygon",
        ),
      );
      CloseDraw();
    },
    [map, currentMap, currentGroup, newFeature],
  );

  const FinishMarker = useCallback(
    (e: MapMouseEvent) => {
      if (!map.current) return;
      const { lng, lat } = e.lngLat;
      newFeature(
        new Marker(
          [lng, lat],
          currentMap.id,
          map.current.getZoom(),
          currentGroup?.id ?? undefined,
        ),
      );
      CloseDraw();
    },
    [map, currentMap, currentGroup, newFeature],
  );

  const toggleDrawButton = (e?: React.MouseEvent<HTMLButtonElement>) => {
    CloseDraw();
    toggleActiveButton(e?.currentTarget);
  };

  const handleLineCursor = useCallback((cursor: number[]) => {
    const CurrentPath = [...PointsRef.current, cursor];
    setDrawFeatures((prev) => {
      const Line = prev.find(
        (f) =>
          f.geometry.type === "LineString" &&
          f.properties.role === "draw-preview",
      );
      if (!Line) {
        return [
          ...prev,
          {
            id: crypto.randomUUID(),
            type: "Feature",
            geometry: { type: "LineString", coordinates: CurrentPath },
            properties: { role: "draw-preview" },
          },
        ];
      }
      return prev.map((f) =>
        f.geometry.type === "LineString" && f.properties.role === "draw-preview"
          ? { ...f, geometry: { ...f.geometry, coordinates: CurrentPath } }
          : f,
      );
    });
  }, []);

  const handlePolygonCursor = useCallback((cursor: number[]) => {
    const CurrentPath = cursor
      ? [...PointsRef.current, cursor]
      : PointsRef.current;
    setDrawFeatures((prev) => {
      const Polygon = prev.find(
        (f) =>
          f.geometry.type === "Polygon" && f.properties.role === "draw-preview",
      );
      if (!Polygon) {
        return [
          ...prev,
          {
            id: crypto.randomUUID(),
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [[...CurrentPath, CurrentPath[0]]] as number[][][],
            },
            properties: { role: "draw-preview" },
          },
        ];
      }
      return prev.map((f) =>
        f.geometry.type === "Polygon" && f.properties.role === "draw-preview"
          ? {
              ...f,
              geometry: {
                ...f.geometry,
                coordinates: [[...CurrentPath, CurrentPath[0]]] as number[][][],
              },
            }
          : f,
      );
    });
  }, []);

  const handleRemoveLastPoint = useCallback(() => {
    if (PointsRef.current.length === 0 || !activeButton || !CursorRef.current)
      return;
    PointsRef.current = PointsRef.current.slice(0, -1);
    setDrawFeatures((prev) => {
      const LastPoint = prev.findLast((f) => f.geometry.type === "Point");
      if (!LastPoint) return prev;
      return prev.filter((f) => f.id !== LastPoint.id);
    });
    if (activeButton.classList.contains("polygon"))
      handlePolygonCursor(CursorRef.current);
    else if (activeButton.classList.contains("line"))
      handleLineCursor(CursorRef.current);
  }, [activeButton, handleLineCursor, handlePolygonCursor, setDrawFeatures]);

  const handleClick = (e: MapMouseEvent) => {
    const { lng, lat } = e.lngLat;
    const NewPoints = [...PointsRef.current, [lng, lat]];
    PointsRef.current = NewPoints;
    setDrawFeatures((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
        properties: {
          index: NewPoints.length,
          role: "draw-preview",
        },
      },
    ]);
  };
  const handleMouseMove = (e: MapMouseEvent) => {
    const { lng, lat } = e.lngLat;
    CursorRef.current = [lng, lat];
    if (PointsRef.current.length === 0) return;
    if (activeButton.classList.contains("polygon"))
      handlePolygonCursor([lng, lat]);
    else if (activeButton.classList.contains("line"))
      handleLineCursor([lng, lat]);
  };
  useEffect(() => {
    if (!activeButton) return CloseDraw();
  }, [activeButton]);

  return {
    activeButton,
    toggleDrawButton,
    FinishLine,
    FinishPolygon,
    FinishMarker,
    CloseDraw,
    handleRemoveLastPoint,
    handleClick,
    handleMouseMove,
  };
};
