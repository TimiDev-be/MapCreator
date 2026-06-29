import "../../styles/_settingsPanel.scss";
import AnchorLogo from "../../../assets/material-symbols_anchor-rounded.svg?react";
import Line from "../../../shared/components/Line";
import { useMap } from "../../../shared/hooks/Map";
import { useMapContainer } from "../../../shared/hooks/MapContainer";
import { useMapSettings } from "../../../shared/hooks/MapSettings";
// import { useState } from "react";

export default function SettingsPanel() {
  const {
    map,
    areaForPrintFeature,
    areaForPrintClientPreview,
    setAreaForPrintClientPreview,
  } = useMapContainer();
  const { currentMap, deleteMap } = useMap();
  const {
    handleNameChange,
    toggleAttractionPoint,
    handleAreaForPrintChange,
    toggleAreaForPrint,
    // updateMinMaxZoom
  } = useMapSettings();
  const { id, name, attractionPoint, areaForPrint } = currentMap ?? {};
  // const { minZoom, maxZoom } = attractionPoint ?? {};
  // const [minMaxZoom, setMinMaxZoom] = useState<number[]>([minZoom ?? 0, maxZoom ?? 22]);

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
                return (e.target.value = name ?? "");
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
        <div className="group area-for-print">
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
                defaultValue={areaForPrint?.width ?? 150}
                onBlur={(e) => {
                  if (Number(e.target.value) < 0 || e.target.value === "")
                    return (e.target.value = "150");
                  handleAreaForPrintChange({
                    height: areaForPrint?.height ?? 95,
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
                defaultValue={areaForPrint?.height ?? 95}
                onBlur={(e) => {
                  if (Number(e.target.value) < 0 || e.target.value === "")
                    return (e.target.value = "95");
                  handleAreaForPrintChange({
                    width: areaForPrint?.width ?? 150,
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
            disabled={!attractionPoint}
          >
            Show print area
          </button>
          <button
            type="button"
            className={`show-print-area-client-preview-button t-panel-small ${areaForPrintClientPreview ? "active" : ""}`}
            onClick={() => setAreaForPrintClientPreview((prev) => !prev)}
          >
            {areaForPrintClientPreview ? "Hide" : "Show"} print area client
            preview
          </button>
        </div>
        {/* <div className="linked-input-container zoom">
          <p className="about zoom t-panel-medium">
            Zoom
          </p>
          <div className="wrapper">
            <div className="group min-zoom">
              <label htmlFor={`min-zoom-input-${id}`} className="t-panel-small">
                Min
              </label>
              <input
                type="number"
                name="min-zoom"
                id={`min-zoom-input-${id}`}
                className="panel-field t-panel-small"
                value={minMaxZoom[0]}
                onChange={(e) => setMinMaxZoom(prev => [Number(e.target.value), prev[1]])}
                onBlur={(e) => {
                  e.stopPropagation();
                  if (Number(e.target.value) < 0 || e.target.value === "")
                    return (e.target.value = "0");
                  const NewValues = [
                    Number(e.target.value),
                    minMaxZoom[1]
                  ]
                  setMinMaxZoom(NewValues);
                  updateMinMaxZoom(NewValues);
                }}
              />
            </div>
            <span className="field-bridge" />
            <div className="group max-zoom">
              <label htmlFor={`max-zoom-input-${id}`} className="t-panel-small">
                Max
              </label>
              <input
                type="number"
                name="max-zoom"
                id={`max-zoom-input-${id}`}
                className="panel-field t-panel-small"
                value={minMaxZoom[1]}
                onChange={(e) => setMinMaxZoom(prev => [prev[0], Number(e.target.value)])}
                onBlur={(e) => {
                  e.stopPropagation();
                  if (Number(e.target.value) <= 0 || e.target.value === "")
                    return (e.target.value = "22");
                  const NewValues = [
                    minMaxZoom[0],
                    Number(e.target.value)
                  ]
                  setMinMaxZoom(NewValues);
                  updateMinMaxZoom(NewValues);
                }}
              />
            </div>
          </div>
        </div> */}
        <button
          type="button"
          className="delete-map-button t-panel-medium"
          onClick={() => deleteMap(id ?? "")}
        >
          Delete map
        </button>
      </div>
    </>
  );
}
