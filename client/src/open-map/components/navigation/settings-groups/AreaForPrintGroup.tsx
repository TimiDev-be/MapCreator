import { useMap } from "../../../../shared/hooks/Map";
import { useMapContainer } from "../../../../shared/hooks/MapContainer";
import { useMapSettings } from "../../../../shared/hooks/MapSettings";

export default function AreaForPrintGroup() {
  const {areaForPrintFeature, setAreaForPrintClientPreview, areaForPrintClientPreview} = useMapContainer();
  const {currentMap} = useMap();
  const {handleAreaForPrintChange, toggleAreaForPrint} = useMapSettings();
  const { attractionPoint, areaForPrint } = currentMap ?? {};

  return(
    <>
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
    </>
  )
}