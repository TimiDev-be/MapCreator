import { useEffect, useState } from "react";
import { useMapContainer } from "../../../../../shared/hooks/MapContainer";
import type { MarkerProperties } from "../../../../../shared/types/MarkerProperties";
import { useMarkerFeature } from "../../../../../shared/hooks/MarkerFeature";

type Values = {
  x: number,
  y: number,
  blur: number,
  color: string,
  colorOpacity: number
}

export default function MarkerBoxshadowGroup() {
  const {feature} = useMapContainer();
  const {handleBoxshadowChange} = useMarkerFeature();
  const {properties} = feature ?? {};
  const {boxShadow} = properties ?? {} as MarkerProperties;
  const [boxShadowValues, setBoxShadowValues] = useState<Values>({
    x: boxShadow[0] ?? 0, 
    y: boxShadow[1] ?? 0, 
    blur: boxShadow[2] ?? 0, 
    color: boxShadow[3] ?? "#000000",
    colorOpacity: boxShadow[4] ?? 1
  });

  useEffect(() => {
    const {x, y, blur, color, colorOpacity} = boxShadowValues;
    handleBoxshadowChange([x, y, blur, color, colorOpacity]);
  }, [boxShadowValues])

  return(
    <>
      <div className="linked-input-container box-shadow">
        <p className="about box-shadow t-panel-small">Box shadow (em)</p>
        <div className="linked-wrapper without-bridge">
          <div className="linked-group horizontal">
            <label htmlFor="horizontal-input" className="t-panel-small">x</label>
            <input 
              type="number"
              name="horizontal"
              id="horizontal-input"
              className="panel-field t-panel-small"
              defaultValue={boxShadowValues.x}
              onBlur={(e) => {
                if (e.target.value.trim() == "") 
                  return e.target.value = boxShadowValues.x.toString();
                setBoxShadowValues(prev => ({...prev, x: Number(e.target.value)}))
              }}
            />
          </div>
          <div className="linked-group vertical">
            <label htmlFor="vertical-input" className="t-panel-small">y</label>
            <input 
              type="number"
              name="vertical"
              id="vertical-input"
              className="panel-field t-panel-small"
              defaultValue={boxShadowValues.y}
              onBlur={(e) => {
                if (e.target.value.trim() == "")
                  return e.target.value = boxShadowValues.y.toString();
                setBoxShadowValues(prev => ({...prev, y: Number(e.target.value)}))
              }}
            />
          </div>
        </div>
        <div className="linked-wrapper without-bridge">
          <div className="linked-group blur">
            <label htmlFor="blur-input" className="t-panel-small">blur</label>
            <input 
              type="number"
              name="blur"
              id="blur-input"
              className="panel-field t-panel-small"
              defaultValue={boxShadowValues.blur}
              onBlur={(e) => {
                if (e.target.value.trim() == "")
                  return e.target.value = boxShadowValues.blur.toString();
                setBoxShadowValues(prev => ({...prev, blur: Number(e.target.value)}))
              }}
            />
          </div>
        </div>
        <div className="group">
          <div className="linked-wrapper without-bridge">
            <label htmlFor="feature-color-input" className="t-panel-small">
              Color 
            </label>
            <input
              type="color"
              id="feature-color-input"
              name="feature-color"
              className="color-input"
              defaultValue={boxShadowValues.color}
              onBlur={(e) => {
                setBoxShadowValues(prev => ({...prev, color: e.target.value}))
              }}
            />
          </div>
          <div className="linked-wrapper without-bridge">
            <label htmlFor="feature-opacity-input" className="t-panel-small">
              Opacity
            </label>
            <input
              type="number"
              id="feature-opacity-input"
              name="feature-opacity"
              className="panel-field t-panel-small"
              defaultValue={boxShadowValues.colorOpacity}
              onBlur={(e) => {
                if (e.target.value.trim() == "")
                  return e.target.value = boxShadowValues.colorOpacity.toString();
                setBoxShadowValues(prev => ({...prev, colorOpacity: Number(e.target.value)}))
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}