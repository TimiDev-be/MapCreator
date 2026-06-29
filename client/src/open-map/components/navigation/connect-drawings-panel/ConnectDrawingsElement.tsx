import NextLogo from "../../../../assets/ooui_next-ltr.svg?react";
import ArrorLogo from "../../../../assets/carbon_arrow-right.svg?react";
import type { Map } from "../../../../shared/types/Map";
import { useState } from "react";
import { useConnectDrawings } from "../../../../shared/hooks/ConnnectDrawings";

type Props = {
  map: Map;
  isCurrentMap: boolean;
  isConnected: boolean;
};

export default function ConnectDrawingsElement({ map, isCurrentMap, isConnected }: Props) {
  const {toggleConnectedMap, updateMinMaxZoom} = useConnectDrawings();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const {id, name, attractionPoint} = map;
  const {minZoom, maxZoom} = attractionPoint ?? {};
  const [minMaxZoom, setMinMaxZoom] = useState<number[]>([minZoom ?? 0, maxZoom ?? 22]);

  return (
    <>
      <li className="connected-drawing" style={isCurrentMap ? {"cursor": "default"} : {}} onClick={() => setIsExpanded(prev => !prev)}>
        <div className="top-block">
          <div className="wrapper">
            {!isCurrentMap && (
              <button type="button" className="switch-connect-status-button" onClick={(e) => {
                e.stopPropagation();
                toggleConnectedMap(id);
              }}>
                <ArrorLogo width={20} height={20} className={`arrow-logo ${isConnected ? "connected" : ""}`}/>
              </button>
            )}
            <p className="name t-panel-big">{name}</p>
          </div>
          {!isCurrentMap && (
            <button
              type="button"
              className={`connected-drawing-properties-button ${isExpanded ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded((prev) => !prev);
              }}
            >
              <NextLogo width={20} height={20} />
            </button>
          )}
        </div>
        {!isCurrentMap && (
          <div className={`bottom-block ${isExpanded ? "active" : ""}`} onClick={(e) => e.stopPropagation()}>
            <div className="linked-input-container zoom">
              <p className="about zoom t-panel-medium">
                Zoom
              </p>
              <div className="wrapper">
                <div className="group min-zoom">
                  <label htmlFor={`min-zoom-input-${map.id}-${isConnected ? "connected" : "unconnected"}`} className="t-panel-small">
                    Min
                  </label>
                  <input
                    type="number"
                    name="min-zoom"
                    id={`min-zoom-input-${map.id}-${isConnected ? "connected" : "unconnected"}`}
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
                      updateMinMaxZoom(id, NewValues);
                    }}
                  />
                </div>
                <span className="field-bridge" />
                <div className="group max-zoom">
                  <label htmlFor={`max-zoom-input-${map.id}-${isConnected ? "connected" : "unconnected"}`} className="t-panel-small">
                    Max
                  </label>
                  <input
                    type="number"
                    name="max-zoom"
                    id={`max-zoom-input-${map.id}-${isConnected ? "connected" : "unconnected"}`}
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
                      updateMinMaxZoom(id, NewValues);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </li>
    </>
  );
}
