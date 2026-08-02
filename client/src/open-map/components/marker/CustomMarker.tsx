import "../../styles/_marker.scss";
import type { Feature } from "geojson"
import { useMarker } from "../../../shared/new-hooks/useMarker"
import type { MarkerProperties } from "../../../shared/types/MarkerProperties";
import { RMarker } from "maplibre-react-components";
import { MarkerIcons } from "./MarkerIcons";
import { useOpenMapPage } from "../../../shared/new-hooks/useOpenMapPage";

type Props = {
  feature: Feature,
  isDownload: boolean
}

/**
 *  To do: add border radius property to getContainerStyle in styleGetters
 */
export default function CustomMarker({feature, isDownload} : Props) {
  const {maplibreMapZoom} = useOpenMapPage();
  const {getProperties, handleChangeCoordinates, markerCoords, styleGetters} = useMarker(feature);
  const Properties : MarkerProperties = getProperties();
  const {markerIconClass, fontSize, label, markerSigns, minZoom, maxZoom} = Properties;

  const Initials = {
    longitude: markerCoords[0],
    latitude: markerCoords[1],
    draggable: true,
    onDragEnd: handleChangeCoordinates
  }

  const VisibleContainerClass : string = isDownload || (maplibreMapZoom >= minZoom && maplibreMapZoom <= maxZoom) ? "" : "hidden";
  const MarkerIcon = markerIconClass ? MarkerIcons[markerIconClass] : null;
  const MarkerIconClass = markerIconClass ? `icon ${markerIconClass}` : "icon";

  return(
    <>
      <RMarker {...Initials}>
        <div className={`custom-marker ${VisibleContainerClass}`}
          style={styleGetters.getContainerStyle()}>
            <div className="wrapper"
              style={styleGetters.getWrapperStyle()}>
                {MarkerIcon && 
                  <MarkerIcon 
                    width={fontSize * 1.5}
                    height={fontSize * 1.5}
                    className={MarkerIconClass}
                    style={styleGetters.getIconStyle()}
                  />
                }
                {label && <p className="name">{label}</p>}
            </div>
            {markerSigns.map((s, i) => {
              return (
                <span
                  key={i}
                  className={`mysign ${s}`}
                  style={styleGetters.getSignStyle()}
                />
              );
            })}
        </div>
      </RMarker>
    </>
  )
}