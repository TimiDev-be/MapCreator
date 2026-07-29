import "../styles/_openMapPage.scss";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import type { Map } from "../../shared/types/Map";
import { useMap } from "../../shared/new-hooks/useMap";
import { OpenMapContext } from "../contexts/OpenMapContext";
import Header from "./header/Header";
import { useMaplibreMap } from "../../shared/new-hooks/useMaplibreMap";
import DrawButtons from "./draw-buttons/DrawButtons";
import Navigation from "./navigation/Navigation";
import PrintAreaPreview from "./PrintAreaPreview";
import MapContainer from "./MapContainer";
import type { MapStyle } from "../../shared/types/MapStyle";
import { useStyle } from "../../shared/new-hooks/useStyle";
import { toast } from "react-toastify";
import type { Group } from "../../shared/types/Group";
import { useDrawings } from "../../shared/new-hooks/useDrawings";
import type { Feature } from "geojson";

export default function OpenMapPage() {
  const {id} = useParams();
  // initialize hooks to create only one instantion for all components
  const maplibreMapHook = useMaplibreMap();
  const drawingsHook = useDrawings();

  // current map data
  const {getMap} = useMap();
  const {getStyles} = useStyle();
  const [currentMap, setCurrentMap] = useState<Map | null>(null);
  const [currentMapLoading, setCurrentMapLoading] = useState<boolean>(true);
  
  const [currentStyle, setCurrentStyle] = useState<MapStyle | null>(null);
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null);
  const [feature, setFeature] = useState<Feature | null>(null);

  const loadCurrentMap = async () => {
    if (!id) return;
    setCurrentMapLoading(true);

    const map : Map | null = await getMap(id);
    const styles : MapStyle[] = await getStyles();
    const activeStyle : MapStyle | undefined = styles.find(s => s.isActive);

    if (!activeStyle)
      toast.warning("No map style has been activated. Go to workspace and activate one.");
    else 
      setCurrentStyle(activeStyle);

    if (map) {
      setCurrentMap(map);
      maplibreMapHook.setMaplibreMapZoom(map.attractionPoint?.zoom ?? 0);
    }

    setCurrentMapLoading(false);
  }

  useEffect(() => {
    loadCurrentMap();
  }, [id])

  if (!id) return <Navigate to={"/"}/>

  return(
    <>
      <OpenMapContext.Provider 
        value={{
          currentMap,
          setCurrentMap,
          currentMapLoading,
          currentStyle,
          currentGroup,
          setCurrentGroup,
          feature,
          setFeature,
          ...maplibreMapHook,
          ...drawingsHook
        }}
      >
        <div className="open-map page">
          <Header />
          <Navigation />
          <MapContainer/>
          <DrawButtons />
          {/* <div id="dowload-map-container-wrapper">
            {downloadParams && (
              <DownloadMapContainer {...downloadParams} loaded={handleDownloadLoad}/>
            )}
          </div> */}
          {maplibreMapHook.areaForPrintClientVisible && <PrintAreaPreview />}
        </div>
      </OpenMapContext.Provider>
    </>
  )
}