import { useMapSettings } from "../../../../shared/new-hooks/useMapSettings";
import type { AttractionPoint } from "../../../../shared/types/AttractionPoint";


export default function ZoomGroup() {
  const {settings, updateSettings} = useMapSettings();
  const {minZoom, maxZoom} = settings?.attractionPoint ?? {} as AttractionPoint;

  const handleMinMaxZoomBlur = async (e: React.ChangeEvent<HTMLInputElement>, zoom: "min" | "max") => {
    e.stopPropagation();
    if (!settings) return;
    const value = e.target.value;

    if (Number(value) < 0 || value === "")
      return (e.target.value = "0");

    let newAttractionPoint : AttractionPoint = {
      coords: [0, 0],
      zoom: 0,
      minZoom: 0,
      maxZoom: 0,
      pitch: 0,
      bearing: 0
    }

    if (settings.attractionPoint)
      newAttractionPoint = {
        ...settings.attractionPoint
      }

    switch(zoom) {
      case "min":
        newAttractionPoint = {
          ...newAttractionPoint,
          minZoom: Number(value)
        }
        break;
      case "max":
        newAttractionPoint = {
          ...newAttractionPoint,
          maxZoom: Number(value)
        }
        break;
    }

    await updateSettings({
      ...settings,
      attractionPoint: newAttractionPoint
    })
  }

  return(
    <>
      <div className="linked-input-container zoom">
        <p className="about zoom t-panel-medium">
          Zoom
        </p>
        <div className="linked-wrapper">
          <div className="linked-group min-zoom">
            <label htmlFor={`min-zoom-input`} className="t-panel-small">
              Min
            </label>
            <input
              type="number"
              name="min-zoom"
              id={`min-zoom-input`}
              className="panel-field t-panel-small"
              defaultValue={minZoom}
              onBlur={(e) => handleMinMaxZoomBlur(e, "min")}
            />
          </div>
          <span className="field-bridge" />
          <div className="linked-group max-zoom">
            <label htmlFor={`max-zoom-input`} className="t-panel-small">
              Max
            </label>
            <input
              type="number"
              name="max-zoom"
              id={`max-zoom-input`}
              className="panel-field t-panel-small"
              defaultValue={maxZoom}
              onBlur={(e) => handleMinMaxZoomBlur(e, "max")}
            />
          </div>
        </div>
      </div>
    </>
  )
}