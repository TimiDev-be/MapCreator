import type React from "react";
import { useMapSettings, type SettingsPanelProperties } from "../../../../shared/new-hooks/useMapSettings";
import type { AreaForPrint } from "../../../../shared/types/AreaForPrint";
import { useAreaForPrint } from "../../../../shared/new-hooks/useAreaForPrint";

export default function AreaForPrintGroup() {
  const {settings, updateSettings} = useMapSettings();
  const {areaForPrintFeature, areaForPrintClientVisible, setAreaForPrintClientVisible, toggleAreaForPrint} = useAreaForPrint();
  const {attractionPoint, areaForPrint} = settings ?? {} as SettingsPanelProperties;

  const handleAreaForPrintBlur = async (e: React.ChangeEvent<HTMLInputElement>, size: "width" | "height") => {
    if (!settings) return;
    const value = e.target.value;

    let newAreaForPrint : AreaForPrint = {
      ...areaForPrint
    }
    
    switch(size) {
      case "width":
        if (value.trim() === "" || Number(value) < 0)
          return e.target.value = (newAreaForPrint.width ?? 150).toString();
        else 
          newAreaForPrint.width = Number(value);
        break;
      case "height":
        if (value.trim() === "" || Number(value) < 0)
          return e.target.value = (newAreaForPrint.height ?? 95).toString();
        else 
          newAreaForPrint.height = Number(value);
        break;
    }

    await updateSettings({
      ...settings,
      areaForPrint: newAreaForPrint
    })
  }

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
              defaultValue={settings?.areaForPrint.width}
              onBlur={(e) => handleAreaForPrintBlur(e, "width")}
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
              defaultValue={settings?.areaForPrint.height}
              onBlur={(e) => handleAreaForPrintBlur(e, "height")}
            />
          </div>
        </div>
        <button
          type="button"
          className={`show-print-area-button t-panel-small ${areaForPrintFeature ? "active" : ""}`}
          onClick={toggleAreaForPrint}
          disabled={attractionPoint?.zoom == 0}
        >
          Show print area
        </button>
        <button
          type="button"
          className={`show-print-area-client-preview-button t-panel-small ${areaForPrintClientVisible ? "active" : ""}`}
          onClick={() => setAreaForPrintClientVisible((prev) => !prev)}
        >
          {areaForPrintClientVisible ? "Hide" : "Show"} print area client
          preview
        </button>
      </div>
    </>
  )
}