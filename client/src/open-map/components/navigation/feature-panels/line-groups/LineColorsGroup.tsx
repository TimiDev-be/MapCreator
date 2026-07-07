import { useLineFeature } from "../../../../../shared/hooks/LineFeature";
import { useMapContainer } from "../../../../../shared/hooks/MapContainer"
import type { LineProperties } from "../../../../../shared/types/LineProperties";

export default function LineColorsGroup() {
  const {feature} = useMapContainer();
  const {handleColorChange} = useLineFeature();
  const {color} = feature?.properties ?? {} as LineProperties;

  return(
    <>
      <div className="group color">
        <div className="wrapper">
          <label htmlFor="feature-color-input" className="t-panel-small">
            Color
          </label>
          <input
            type="color"
            id="feature-color-input"
            name="feature-color"
            className="color-input"
            defaultValue={color}
            onBlur={handleColorChange}
          />
        </div>
      </div>
    </>
  )
}