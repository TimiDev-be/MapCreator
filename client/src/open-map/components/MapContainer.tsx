import "../styles/_mapContainer.scss";
import { RMap, RSource } from "maplibre-react-components";
import { useOpenMapPage } from "../../shared/new-hooks/useOpenMapPage"
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { AttractionPoint } from "../../shared/types/AttractionPoint";
import type { GeoJSON, Geometry, GeoJsonProperties } from "geojson";
import LoadingScreen from "../../shared/components/LoadingScreen";
import { UserSourceId, UserSourceDrawPreviewId } from "../../shared/types/UserSource";
import MarkersList from "./MarkersList";
import {
  PolygonEdgesLayer, PolygonFillLayer, 
  LinesLayer, DashedLinesLayer,
  PolygonFillPreviewLayer, LinesPreviewLayer, 
  PointsPreviewLayer, AreaForPrintLinePreviewLayer
} from "./map-layers"

export default function MapContainer() {
  const {
    currentMap, 
    currentMapLoading, 
    setMaplibreMap, 
    currentStyle, 
    areaForPrintFeature,
    setMaplibreMapZoom,
    drawPreviewFeatures,
    connectedDrawings
  } = useOpenMapPage();
  const {id, attractionPoint} = currentMap ?? {};

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
    features: currentMap ? [
      ...currentMap.features, 
      ...connectedDrawings.filter(m => m.id !== currentMap.id)
      .flatMap(m => m.features)
    ] 
    : []
  }

  const UserSourceDrawPreviewData : GeoJSON<Geometry, GeoJsonProperties> = {
    type: "FeatureCollection",
    features: areaForPrintFeature ? [...drawPreviewFeatures, areaForPrintFeature] : [...drawPreviewFeatures]
  }

  if (currentMapLoading)
    return <LoadingScreen/>;

  if (!currentMap && !currentMapLoading) {
    toast.error("Something went wrong while loading map.");
    return <Navigate to={"/"}/>;
  }

  return(
    <>
      <div id="map-container">
        <RMap
          key={id}
          style={{ width: "100%", height: "100%" }}
          mapStyle={currentStyle?.url ?? "default style"}
          initialCanvasContextAttributes={{
            preserveDrawingBuffer: true
          }}
          {...MapInitials}
          onMounted={(m) => {
            setMaplibreMap(m);
          }}
          onZoom={(e) => {
            setMaplibreMapZoom(e.target.getZoom());
          }}>

          <MarkersList isDownload={false}/>
          <RSource
            id={UserSourceId}
            type="geojson"
            data={{...UserSourceData}}
          />
          <RSource
            id={UserSourceDrawPreviewId}
            type="geojson"
            data={{...UserSourceDrawPreviewData}}
          />
          
          {/*static map layers*/}
          <PolygonEdgesLayer/>
          <PolygonFillLayer/>
          <LinesLayer/>
          <DashedLinesLayer/>

          {/*draw preview map layers*/}
          <PolygonFillPreviewLayer/>
          <LinesPreviewLayer/>
          <PointsPreviewLayer/>
          <AreaForPrintLinePreviewLayer/>

        </RMap>
      </div>
    </>
  )
}