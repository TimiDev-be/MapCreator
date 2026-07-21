import { useMap } from "../../../../shared/hooks/Map";
import { useEffect, useState } from "react";
import { useMapSettings } from "../../../../shared/hooks/MapSettings";

export default function ZoomGroup() {
  const {currentMap} = useMap();
  const {updateMinMaxZoom} = useMapSettings();
  if (!currentMap) return null;
  const { id, attractionPoint } = currentMap;
  const { minZoom, maxZoom } = attractionPoint ?? {};
  const [minMaxZoom, setMinMaxZoom] = useState<number[]>([minZoom ?? 0, maxZoom ?? 22]);

  useEffect(() => {
    if (!attractionPoint) return;
    setMinMaxZoom([minZoom!, maxZoom!]);
  }, [minZoom, maxZoom])

  return(
    <>
      <div className="linked-input-container zoom">
        <p className="about zoom t-panel-medium">
          Zoom
        </p>
        <div className="linked-wrapper">
          <div className="linked-group min-zoom">
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
          <div className="linked-group max-zoom">
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
      </div>
    </>
  )
}