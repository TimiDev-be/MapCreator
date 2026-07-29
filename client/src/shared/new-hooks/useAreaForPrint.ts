import { useOpenMapPage } from "./useOpenMapPage";
import { UnitToPx } from "../utils/UnitToPx";

export const useAreaForPrint = () => {
  const {
    currentMap, 
    maplibreMap, 
    setAreaForPrintFeature, 
    areaForPrintFeature,
    areaForPrintClientVisible, 
    setAreaForPrintClientVisible
  } = useOpenMapPage();

  const showAreaForPrint = async () => {
    if (!currentMap || !maplibreMap.current) return;

    const map = maplibreMap.current;
    const { areaForPrint, attractionPoint, printSettings } = currentMap;
    const { pitch, coords, bearing, zoom } = attractionPoint ?? {};

    map.jumpTo({
      pitch: pitch ?? map.getPitch(),
      center: (coords as [number, number]) ?? map.getCenter().toArray(),
      bearing: bearing ?? map.getBearing(),
      zoom: zoom ?? map.getZoom(),
    });

    map.once("idle", () => {
      const apCoords = attractionPoint?.coords ?? [0, 0];
      const centerPx = map.project([apCoords[0], apCoords[1]]);
      const halfWidth = UnitToPx(printSettings, areaForPrint.width) / 2;
      const halfHeight = UnitToPx(printSettings, areaForPrint.height) / 2;

      const topLeft = map.unproject([centerPx.x - halfWidth, centerPx.y - halfHeight]);
      const topRight = map.unproject([centerPx.x + halfWidth, centerPx.y - halfHeight]);
      const bottomRight = map.unproject([centerPx.x + halfWidth, centerPx.y + halfHeight]);
      const bottomLeft = map.unproject([centerPx.x - halfWidth, centerPx.y + halfHeight]);

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
          minZoom: (zoom ?? map!.getZoom()) - 3,
          maxZoom: (zoom ?? map!.getZoom()) + 3,
        },
      });
    });
  }

  const toggleAreaForPrint = async () => 
    areaForPrintFeature ? setAreaForPrintFeature(null) : await showAreaForPrint();
  
  return { 
    toggleAreaForPrint,
    areaForPrintFeature,
    areaForPrintClientVisible,
    setAreaForPrintClientVisible 
  }
}