import { useMapContainer } from "../../../../../shared/hooks/MapContainer"
import { usePolygonFeature } from "../../../../../shared/hooks/PolygonFeature";
import type { PolygonProperties } from "../../../../../shared/types/PolygonProperties";

export default function PolygonSizesGroup() {
  const {feature} = useMapContainer();
  const {handleWidthChange} = usePolygonFeature();
  const {lineWidth} = feature?.properties ?? {} as PolygonProperties;

  return(
    <>
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
    </>
  )
}