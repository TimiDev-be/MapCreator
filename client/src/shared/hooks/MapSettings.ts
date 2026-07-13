import { useMap } from "./Map";
import { useMapContainer } from "./MapContainer";
import type { AreaForPrint } from "../types/AreaForPrint";
import { UnitToPx } from "../utils/UnitToPx";
import { useEffect } from "react";
import type { AttractionPoint } from "../types/AttractionPoint";
import type { StateMap } from "../types/StateMap";
import type { MapPrintSettings } from "../types/MapPrintSettings";

export const useMapSettings = () => {
  const { updateMap, currentMap } = useMap();
  const { map, areaForPrintFeature, setAreaForPrintFeature } =
    useMapContainer();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentMap) return;
    if (e.target.value.trim().length == 0) return;
    updateMap({ ...currentMap, name: e.target.value });
  };

  const toggleAttractionPoint = () => {
    if (!map.current || !currentMap) return;
    setAreaForPrintFeature(undefined);

    const newAttractionPoint = currentMap.attractionPoint
      ? undefined
      : {
          coords: [map.current.getCenter().lng, map.current.getCenter().lat],
          zoom: map.current.getZoom(),
          pitch: map.current.getPitch(),
          bearing: map.current.getBearing(),
          minZoom: map.current.getZoom() - 3,
          maxZoom: map.current.getZoom() + 3
        };

    const minZoom = newAttractionPoint
      ? newAttractionPoint.zoom - 3
      : map.current.getZoom() - 3;
    const maxZoom = newAttractionPoint
      ? newAttractionPoint.zoom + 3
      : map.current.getZoom() + 3;

    updateMap({
      ...currentMap,
      features: [...currentMap.features].map((f) => ({
        ...f,
        properties: {
          ...f.properties,
          minZoom,
          maxZoom,
        },
      })),
      attractionPoint: newAttractionPoint,
    });
  };

  const handleAreaForPrintChange = (areaForPrint: AreaForPrint) => {
    if (!currentMap) return;
    updateMap({ ...currentMap, areaForPrint });
  };

  const calculatePrintArea = () => {
    if (!map?.current || !currentMap || !currentMap.areaForPrint) return;
    const { areaForPrint, attractionPoint, printSettings } = currentMap;
    const { pitch, coords, bearing, zoom } = attractionPoint ?? {};

    const center = map.current.getCenter().toArray();

    map.current.jumpTo({
      pitch: pitch ?? map.current.getPitch(),
      center: (coords as [number, number]) ?? center,
      bearing: bearing ?? map.current.getBearing(),
      zoom: zoom ?? map.current.getZoom(),
    });

    map.current.once("idle", () => {
      const apCoords = attractionPoint?.coords ?? [0, 0];
      const centerPx = map.current!.project([apCoords[0], apCoords[1]]);
      const halfWidth = UnitToPx(printSettings, areaForPrint.width) / 2;
      const halfHeight = UnitToPx(printSettings, areaForPrint.height) / 2;

      const topLeft = map.current!.unproject([centerPx.x - halfWidth, centerPx.y - halfHeight]);
      const topRight = map.current!.unproject([centerPx.x + halfWidth, centerPx.y - halfHeight]);
      const bottomRight = map.current!.unproject([centerPx.x + halfWidth, centerPx.y + halfHeight]);
      const bottomLeft = map.current!.unproject([centerPx.x - halfWidth, centerPx.y + halfHeight]);

      setAreaForPrintFeature({
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [topLeft.lng, topLeft.lat],
            [topRight.lng, topRight.lat],
            [bottomRight.lng, bottomRight.lat],
            [bottomLeft.lng, bottomLeft.lat],
            [topLeft.lng, topLeft.lat],
          ],
        },
        properties: {
          role: "area-for-print",
          visible: true,
          minZoom: (zoom ?? map.current!.getZoom()) - 3,
          maxZoom: (zoom ?? map.current!.getZoom()) + 3,
        },
      });
    });
  };

  const toggleAreaForPrint = () => {
    if (!areaForPrintFeature && currentMap?.areaForPrint) {
      calculatePrintArea();
    } else {
      setAreaForPrintFeature(undefined);
    }
  };

  const updateMinMaxZoom = (values: number[]) => {
    if (!map.current || !currentMap) return;

    const NewFeatures = [...currentMap.features].map(f => 
      ({
        ...f, 
        properties: {
          ...f.properties, 
          minZoom: values[0] ?? 0, 
          maxZoom: values[1] ?? 22
        }
      })
    );

    const {pitch, coords, bearing, zoom} = currentMap.attractionPoint ?? {};

    const NewAttractionPoint : AttractionPoint = {
      pitch: pitch ??  map.current!.getPitch(),
      coords: coords ?? map.current!.getCenter().toArray(),
      bearing: bearing ?? map.current!.getBearing(),
      zoom: zoom ?? map.current!.getZoom(),
      minZoom: values[0] ?? 0,
      maxZoom: values[1] ?? 22
    }
    const NewMap : StateMap = {
      ...currentMap,
      features: NewFeatures,
      attractionPoint: NewAttractionPoint,
      updatedAt: new Date().toISOString()
    }
    updateMap(NewMap);
  }

  const handlePrintSettingsChange = (changedPrintSettings: MapPrintSettings) => {
    if (!currentMap) return;
    updateMap({
      ...currentMap,
      printSettings: {
        ...currentMap.printSettings,
        ...changedPrintSettings
      }
    });
  }

  useEffect(() => {
    if (!currentMap || !currentMap.areaForPrint || !areaForPrintFeature) return;
    calculatePrintArea();
  }, [currentMap?.areaForPrint?.width, currentMap?.areaForPrint?.height]);

  return {
    handleNameChange,
    toggleAttractionPoint,
    handleAreaForPrintChange,
    toggleAreaForPrint,
    updateMinMaxZoom,
    handlePrintSettingsChange
  };
};
