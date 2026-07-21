import BorderLeft from "../../../../../assets/boxicons_dock-left.svg?react";
import BorderRight from "../../../../../assets/boxicons_dock-right.svg?react";
import BorderTop from "../../../../../assets/boxicons_dock-top.svg?react";
import BorderBottom from "../../../../../assets/boxicons_dock-bottom.svg?react";
import type { BorderStyle } from "../../../../../shared/types/BorderStyle";
import { useEffect, useState } from "react";
import { useMapContainer } from "../../../../../shared/hooks/MapContainer";
import type { MarkerProperties } from "../../../../../shared/types/MarkerProperties";
import { useMarkerFeature } from "../../../../../shared/hooks/MarkerFeature";

type Values = {
  top: number,
  right: number, 
  bottom: number,
  left: number,
  style: BorderStyle,
  color: string,
  colorOpacity: number
}

export default function MarkerBorderGroup() {
  const {feature} = useMapContainer();
  const {handleBorderChange} = useMarkerFeature();
  const {properties} = feature ?? {};
  const {border} = properties ?? {} as MarkerProperties;

  const [borderValues, setBorderValues] = useState<Values>({
    top: border[0] ?? 0,
    right: border[1] ?? 0,
    bottom: border[2] ?? 0,
    left: border[3] ?? 0,
    style: border[4] ?? 0,
    color: border[5] ?? "#000000",
    colorOpacity: border[6] ?? 1
  }); 

  useEffect(() => {
    const {top, right, bottom, left, style, color, colorOpacity} = borderValues;
    handleBorderChange([top, right, bottom, left, style, color, colorOpacity]);
  }, [borderValues]);

  return(
    <>
      <div className="linked-input-container border">
        <p className="about border t-panel-small">Border (em)</p>
        <div className="linked-wrapper">
          <div className="linked-group border-left">
            <label htmlFor="border-left-input" className="panel-label">
              <BorderLeft width={16} height={16}/>
            </label>
            <input type="number"
              name="border-left"
              id="border-left-input"
              className="panel-field t-panel-small"
              defaultValue={borderValues.left}
              onBlur={(e) => {
                if (e.target.value.trim() == "")
                  return e.target.value = borderValues.left.toString();
                setBorderValues(prev => ({...prev, left: Number(e.target.value)}))
              }}/>
          </div>
          <div className="field-bridge"></div>
          <div className="linked-group border-right">
            <label htmlFor="border-right-input" className="panel-label">
              <BorderRight width={16} height={16}/>
            </label>
            <input type="number"
              name="border-right"
              id="border-right-input"
              className="panel-field t-panel-small"
              defaultValue={borderValues.right}
              onBlur={(e) => {
                if (e.target.value.trim() == "")
                  return e.target.value = borderValues.right.toString();
                setBorderValues(prev => ({...prev, right: Number(e.target.value)}))
              }}/>
          </div>
        </div>
        <div className="linked-wrapper">
          <div className="linked-group border-top">
            <label htmlFor="border-top-input" className="panel-label">
              <BorderTop width={16} height={16}/>
            </label>
            <input type="number"
              name="border-top"
              id="border-top-input"
              className="panel-field t-panel-small"
              defaultValue={0}
              onBlur={(e) => {
                if (e.target.value.trim() == "")
                  return e.target.value = borderValues.top.toString();
                setBorderValues(prev => ({...prev, top: Number(e.target.value)}))
              }}/>
          </div>
          <div className="field-bridge"></div>
          <div className="linked-group border-bottom">
            <label htmlFor="border-bottom-input" className="panel-label">
              <BorderBottom width={16} height={16}/>
            </label>
            <input type="number"
              name="border-bottom"
              id="border-bottom-input"
              className="panel-field t-panel-small"
              defaultValue={0}
              onBlur={(e) => {
                if (e.target.value.trim() == "")
                  return e.target.value = borderValues.bottom.toString();
                setBorderValues(prev => ({...prev, bottom: Number(e.target.value)}))
              }}/>
          </div>
        </div>
        <div className="group">
          <div className="linked-wrapper without-bridge">
            <label htmlFor="border-color-input" 
              className="panel-label t-panel-small">
              Color
            </label>
            <input type="color"
              name="border-color"
              id="border-color-input"
              className="color-input"
              onBlur={(e) => {
                setBorderValues(prev => ({...prev, color: e.target.value}))
              }}/>
          </div>
          <div className="linked-wrapper without-bridge">
            <label htmlFor="border-opacity-input" 
              className="panel-label t-panel-small">
              Opacity
            </label>
            <input type="number"
              name="border-opacity"
              id="border-opacity-input"
              className="panel-field t-panel-small"
              defaultValue={1}
              onBlur={(e) => {
                if (e.target.value.trim() == "")
                  return e.target.value = borderValues.colorOpacity.toString();
                setBorderValues(prev => ({...prev, colorOpacity: Number(e.target.value)}))
              }}/>
          </div>
        </div>
      </div>
    </>
  )
}