import "../styles/_downloadMapContainer.scss";
import { RMap, RSource } from "maplibre-react-components";
import { UnitToPx } from "../../shared/utils/UnitToPx";
import type { MapLibreMap } from "maplibre-gl";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import type { Map } from "../../shared/types/Map";
import { useOpenMapPage } from "../../shared/new-hooks/useOpenMapPage";
import type { AttractionPoint } from "../../shared/types/AttractionPoint";
import type { GeoJSON, Geometry, GeoJsonProperties } from "geojson";
import LoadingScreen from "../../shared/components/LoadingScreen";
import { UserSourceId } from "../../shared/types/UserSource";
import { PolygonEdgesLayer, PolygonFillLayer, LinesLayer, DashedLinesLayer } from "./map-layers";
import MarkersList from "./MarkersList";
import { useSource } from "../../shared/new-hooks/useSource";
import { toast } from "react-toastify";

type Props = {
  map: Map,
  loaded: (url: string) => void
}

export default function DownloadMapContainer({map, loaded} : Props) {
  const {currentStyle} = useSource();
  const {currentMap} = useOpenMapPage();
  const {areaForPrint, attractionPoint, printSettings} = map;
  const [mapError, setMapError] = useState<boolean>(false);
  const ContainerRef = useRef<HTMLDivElement | null>(null);
  const width = UnitToPx(printSettings, areaForPrint.width).toString() + "px";
  const height = UnitToPx(printSettings, areaForPrint.height).toString() + "px";

  let Initials : AttractionPoint = {
    coords: [0, 0], 
    zoom: 0,
    minZoom: 0,
    maxZoom: 0,
    pitch: 0,
    bearing: 0
  }

  if (attractionPoint)
    Initials = {...Initials, ...attractionPoint};

  const {coords, zoom, pitch, bearing} = Initials;

  const MapInitials = {
    initialCenter: coords,
    initialZoom: zoom,
    initialPitch: pitch,
    initialBearing: bearing
  }

  const UserSourceData : GeoJSON<Geometry, GeoJsonProperties> = {
    type: "FeatureCollection",
    features: currentMap ? [...currentMap.features] : []
  }

  const handleLoadDisabledLayers = (e: MapLibreMap) => {
    if (!currentMap) return;
    currentMap.disabledLayers.forEach((dl) => {
      if (e.getLayer(dl.layerId)) {
        e.setLayoutProperty(dl.layerId, 'visibility', "none");
      }
    });
  } 

  const handleLoad = async (e: {target: MapLibreMap}) => {
    if (!ContainerRef.current) return;
    handleLoadDisabledLayers(e.target);

    const instace = e.target;
    instace.resize();

    instace.once("idle", async () => {
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

      const MapCanvas = await html2canvas(ContainerRef.current!, {
        useCORS: true,
        backgroundColor: null,
        ignoreElements: (el) => el.classList.contains("maplibregl-control-container"),
      });

      const dataURL = MapCanvas.toDataURL("image/png", 1);
      loaded(dataURL);
    })
  }

  useEffect(() => {
    if (currentStyle)
      setMapError(false);
  }, [currentStyle])

  useEffect(() => {
    if (mapError)
      toast.error("Something went wrong while loading the map. Check your internet connection and correctness of map style url and try again.")
  }, [mapError])

  if (!currentStyle)
    return <LoadingScreen/>

  return(
    <>
      {attractionPoint && 
        (<div id="download-map-container" 
          ref={ContainerRef}
          style={{
            width,
            height
          }}>
          {!mapError && currentStyle && <RMap
            style={{ width: "100%", height: "100%" }}
            mapStyle={currentStyle.url}
            initialCanvasContextAttributes={{preserveDrawingBuffer: true}}
            {...MapInitials}
            onError={() => {
              setMapError(true);
            }}
            onLoad={handleLoad}>
              <MarkersList isDownload/>
              <RSource
                id={UserSourceId}
                type="geojson"
                data={{...UserSourceData}}/>

              {/*static map layers*/}
              <PolygonEdgesLayer/>
              <PolygonFillLayer/>
              <LinesLayer/>
              <DashedLinesLayer/>
          </RMap>}
        </div>
        )
      }
    </>
  )
}