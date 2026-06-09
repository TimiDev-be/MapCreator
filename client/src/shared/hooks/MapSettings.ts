import { useMap } from "./Map";
import { useMapContainer } from "./MapContainer";
import type { AreaForPrint } from "../types/AreaForPrint";

export const useMapSettings = () => {
  const { updateMap, currentMap } = useMap();
  const { map } = useMapContainer();

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

  return { handleNameChange, toggleAttractionPoint, handleAreaForPrintChange };
};
