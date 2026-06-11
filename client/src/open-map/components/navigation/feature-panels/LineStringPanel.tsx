import { useMapContainer } from "../../../../shared/hooks/MapContainer";
import { useLineFeature } from "../../../../shared/hooks/LineFeature";

export default function LineStringPanel() {
  const { feature, toggleFeaturePanel } = useMapContainer();
  const { name, color, lineWidth } = feature.properties;
  const { handleColorChange, handleWidthChange } = useLineFeature();

  return (
    <>
      <div className="feature-panel lineString">
        <button
          type="button"
          className="close-feature-panel-button t-panel-medium"
          onClick={() => toggleFeaturePanel(null)}
        >
          Close
        </button>
        <p className="feature-name t-panel-medium">feature / {name}</p>
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
