import "../../styles/_iconsList.scss";
import { useMapContainer } from "../../../shared/hooks/MapContainer";
import { useMarkerFeature } from "../../../shared/hooks/MarkerFeature";
import { MarkerIcons } from "./MarkerIcons";
import NullLogo from "../../../assets/mdi_null-off.svg?react";

export default function IconsList() {
  const { feature } = useMapContainer();
  const { handleMarkerIconClassChange } = useMarkerFeature();

  return (
    <>
      <div className="icons-list">
        {Object.entries(MarkerIcons).map(([name, icon]) => {
          const Icon = icon ?? NullLogo;
          return (
            <button
              key={name}
              className={`icon-button ${feature.properties.markerIconClass === name ? "active" : ""}`}
              onClick={() => handleMarkerIconClassChange(name)}
            >
              <Icon width={20} height={20} className={`icon ${name}`} />
            </button>
          );
        })}
      </div>
    </>
  );
}
