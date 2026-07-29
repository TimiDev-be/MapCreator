import type { Feature } from "geojson";
import type { MapMouseEvent } from "maplibre-gl";
import { useCallback, useRef, useState } from "react"
import type { DrawingsHook } from "../../open-map/contexts/OpenMapContext";

export const useDrawings = () : DrawingsHook => {
  const [activeButton, setActiveButton] = useState<HTMLButtonElement | null>(null);
  const [drawPreviewFeatures, setDrawPreviewFeatures] = useState<Feature[]>([]); 
  const pointsRef = useRef<number[][]>([]);
  const cursorRef = useRef<[number, number]>([0, 0]);

  const endDraw = useCallback(() => {
    pointsRef.current = [];
    cursorRef.current = [0, 0];
    setDrawPreviewFeatures([]);
  }, [drawPreviewFeatures, activeButton]);

  const handleClick = (e: MapMouseEvent) => {
    const { lng, lat } = e.lngLat;
    const NewPoints = [...pointsRef.current, [lng, lat]];
    pointsRef.current = NewPoints;

    setDrawPreviewFeatures((prev) => [
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

  const handleToggleActive = (e: HTMLButtonElement | null = null) => {
    if (!e && activeButton) {
      activeButton?.classList.remove("active");
      setActiveButton(null);
    }
    else if (e && e == activeButton) {
      activeButton.classList.remove("active");
      setActiveButton(null);
    }
    else if (e && activeButton) {
      activeButton.classList.remove("active");
      e.classList.add("active");
      setActiveButton(e);
    }
    else if (e) {
      e.classList.add("active");
      setActiveButton(e);
    }
    endDraw();
  } 

  return {
    activeButton, 
    setActiveButton,
    drawPreviewFeatures,
    setDrawPreviewFeatures,
    pointsRef,
    cursorRef,
    handleClick,
    handleToggleActive,
    endDraw,
  }
}