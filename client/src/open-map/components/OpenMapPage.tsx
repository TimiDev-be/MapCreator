import "../styles/_openMapPage.scss";
import Header from "./header/Header";
import { useState, useRef, useEffect } from "react";
import Navigation from "./navigation/Navigation";
import { MAP_CONTAINER_CONTEXT } from "../contexts/MapContainerContext";
import type { Map as MaplibreMap, StyleSpecification } from "maplibre-gl";
import type { Map } from "../../shared/types/Map";
import MapContainer from "./MapContainer";
import { useParams } from "react-router-dom";
import { useMap } from "../../shared/hooks/Map";
import type { Feature } from "geojson";
import MarkerPanel from "./navigation/feature-panels/MarkerPanel";
import LineStringPanel from "./navigation/feature-panels/LineStringPanel";
import PolygonPanel from "./navigation/feature-panels/PolygonPanel";
import DrawButtons from "./draw-buttons/DrawButtons";
import PrintClientPreview from "./PrintAreaPreview";
import type { StateMap } from "../../shared/types/StateMap";
import DownloadMapContainer from "./DownloadMapContainer";

const FeaturePanels: Record<string, React.ReactNode> = {
  Point: <MarkerPanel />,
  LineString: <LineStringPanel />,
  Polygon: <PolygonPanel />,
};

export default function OpenMapPage() {
  const { id } = useParams();
  const { currentMap, openMap } = useMap();

  const [areaForPrintFeature, setAreaForPrintFeature] = useState<Feature | undefined>(undefined);
  const [feature, setFeature] = useState<Feature | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [mapZoom, setMapZoom] = useState<number>((currentMap && currentMap.attractionPoint?.zoom) ?? 1);
  const [activeButton, setActiveButton] = useState<HTMLButtonElement | null>(null);
  const [drawFeatures, setDrawFeatures] = useState<Feature[]>([]);
  const [areaForPrintClientPreview, setAreaForPrintClientPreview] = useState(false);
  const [connectedMaps, setConnectedMaps] = useState<Map[]>([]);
  const [downloadParams, setDownloadParams] = useState<{map: StateMap, style: string | StyleSpecification} | null>(null);

  const MapRef = useRef<MaplibreMap | null>(null);
  const DownlaodPromiseRef = useRef<((value: string) => void) | null>(null);

  const setMapRef = (m: MaplibreMap | null) => {
    MapRef.current = m;
    setIsReady(!!m);
  };

  const toggleActiveButton = (button: HTMLButtonElement | null) => {
    if (activeButton === button || !button) {
      if (activeButton) {
        activeButton.classList.remove("active");
      }
      setActiveButton(null);
    } else {
      button.classList.add("active");
      if (activeButton) {
        activeButton.classList.remove("active");
      }
      setActiveButton(button);
    }
  };

  const toggleFeaturePanel = (newFeature: Feature | null) => {
    if (!newFeature) return setFeature(null);
    if (!currentMap?.features.find((f) => f.id === newFeature?.id)) return;
    setFeature((prev) => {
      return prev === newFeature ? null : newFeature;
    });
  };

  const downloadURIData = async (map: StateMap, style: string | StyleSpecification) : Promise<string | undefined> => {
    if (DownlaodPromiseRef.current != null) return undefined; 
    return new Promise<string>((resolve) => {
      DownlaodPromiseRef.current = resolve;
      setDownloadParams({map, style});
    });
  }

  const handleDownloadLoad = (dataUrl: string) => {
    if (DownlaodPromiseRef.current) {
      DownlaodPromiseRef.current(dataUrl);
    }
    setDownloadParams(null);
    DownlaodPromiseRef.current = null;
  }

  useEffect(() => {
    if (!currentMap || !feature) return;

    const handleFeatureDeleteAndPanelIfActive = () => {
      if (!currentMap.features.find((f) => f.id == feature.id)) {
        setFeature(null);
      }
    };
    handleFeatureDeleteAndPanelIfActive();
  }, [currentMap, feature]);

  useEffect(() => {
    openMap(id as string);
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
          activeButton,
          toggleActiveButton,
          drawFeatures,
          setDrawFeatures,
          areaForPrintClientPreview,
          setAreaForPrintClientPreview,
          connectedMaps,
          setConnectedMaps,
          downloadURIData
        }}
      >
        {currentMap && (
          <div className="open-map page">
            <Header />
            <Navigation />
            <MapContainer />
            <DrawButtons />
            <div id="dowload-map-container-wrapper">
              {downloadParams && (
                <DownloadMapContainer {...downloadParams} loaded={handleDownloadLoad}/>
              )}
            </div>
            {feature && FeaturePanels[feature.geometry.type]}
            {areaForPrintClientPreview && <PrintClientPreview />}
          </div>
        )}
      </MAP_CONTAINER_CONTEXT.Provider>
    </>
  );
}
