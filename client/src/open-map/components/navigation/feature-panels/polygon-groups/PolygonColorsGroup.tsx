import { useMapContainer } from "../../../../../shared/hooks/MapContainer";
import { usePolygonFeature } from "../../../../../shared/hooks/PolygonFeature";
import type { PolygonProperties } from "../../../../../shared/types/PolygonProperties";

export default function PolygonColorsGroup() {
  const {feature} = useMapContainer();
  const {handleColorChange, handleBorderColorChange, handleOpacityChange} = usePolygonFeature();
  const {color, opacity, borderColor} = feature?.properties ?? {} as PolygonProperties;

  return(
    <>
      <div className="group color">
        <div className="wrapper">
          <label htmlFor="feature-color-input" className="t-panel-small">
            Background Color
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
        <div className="wrapper">
          <label
            htmlFor="feature-border-color-input"
            className="t-panel-small"
          >
            Border Color
          </label>
          <input
            type="color"
            id="feature-border-color-input"
            name="feature-border-color"
            className="color-input"
            defaultValue={borderColor}
            onBlur={handleBorderColorChange}
          />
        </div>
        <div className="wrapper background-opacity">
          <label htmlFor="opacity-input" className="t-panel-small">
            Opacity
          </label>
          <input
            type="number"
            id="opacity-input"
            name="opacity"
            className="panel-field t-panel-small"
            defaultValue={opacity}
            onBlur={(e) => {
              let value = Number(e.currentTarget.value);
              if (value < 0) {
                e.currentTarget.value = "0";
                value = 0;
              }
              if (value > 1) {
                e.currentTarget.value = "1";
                value = 1;
              }
              handleOpacityChange(value);
            }}
          />
        </div>
      </div>
    </>
  )
}