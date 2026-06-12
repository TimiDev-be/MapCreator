import "../../styles/_signsBoard.scss";
import NextLogo from "../../../assets/ooui_next-ltr.svg?react";
import { useMapContainer } from "../../../shared/hooks/MapContainer";
import type { MarkerProperties } from "../../../shared/types/MarkerProperties";
import { useMarkerFeature } from "../../../shared/hooks/MarkerFeature";

export default function SignsBoard() {
  const { feature } = useMapContainer();
  const { handleDirectionSignChange } = useMarkerFeature();
  const { markerSigns } = feature.properties as MarkerProperties;

  return (
    <>
      <div className="signs-board">
        <span
          className={`left ${markerSigns.includes("left") ? "active" : ""}`}
          onClick={() => handleDirectionSignChange("left")}
        >
          <NextLogo width={16} height={16} />
        </span>
        <span
          className={`top ${markerSigns.includes("top") ? "active" : ""}`}
          onClick={() => handleDirectionSignChange("top")}
        >
          <NextLogo width={16} height={16} />
        </span>
        <span
          className={`right ${markerSigns.includes("right") ? "active" : ""}`}
          onClick={() => handleDirectionSignChange("right")}
        >
          <NextLogo width={16} height={16} />
        </span>
        <span
          className={`bottom ${markerSigns.includes("bottom") ? "active" : ""}`}
          onClick={() => handleDirectionSignChange("bottom")}
        >
          <NextLogo width={16} height={16} />
        </span>
      </div>
    </>
  );
}
