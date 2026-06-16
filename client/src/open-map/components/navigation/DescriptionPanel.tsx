import Line from "../../../shared/components/Line";
import "../../styles/_descriptionPanel.scss";

export default function DescriptionPanel() {
  return (
    <>
      <div className="nav panel description">
        <div className="top-block">
          <p className="panel-name t-panel-name">Description</p>
        </div>
        <Line height={1} />
      </div>
    </>
  );
}
