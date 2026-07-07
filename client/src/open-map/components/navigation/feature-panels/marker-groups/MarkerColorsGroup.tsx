import { useMapContainer } from "../../../../../shared/hooks/MapContainer";
import { useMarkerFeature } from "../../../../../shared/hooks/MarkerFeature";
import type { MarkerProperties } from "../../../../../shared/types/MarkerProperties";

export default function MarkerColorsGroup() {
  const { feature } = useMapContainer();
  const { handleColorChange, handleBackgroundColorChange, handleOpacityChange, handleRotateChange } = useMarkerFeature();
  const {color, backgroundColor, opacity, rotate} = feature?.properties ?? {} as MarkerProperties;

  return(
    <>
      <div className="group colors">
        <div className="wrapper">
          <label htmlFor="feature-color-input" className="t-panel-small">
            Content Color
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
            htmlFor="feature-background-color-input"
            className="t-panel-small"
          >
            Background Color
          </label>
          <input
            type="color"
            id="feature-background-color-input"
            name="feature-background-color"
            className="color-input"
            defaultValue={backgroundColor}
            onBlur={handleBackgroundColorChange}
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
        <div className="wrapper rotate">
          <label htmlFor="rotate-input" className="t-panel-small">
            Rotate
          </label>
          <input
            type="number"
            id="rotate-input"
            name="rotate"
            className="panel-field t-panel-small"
            defaultValue={rotate}
            onBlur={(e) => {
              const value = Number(e.currentTarget.value);
              handleRotateChange(value);
            }}
          />
        </div>
      </div>
    </>
  )
}