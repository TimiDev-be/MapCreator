import { RPopup } from "maplibre-react-components"
import { useOpenMapPage } from "../../../../shared/new-hooks/useOpenMapPage"
import RPopupLayerListElement from "./RPopupLayerListElement";
import CloseLogo from "../../../../assets/material-symbols_close.svg?react";

export default function RPopupLayerInfo() {
  const {layersInfo, setLayersInfo} = useOpenMapPage();
 
  return(
    <>
      {layersInfo && (
        <RPopup longitude={layersInfo.lng}
          latitude={layersInfo.lat}>
            <div className="rpopup-layer-info-wrapper">
              <ul className="rpopup-layers-list">
                {[...new Set(layersInfo.layersIds)].map(id => {
                  return <RPopupLayerListElement key={id} layerId={id}/>
                })}
              </ul>
              <button type="button" className="close-rpopup-layer-info"
                onClick={() => setLayersInfo(null)}>
                <CloseLogo width={12} height={12}/>
              </button>
            </div>
        </RPopup>
      )}
    </>
  )
}