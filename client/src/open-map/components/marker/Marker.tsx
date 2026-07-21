import "../../styles/_marker.scss";
import type { Feature } from "geojson";
import type { Marker } from "maplibre-gl";
import { RMarker, type Event } from "maplibre-react-components";
import { useCallback, useState, type CSSProperties } from "react";
import type { MarkerProperties } from "../../../shared/types/MarkerProperties";
import { HexOpacity } from "../../../shared/classes/HexOpacity";
import { MarkerIcons } from "./MarkerIcons";
import { useMarkerFeature } from "../../../shared/hooks/MarkerFeature";
import { useFeature } from "../../../shared/hooks/Feature";
import { useMapContainer } from "../../../shared/hooks/MapContainer";

type Props = {
  feature: Feature;
};

export default function MarkerComponent({ feature }: Props) {
  const { mapZoom } = useMapContainer();
  const { updateFeature } = useFeature();
  const { handleChangeCoords } = useMarkerFeature();
  const { geometry, properties } = feature;
  const { coordinates } = geometry as { type: string; coordinates: number[] };
  const {
    label,
    backgroundColor,
    color,
    padding,
    opacity,
    fontSize,
    markerSigns,
    border,
    borderRadius,
    boxShadow,
    markerIconClass,
    rotate,
    minZoom,
    maxZoom,
  } = properties as MarkerProperties;
  const [markerCoords, setMarkerCoords] = useState<number[]>(coordinates);
  const BackgroundColor = `${backgroundColor}${HexOpacity.OpacityToHex(opacity ?? 1)}`;
  const BoxShadow = `${boxShadow.slice(0, 3).map((s) => `${s}em`).join(" ")} ${boxShadow[3] + HexOpacity.OpacityToHex(boxShadow[4])}`;
  const BorderWidth = `${border.slice(0, 4).map((s) => `${s}em`).join(" ")}`;
  const MarkerIcon = markerIconClass ? MarkerIcons[markerIconClass] : null;
  const isVisible = mapZoom >= minZoom && mapZoom <= maxZoom;

  const handleMarkerDrag = useCallback((e: Event<Marker>) => {
      setMarkerCoords(e.target.getLngLat().toArray());
      handleChangeCoords(e.target.getLngLat().toArray(), feature);
    },
    [updateFeature, feature],
  );

  return (
    <>
      <RMarker
        longitude={markerCoords[0]}
        latitude={markerCoords[1]}
        draggable
        onDragEnd={handleMarkerDrag}
      >
        <div
          className={`custom-marker ${isVisible ? "" : "hidden"}`}
          style={{
            filter: `drop-shadow(${BoxShadow})`,
            borderRadius: borderRadius.map((b) => `${b}px`).join(" ") ?? "0",
            borderWidth: BorderWidth,
            borderStyle: border[4],
            borderColor: `${border[5]}${HexOpacity.OpacityToHex(border[6])}`,
            color,
            fontSize: `${fontSize}px`,
            transform: `rotate(${rotate}deg)`,
          }}
        >
          <div
            className="wrapper"
            style={{ 
              padding: padding.map((p) => `${p}em`).join(" ") ?? "0",
              backgroundColor: BackgroundColor
            }}
          >
            {MarkerIcon && (
              <MarkerIcon
                width={1.5 * fontSize}
                height={1.5 * fontSize}
                className={`icon ${markerIconClass}`}
                style={{ "--icon-color": color } as CSSProperties}
              />
            )}
            {label && <p className="name">{label}</p>}
          </div>
          {markerSigns.map((s, i) => {
            return (
              <span
                key={i}
                className={`mysign ${s}`}
                style={{ backgroundColor: BackgroundColor }}
              />
            );
          })}
        </div>
      </RMarker>
    </>
  );
}
