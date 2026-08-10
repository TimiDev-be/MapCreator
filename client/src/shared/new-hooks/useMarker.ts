import type { Feature } from "geojson";
import type { MarkerProperties } from "../types/MarkerProperties";
import { useCallback, useState, type CSSProperties } from "react";
import type { Marker } from "maplibre-gl";
import type { Event } from "maplibre-react-components";
import { useFeature } from "./useFeature";
import { HexOpacity } from "../classes/HexOpacity";
import { useOpenMapPage } from "./useOpenMapPage";

export const useMarker = (feature: Feature) => {
  const {maplibreMap, currentMap} = useOpenMapPage();
  const {updateFeature} = useFeature(feature);
  const {coordinates } = feature.geometry as { type: string, coordinates: [number, number] };
  const [markerCoords, setMarkerCoords] = useState<[number, number]>(coordinates);

  const getBackground = () : string => {
    const {backgroundColor, opacity} = feature.properties as MarkerProperties;
    return `${backgroundColor}${HexOpacity.OpacityToHex(opacity ?? 1)}`;
  } 

  const getProperties = () : MarkerProperties => {
    let properties : MarkerProperties = {
      isPlainText: false,
      markerId: "",
      markerClass: "",
      markerSigns: [],
      markerIconClass: "",
      fontSize: 0,
      color: "",
      backgroundColor: "",
      boxShadow: [0, 0, 0, "#000000", 1],
      border: [0, 0, 0, 0, "solid", "#000000", 1],
      borderRadius: [],
      padding: [],
      rotate: 0,
      name: "",
      mapId: "",
      opacity: 0,
      minZoom: 0,
      maxZoom: 0
    }

    if (feature.properties)
      properties = {...properties, ...feature.properties}

    return properties
  }

  const getContainerStyle = () : CSSProperties => {
    const {
      boxShadow, 
      border,
      color,
      fontSize,
      rotate
    } = feature.properties as MarkerProperties;

    const Filter = `drop-shadow(${boxShadow.slice(0, 3).map((s) => `${s}em`).join(" ")}` 
      + `${boxShadow[3] + HexOpacity.OpacityToHex(boxShadow[4])})`;
    const Border = {
      width: `${border.slice(0, 4).map((s) => `${s}em`).join(" ")}`,
      style: border[4],
      color: `${border[5]}${HexOpacity.OpacityToHex(border[6])}`
    }

    return {
      filter: Filter,
      borderWidth: Border.width,
      borderStyle: Border.style,
      borderColor: Border.color,
      color,
      fontSize: `${fontSize}px`,
      transform: `rotate(${rotate}deg)`
    }
  } 

  const getWrapperStyle = () : CSSProperties => {
    const {padding} = feature.properties as MarkerProperties;
    const Padding = padding.map((p) => `${p}em`).join(" ") ?? "0";

    return {
      padding: Padding,
      backgroundColor: getBackground()
    }
  }

  const getIconStyle = () : CSSProperties => {
    const {color} = feature.properties as MarkerProperties;
    return {
      "--icon-color": color
    } as CSSProperties;
  } 

  const getSignStyle = () : CSSProperties => {
    return {
      backgroundColor: getBackground()
    }
  }

  const handleChangeCoordinates = useCallback(async (e: Event<Marker>) => {
    if (feature.geometry.type != "Point") return;

    const newCoords : [number, number] = e.target.getLngLat().toArray()
    setMarkerCoords(newCoords);

    await updateFeature(feature, {
      ...feature,
      geometry: {
        ...feature.geometry,
        coordinates: newCoords
      }
    })
  }, [feature, maplibreMap, currentMap])

  return { 
    getProperties,
    styleGetters: {
      getContainerStyle,
      getWrapperStyle,
      getIconStyle,
      getSignStyle
    },
    handleChangeCoordinates, 
    markerCoords 
  }
}