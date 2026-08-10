import "../../styles/_drawButtons.scss";
import LayerInformationButton from "./LayerInformationButton";
import LineButton from "./LineButton";
import MarkerButton from "./MarkerButton";
import PolygonButton from "./PolygonButton";

export default function DrawButtons() {
  return (
    <>
      <div className="draw-buttons">
        <MarkerButton />
        <LineButton />
        <PolygonButton />
        <LayerInformationButton />
      </div>
    </>
  );
}
