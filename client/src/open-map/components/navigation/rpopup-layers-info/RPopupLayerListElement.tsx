import FrameLogo from "../../../../assets/mynaui_frame.svg?react";

type Props = {
  layerId: string
}

export default function RPopupLayerListElement({layerId} : Props) {
  return(
    <>
      <div className="rpopup-layer-list-element">
        <FrameLogo width={16} height={16}/>
        <p className="layer-id t-panel-small">{layerId}</p>
      </div>
    </>
  )
}
