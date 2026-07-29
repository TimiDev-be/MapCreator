import AnchorLogo from "../../../../assets/material-symbols_anchor-rounded.svg?react";
import { useMapSettings, type SettingsPanelProperties } from "../../../../shared/new-hooks/useMapSettings";
import { useOpenMapPage } from "../../../../shared/new-hooks/useOpenMapPage";
import type { AttractionPoint } from "../../../../shared/types/AttractionPoint";

export default function AnchorPrintGroup() {
  const {maplibreMap} = useOpenMapPage();
  const {settings, updateSettings} = useMapSettings();

  const handleToggleAttractionPointClick = async () => {  
    if (!maplibreMap.current || !settings) return;

    const map = maplibreMap.current;
    const {lng, lat} = map.getCenter();
    const zoom = map.getZoom();
    const {attractionPoint} = settings ?? {} as SettingsPanelProperties;
    
    let newAttractionPoint : AttractionPoint | undefined = {
      coords: [0, 0],
      zoom: 0,
      minZoom: attractionPoint?.minZoom ?? 0,
      maxZoom: attractionPoint?.maxZoom ?? 22,
      pitch: 0,
      bearing: 0
    };

    if (!attractionPoint || attractionPoint.zoom == 0)
      newAttractionPoint = {
        coords: [lng, lat],
        zoom: map.getZoom(),
        minZoom: zoom - 3,
        maxZoom: zoom + 3,
        pitch: map.getPitch(),
        bearing: map.getBearing()
      }

    await updateSettings({
      ...settings,
      attractionPoint: newAttractionPoint
    })
  }

  return(
    <>
      <div className="group anchor-print-position">
        <div className="wrapper">
          <p className="about anchor-print-position t-panel-medium">
            Print anchor
          </p>
          <button
            type="button"
            className={`anchor-print-position-button ${settings?.attractionPoint?.zoom != 0 ? "active" : ""}`}
            onClick={handleToggleAttractionPointClick}
          >
            <AnchorLogo width={24} height={24} />
          </button>
        </div>
        <button
          type="button"
          className="jump-to-anchor-button t-panel-small"
          disabled={settings?.attractionPoint?.zoom == 0}
          onClick={() => {
            if (settings?.attractionPoint && maplibreMap.current) {
              maplibreMap.current.jumpTo({
                center: [
                  settings?.attractionPoint.coords[0],
                  settings?.attractionPoint.coords[1],
                ],
                zoom: settings?.attractionPoint.zoom,
                pitch: settings?.attractionPoint.pitch,
                bearing: settings?.attractionPoint.bearing,
              });
            }
          }}
        >
          Jump to anchor
        </button>
        {settings?.attractionPoint?.zoom == 0 && (
          <p className="about attraction-point t-panel-small">
            Need to add an attraction to access jump to anchor and show print
            area.
          </p>
        )}
      </div>
    </>
  )
}