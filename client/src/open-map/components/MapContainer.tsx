import "../styles/_mapContainer.scss";
import { RLayer, RMap, RSource } from "maplibre-react-components";
import { useMapContainer } from "../../shared/hooks/MapContainer";
import { useMap } from "../../shared/hooks/Map";
import { useSource } from "../../shared/hooks/Source";

export default function MapContainer() {
  const { currentSource } = useSource();
  const { currentMap } = useMap();
  const { setMapRef, areaForPrintFeature } = useMapContainer();
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
          >
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
              id={`${currentSource.id}-text`}
              type="symbol"
              source={currentSource.id}
              filter={[
                "all",
                ["any", ["==", ["get", "role"], "custom-text"]],
                ...visibilityFilter.slice(1),
              ]}
              paint={{
                "text-color": ["get", "color"],
                "text-opacity": 1,
              }}
              layout={{
                "text-field": ["get", "label"],
                "text-size": ["get", "fontSize"],
                "text-offset": [0, 0],
                "text-anchor": "center",
                "text-rotate": ["get", "rotate"],
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
                ["any", ["==", ["geometry-type"], "LineString"]],
                ...visibilityFilter.slice(1),
              ]}
              paint={{
                "line-color": ["get", "color"],
                "line-width": ["get", "lineWidth"],
                "line-dasharray": [3, 4],
                "line-opacity": 1,
              }}
            />
            <RLayer
              id={`${currentSource.id}-points`}
              type="circle"
              source={currentSource.id}
              filter={[
                "all",
                ["any", ["==", ["get", "role"], "normal-point"]],
                ...visibilityFilter.slice(1),
              ]}
              paint={{
                "circle-radius": ["get", "circleRadius"],
                "circle-color": ["get", "color"],
                "circle-opacity": 1,
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
              id="draw-preview-area-for-print-line"
              type="line"
              source="draw-preview"
              filter={[
                "all",
                ["==", ["geometry-type"], "LineString"],
                ["==", ["get", "role"], "area-for-print"],
              ]}
              paint={{
                "line-color": "#000000",
                "line-width": 1.5,
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
          </RMap>
        )}
      </div>
    </>
  );
}
