import "../styles/_mapContainer.scss";
import { RLayer, RMap, RSource } from "maplibre-react-components";
import { useMapContainer } from "../../shared/hooks/MapContainer";
import { useMap } from "../../shared/hooks/Map";
import { useSource } from "../../shared/hooks/Source";
import MarkerComponent from "./marker/Marker";

export default function MapContainer() {
  const { currentSource } = useSource();
  const { currentMap } = useMap();
  const { setMapRef, areaForPrintFeature, setMapZoom } = useMapContainer();
  const { attractionPoint } = currentMap ?? {};

  const visibilityFilter: any = [
    "all",
    ["boolean", ["get", "visible"], true],
    [">=", ["zoom"], ["coalesce", ["get", "minZoom"], 0]],
    ["<=", ["zoom"], ["coalesce", ["get", "maxZoom"], 22]],
  ];

  return (
    <>
      <div id="map-container">
        {currentSource && currentMap && (
          <RMap
            style={{ width: "100%", height: "100%" }}
            mapStyle={import.meta.env.VITE_MAP_STYLE}
            onMounted={(m) => setMapRef(m)}
            initialCenter={[
              attractionPoint?.coords[0] ?? 0,
              attractionPoint?.coords[1] ?? 0,
            ]}
            initialZoom={attractionPoint?.zoom ?? 1}
            initialPitch={attractionPoint?.pitch ?? 0}
            initialBearing={attractionPoint?.bearing ?? 0}
            onZoom={(e) => setMapZoom(e.target.getZoom())}
          >
            {currentMap.features
              .filter((f) => f.properties.markerId !== undefined)
              .map((f) => {
                return <MarkerComponent key={f.id} feature={f} />;
              })}
            <RSource
              id={currentSource.id}
              type="geojson"
              data={{
                type: "FeatureCollection",
                features: currentMap.features,
              }}
            />
            <RSource
              id={"draw-preview"}
              type="geojson"
              data={{
                type: "FeatureCollection",
                features: areaForPrintFeature ? [areaForPrintFeature] : [],
              }}
            />
            <RLayer
              id={`${currentSource.id}-edges`}
              type="line"
              source={currentSource.id}
              filter={[
                "all",
                [
                  "any",
                  ["==", ["geometry-type"], "Polygon"],
                  ["==", ["geometry-type"], "MultiPolygon"],
                ],
                ...visibilityFilter.slice(1),
              ]}
              paint={{
                "line-color": ["get", "borderColor"],
                "line-width": ["get", "lineWidth"],
                "line-opacity": 1,
              }}
              layout={{
                "line-join": "round",
                "line-cap": "round",
              }}
            />
            <RLayer
              id={`${currentSource.id}-fill`}
              type="fill"
              source={currentSource.id}
              filter={[
                "all",
                [
                  "any",
                  ["==", ["geometry-type"], "Polygon"],
                  ["==", ["geometry-type"], "MultiPolygon"],
                ],
                ...visibilityFilter.slice(1),
              ]}
              paint={{
                "fill-color": ["get", "color"],
                "fill-opacity": ["get", "opacity"],
              }}
            />
            <RLayer
              id={`${currentSource.id}-lines`}
              type="line"
              source={currentSource.id}
              filter={[
                "all",
                ["==", ["geometry-type"], "LineString"],
                ["==", ["get", "lineDash"], null],
                ...visibilityFilter.slice(1),
              ]}
              paint={{
                "line-color": ["get", "color"],
                "line-width": ["get", "lineWidth"],
                "line-opacity": 1,
              }}
            />
            <RLayer
              id={`${currentSource.id}-lines-dashed`}
              type="line"
              source={currentSource.id}
              filter={[
                "all",
                ["==", ["geometry-type"], "LineString"],
                ["!=", ["get", "lineDash"], null],
                ...visibilityFilter.slice(1),
              ]}
              paint={{
                "line-color": ["get", "color"],
                "line-width": ["get", "lineWidth"],
                "line-dasharray": ["get", "lineDash"],
                "line-opacity": 1,
              }}
            />
            <RLayer
              id="draw-preview-fill"
              type="fill"
              source="draw-preview"
              filter={["==", ["geometry-type"], "Polygon"]}
              paint={{ "fill-color": "rgba(255, 0, 0, 0.2)" }}
            />
            <RLayer
              id="draw-preview-line"
              type="line"
              source="draw-preview"
              filter={[
                "all",
                ["==", ["geometry-type"], "LineString"],
                ["==", ["get", "role"], "draw-preview-line"],
              ]}
              paint={{
                "line-color": "#ff0000",
                "line-width": 2.5,
                "line-dasharray": [2, 1],
              }}
            />
            <RLayer
              id="draw-preview-points"
              type="circle"
              source="draw-preview"
              filter={["==", ["geometry-type"], "Point"]}
              paint={{
                "circle-radius": 6,
                "circle-color": "#ff0000",
                "circle-stroke-width": 2,
                "circle-stroke-color": "#ffffff",
              }}
            />
            <RLayer
              id="draw-preview-area-for-print-line"
              type="line"
              source="draw-preview"
              filter={[
                "all",
                ["==", ["geometry-type"], "LineString"],
                ["==", ["get", "role"], "area-for-print"],
                ...visibilityFilter.slice(1),
              ]}
              paint={{
                "line-color": "#000000",
                "line-width": 1.5,
                "line-dasharray": [2, 1],
              }}
            />
          </RMap>
        )}
      </div>
    </>
  );
}
