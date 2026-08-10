import "../../../styles/_layersPanel.scss";
import Line from "../../../../shared/components/Line";
import LayersList from "./LayersList";

export default function LayersPanel() {
  return(
    <>
      <div className="nav panel layers">
        <p className="panel-name t-panel-name">Map layers</p>
        <Line height={1} />
        <LayersList/>
      </div>
    </>
  )
}