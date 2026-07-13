import { useMap } from "../../shared/hooks/Map";
import { UnitToPx } from "../../shared/utils/UnitToPx";

export default function PrintAreaPreview() {
  const { currentMap } = useMap();
  const { areaForPrint, printSettings } = currentMap ?? {};
  if (!printSettings) return null;

  return (
    <>
      <div
        className="print-area-preview"
        style={{
          width: `${UnitToPx(printSettings, areaForPrint?.width ?? 0)}px`,
          height: `${UnitToPx(printSettings, areaForPrint?.height ?? 0)}px`,
        }}
      >
        <div className="corner corner-top-left"></div>
        <div className="corner corner-top-right"></div>
        <div className="corner corner-bottom-left"></div>
        <div className="corner corner-bottom-right"></div>
        <div className="center-sign">
          <span></span>
          <span></span>
        </div>
      </div>
    </>
  );
}
