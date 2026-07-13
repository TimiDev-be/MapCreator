import "../styles/_mapContainer.scss";
import { RLayer, RMap, RSource } from "maplibre-react-components";
import { useMapContainer } from "../../shared/hooks/MapContainer";
import { useMap } from "../../shared/hooks/Map";
import { useSource } from "../../shared/hooks/Source";
import MarkerComponent from "./marker/Marker";
import { useEffect, useState } from "react";
import type { MapStyle } from "../../shared/types/MapStyle";

export default function MapContainer() {
  const { currentSource, config } = useSource();
  const { currentMap } = useMap();
  const { setMapRef, areaForPrintFeature, setMapZoom, drawFeatures, connectedMaps } =
    useMapContainer();
  const { attractionPoint } = currentMap ?? {};
  const [mapError, setMapError] = useState<boolean>(false);
  const [mapStyle, setMapStyle] = useState<MapStyle | undefined>(undefined);

  const zoomVisibilityFilter : any = [
    ["boolean", ["get", "visible"], true],
    ["<=", ["coalesce", ["get", "minZoom"], 0], ["zoom"]],
    [">=", ["coalesce", ["get", "maxZoom"], 22], ["zoom"]]
  ];

  const loadStyleToState = async () => {
    if (!config) return;

    try {
      const response = await fetch(`${config.api.link}/style`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseJson = await response.json();
        setMapStyle(responseJson);
      } else {
        setMapStyle(undefined);
        setMapError(true);
      } 
    } catch (error) {
      setMapStyle(undefined);
      setMapError(true);
    }
  };

  useEffect(() => {
    if (!config) setMapError(true);
    const loadStyle = async () => loadStyleToState();
    loadStyle();
  }, [config])

  return (
    <>
      <div id="map-container">
        {mapError && (
          <div className="map-error t-panel-big">
            Something went wrong while loading the map. Check your internet
            connection and map style url and try again.
          </div>
        )}
        {!mapError && mapStyle && currentSource && currentMap && (
          <RMap
            key={currentMap.id}
            style={{ width: "100%", height: "100%" }}
            mapStyle={mapStyle.url ?? "default style"}
            onError={() => {
              setMapError(true);
            }}
            onMounted={(m) => {
              setMapRef(m);
              setMapZoom(attractionPoint?.zoom ?? 1);
            }}
            initialCenter={[
              attractionPoint?.coords[0] ?? 0,
              attractionPoint?.coords[1] ?? 0,
            ]}
            initialZoom={attractionPoint?.zoom ?? 1}
            initialPitch={attractionPoint?.pitch ?? 0}
            initialBearing={attractionPoint?.bearing ?? 0}
            onZoom={(e) => {
              const zoom = e.target.getZoom();
              setMapZoom(zoom);
            }}
          >
            {!mapError &&
              [...currentMap.features, ...connectedMaps.filter(m => m.id !== currentMap.id)
                .flatMap(m => m.features)]
                .filter((f) => f.properties?.markerId !== undefined)
                .map((f) => {
                  return <MarkerComponent key={f.id} feature={f} />;
                })}
            <RSource
              id={currentSource.id}
              type="geojson"
              data={{
                type: "FeatureCollection",
                features: currentMap ? [...currentMap.features, ...connectedMaps.flatMap(m => m.features)] : [],
              }}
            />
            <RSource
              id={"draw-preview"}
              type="geojson"
              data={{
                type: "FeatureCollection",
                features: areaForPrintFeature
                  ? [areaForPrintFeature, ...drawFeatures]
                  : [...drawFeatures],
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
                ...zoomVisibilityFilter.slice(1),
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
                ...zoomVisibilityFilter.slice(1),
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
                ...zoomVisibilityFilter.slice(1),
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
                ...zoomVisibilityFilter.slice(1),
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
                ["!=", ["get", "role"], "area-for-print"],
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
