import "../../styles/_settingsPanel.scss";
import AnchorLogo from "../../../assets/material-symbols_anchor-rounded.svg?react";
import Line from "../../../shared/components/Line";
import { useMap } from "../../../shared/hooks/Map";
import { useMapContainer } from "../../../shared/hooks/MapContainer";
import { useMapSettings } from "../../../shared/hooks/MapSettings";

export default function SettingsPanel() {
  const { map, areaForPrintFeature } = useMapContainer();
  const { currentMap, deleteMap } = useMap();
  const {
    handleNameChange,
    toggleAttractionPoint,
    handleAreaForPrintChange,
    toggleAreaForPrint,
  } = useMapSettings();
  const { name, attractionPoint, areaForPrint } = currentMap;

  return (
    <>
      <div className="nav panel settings">
        <p className="panel-name t-panel-name">Map settings</p>
        <Line height={1} />
        <div className="group name">
          <label htmlFor="name-input" className="t-panel-medium">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name-input"
            className="panel-field t-panel-medium"
            defaultValue={name}
            onBlur={(e) => {
              if (e.target.value.trim().length == 0)
                return (e.target.value = name);
              handleNameChange(e);
            }}
          />
        </div>
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
              if (attractionPoint) {
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
              Need to add an attraction to access jump to anchor and print area.
            </p>
          )}
        </div>
        <div
          className={`group area-for-print ${attractionPoint ? "" : "disabled"}`}
        >
          <p className="about area-for-print t-panel-medium">
            Area for print (mm)
          </p>
          <div className="wrapper">
            <div className="group width">
              <label htmlFor="width-input" className="t-panel-small">
                W
              </label>
              <input
                type="number"
                name="width"
                id="width-input"
                className="panel-field t-panel-small"
                min={0}
                defaultValue={areaForPrint.width}
                onBlur={(e) => {
                  if (Number(e.target.value) < 0 || e.target.value === "")
                    return (e.target.value = "150");
                  handleAreaForPrintChange({
                    ...areaForPrint,
                    width: Number(e.target.value),
                  });
                }}
              />
            </div>
            <span className="field-bridge" />
            <div className="group height">
              <label htmlFor="height-input" className="t-panel-small">
                H
              </label>
              <input
                type="number"
                name="height"
                id="height-input"
                className="panel-field t-panel-small"
                min={0}
                defaultValue={areaForPrint.height}
                onBlur={(e) => {
                  if (Number(e.target.value) < 0 || e.target.value === "")
                    return (e.target.value = "95");
                  handleAreaForPrintChange({
                    ...areaForPrint,
                    height: Number(e.target.value),
                  });
                }}
              />
            </div>
          </div>
          <button
            type="button"
            className={`show-print-area-button t-panel-small ${areaForPrintFeature ? "active" : ""}`}
            onClick={toggleAreaForPrint}
          >
            Show print area
          </button>
        </div>
        <button
          type="button"
          className="delete-map-button t-panel-medium"
          onClick={() => deleteMap(currentMap.id)}
        >
          Delete map
        </button>
      </div>
    </>
  );
}
