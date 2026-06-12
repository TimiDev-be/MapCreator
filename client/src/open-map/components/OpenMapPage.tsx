import "../styles/_openMapPage.scss";
import Header from "./header/Header";
import { useState, useRef, useEffect } from "react";
import Navigation from "./navigation/Navigation";
import { MAP_CONTAINER_CONTEXT } from "../contexts/MapContainerContext";
import type { Map } from "maplibre-gl";
import MapContainer from "./MapContainer";
import { useParams } from "react-router-dom";
import { useMap } from "../../shared/hooks/Map";
import type { Feature } from "geojson";
import MarkerPanel from "./navigation/feature-panels/MarkerPanel";
import LineStringPanel from "./navigation/feature-panels/LineStringPanel";
import PolygonPanel from "./navigation/feature-panels/PolygonPanel";

const FeaturePanels: Record<string, React.ReactNode> = {
  Point: <MarkerPanel />,
  LineString: <LineStringPanel />,
  Polygon: <PolygonPanel />,
};

export default function OpenMapPage() {
  const { id } = useParams();
  const { currentMap, openMap } = useMap();
  const [areaForPrintFeature, setAreaForPrintFeature] = useState<
    Feature | undefined
  >(undefined);
  const [feature, setFeature] = useState<Feature | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [mapZoom, setMapZoom] = useState(
    (currentMap && currentMap.attractionPoint?.zoom) ?? 1,
  );
  const MapRef = useRef<Map | null>(null);
  const OpenMapPageRef = useRef<HTMLDivElement | null>(null);

  const setMapRef = (m: Map | null) => {
    MapRef.current = m;
    setIsReady(!!m);
  };

  const toggleFeaturePanel = (newFeature: Feature | null) => {
    setFeature((prev) => {
      return prev === newFeature ? null : newFeature;
    });
  };

  useEffect(() => {
    openMap(id);
    const handleFeatureChange = () => {
      setFeature((prev) => {
        return currentMap?.features.find((f) => f.id === prev?.id) ?? prev;
      });
    };
    handleFeatureChange();
  }, [id, currentMap, openMap]);

  return (
    <>
      <MAP_CONTAINER_CONTEXT.Provider
        value={{
          map: MapRef,
          isReady,
          setIsReady,
          setMapRef,
          areaForPrintFeature,
          setAreaForPrintFeature,
          feature,
          toggleFeaturePanel,
          mapZoom,
          setMapZoom,
        }}
      >
        {currentMap && (
          <div className="open-map page" ref={OpenMapPageRef}>
            <Header />
            <Navigation />
            <MapContainer />
            {feature && FeaturePanels[feature.geometry.type]}
          </div>
        )}
      </MAP_CONTAINER_CONTEXT.Provider>
    </>
  );
}
