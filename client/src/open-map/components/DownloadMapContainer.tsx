import "../styles/_downloadMapContainer.scss";
import { RMap } from "maplibre-react-components";
import type { StateMap } from "../../shared/types/StateMap"
import { UnitToPx } from "../../shared/utils/UnitToPx";
import type { MapLibreMap, StyleSpecification } from "maplibre-gl";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import MarkerComponent from "./marker/Marker";

type Props = {
  map: StateMap,
  style: string | StyleSpecification,
  loaded: (url: string) => void
}

export default function DownloadMapContainer({map, style, loaded} : Props) {
  const {areaForPrint, attractionPoint, printSettings} = map;
  const [mapError, setMapError] = useState<boolean>(false);
  const ContainerRef = useRef<HTMLDivElement | null>(null);
  const width = UnitToPx(printSettings, areaForPrint.width).toString() + "px";
  const height = UnitToPx(printSettings, areaForPrint.height).toString() + "px";

  const handleLoad = async (e: {target: MapLibreMap}) => {
    if (!ContainerRef.current) return;

    const instace = e.target;
    instace.resize();

    instace.once("idle", async () => {
      const MapCanvas = await html2canvas(ContainerRef.current!, {
        useCORS: true,
        backgroundColor: null,
        ignoreElements: (el) => el.classList.contains("maplibregl-control-container"),
      });

      const dataURL = MapCanvas.toDataURL("image/png", 1);
      loaded(dataURL);
    })
  }

  return(
    <>
      {attractionPoint && 
        (<div id="download-map-container" 
          ref={ContainerRef}
          style={{
            width,
            height
          }}>
          {mapError && (
            <div className="map-error t-panel-big">
              Something went wrong while loading the map. Check your internet
              connection and map style url and try again.
            </div>
          )}
          <RMap
            style={{ width: "100%", height: "100%" }}
            mapStyle={style}
            initialCanvasContextAttributes={{preserveDrawingBuffer: true}}
            initialCenter={{
              lng: attractionPoint.coords[0],
              lat: attractionPoint.coords[1]
            }}
            initialZoom={attractionPoint.zoom}
            initialBearing={attractionPoint.bearing}
            initialPitch={attractionPoint.pitch}
            onError={() => {
              setMapError(true);
            }}
            onLoad={handleLoad}>
              {!mapError &&
                [...map.features]
                  .filter((f) => f.properties?.markerId !== undefined)
                  .map((f) => {
                    return <MarkerComponent key={f.id} feature={f} />;
                  })
              }
          </RMap>
        </div>
        )
      }
    </>
  )
}