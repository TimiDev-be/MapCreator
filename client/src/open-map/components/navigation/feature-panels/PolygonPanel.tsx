import { useMapContainer } from "../../../../shared/hooks/MapContainer";
import { usePolygonFeature } from "../../../../shared/hooks/PolygonFeature";
import CloseLogo from "../../../../assets/material-symbols_close.svg?react";
import type { PolygonProperties } from "../../../../shared/types/PolygonProperties";

export default function PolygonPanel() {
  const { feature, toggleFeaturePanel } = useMapContainer();
  const { handleColorChange, handleWidthChange, handleBorderColorChange } =
    usePolygonFeature();
  const { name, color, lineWidth, borderColor } =
    feature.properties as PolygonProperties;

  return (
    <>
      <div className="feature-panel polygon">
        <button
          type="button"
          className="close-feature-panel-button t-panel-medium"
          onClick={() => toggleFeaturePanel(null)}
        >
          <CloseLogo width={20} height={20} />
        </button>
        <p className="feature-name t-panel-medium">feature / {name}</p>
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
        </div>
        <div className="group sizes">
          <div className="wrapper">
            <label htmlFor="range-width-input" className="t-panel-small">
              Width ({lineWidth})
            </label>
            <input
              type="range"
              id="range-width-input"
              name="range-width"
              min="1"
              max="12"
              defaultValue={lineWidth}
              onMouseUp={handleWidthChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
