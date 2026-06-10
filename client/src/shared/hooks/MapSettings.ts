import { useMap } from "./Map";
import { useMapContainer } from "./MapContainer";
import type { AreaForPrint } from "../types/AreaForPrint";
import { MmToPx } from "../utils/MmToPx";

export const useMapSettings = () => {
  const { updateMap, currentMap } = useMap();
  const { map, areaForPrintFeature, setAreaForPrintFeature } =
    useMapContainer();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length == 0) return;
    updateMap({ ...currentMap, name: e.target.value });
  };

  const toggleAttractionPoint = () => {
    if (!map) return;

    const newAttractionPoint = currentMap.attractionPoint
      ? undefined
      : {
          coords: [map.current.getCenter().lng, map.current.getCenter().lat],
          zoom: map.current.getZoom(),
          pitch: map.current.getPitch(),
          bearing: map.current.getBearing(),
        };

    updateMap({ ...currentMap, attractionPoint: newAttractionPoint });
  };

  const handleAreaForPrintChange = (areaForPrint: AreaForPrint) => {
    updateMap({ ...currentMap, areaForPrint });
  };

  const toggleAreaForPrint = () => {
    if (!map) return;

    const { areaForPrint, attractionPoint } = currentMap;
    const center: number[] = attractionPoint.coords;
    const centerPx = map.current.project([center[0], center[1]]);
    const halfWidth = MmToPx(areaForPrint.width) / 2;
    const halfHeight = MmToPx(areaForPrint.height) / 2;

    const topLeft = map.current.unproject([
      centerPx.x - halfWidth,
      centerPx.y - halfHeight,
    ]);
    const topRight = map.current.unproject([
      centerPx.x + halfWidth,
      centerPx.y - halfHeight,
    ]);
    const bottomRight = map.current.unproject([
      centerPx.x + halfWidth,
      centerPx.y + halfHeight,
    ]);
    const bottomLeft = map.current.unproject([
      centerPx.x - halfWidth,
      centerPx.y + halfHeight,
    ]);

    if (!areaForPrintFeature && areaForPrint) {
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
        },
      });
    } else {
      setAreaForPrintFeature(undefined);
    }
  };

  return {
    handleNameChange,
    toggleAttractionPoint,
    handleAreaForPrintChange,
    toggleAreaForPrint,
  };
};
