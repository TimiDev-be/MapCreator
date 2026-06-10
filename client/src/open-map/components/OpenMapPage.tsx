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

export default function OpenMapPage() {
  const { id } = useParams();
  const { currentMap, openMap } = useMap();
  const [areaForPrintFeature, setAreaForPrintFeature] = useState<
    Feature | undefined
  >(undefined);
  const [isReady, setIsReady] = useState(false);
  const MapRef = useRef<Map | null>(null);

  const setMapRef = (m: Map | null) => {
    MapRef.current = m;
    setIsReady(!!m);
  };

  useEffect(() => {
    openMap(id);
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
        }}
      >
        {currentMap && (
          <div className="open-map page">
            <Header />
            <Navigation />
            <MapContainer />
          </div>
        )}
      </MAP_CONTAINER_CONTEXT.Provider>
    </>
  );
}
