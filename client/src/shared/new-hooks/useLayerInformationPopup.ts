import type { MapLayerMouseEvent } from "maplibre-gl";
import { useOpenMapPage } from "./useOpenMapPage"

export const useLayerInformationPopup = () => {
  const {maplibreMap, handleToggleActive, activeButton, setLayersInfo} = useOpenMapPage();

  const handleLayersInfoClick = (e: MapLayerMouseEvent) => {
    if (!maplibreMap.current) return;
    const features = maplibreMap.current.queryRenderedFeatures(e.point);

    if (features.length === 0) {
      setLayersInfo(null);
      return;
    }

    const {lng, lat} = e.lngLat;

    setLayersInfo({
      lng,
      lat,
      layersIds: features.map(f => f.layer.id)
    })
  }

  return {
    activeButton,
    handleToggleActive,
    handleLayersInfoClick,
    maplibreMap,
    setLayersInfo
  }
}