import { useMap } from "../../../../shared/hooks/Map";
import { useMapSettings } from "../../../../shared/hooks/MapSettings";
import AnchorLogo from "../../../../assets/material-symbols_anchor-rounded.svg?react";
import { useMapContainer } from "../../../../shared/hooks/MapContainer";

export default function AnchorPrintGroup() {
  const {map} = useMapContainer();
  const {currentMap} = useMap();
  const {toggleAttractionPoint} = useMapSettings();
  const { attractionPoint } = currentMap ?? {};

  return(
    <>
      <div className="group anchor-print-position">
        <div className="wrapper">
          <p className="about anchor-print-position t-panel-medium">
            Print anchor
          </p>
          <button
            type="button"
            className={`anchor-print-position-button ${attractionPoint ? "active" : ""}`}
            onClick={toggleAttractionPoint}
          >
            <AnchorLogo width={24} height={24} />
          </button>
        </div>
        <button
          type="button"
          className="jump-to-anchor-button t-panel-small"
          disabled={!attractionPoint}
          onClick={() => {
            if (attractionPoint && map.current) {
              map.current.jumpTo({
                center: [
                  attractionPoint.coords[0],
                  attractionPoint.coords[1],
                ],
                zoom: attractionPoint.zoom,
                pitch: attractionPoint.pitch,
                bearing: attractionPoint.bearing,
              });
            }
          }}
        >
          Jump to anchor
        </button>
        {!attractionPoint && (
          <p className="about attraction-point t-panel-small">
            Need to add an attraction to access jump to anchor and show print
            area.
          </p>
        )}
      </div>
    </>
  )
}