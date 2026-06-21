import { useMap } from "../../shared/hooks/Map";
import { MmToPx } from "../../shared/utils/MmToPx";

export default function PrintAreaPreview() {
  const { currentMap } = useMap();
  const { areaForPrint } = currentMap ?? {};

  return (
    <>
      <div
        className="print-area-preview"
        style={{
          width: `${MmToPx(areaForPrint?.width ?? 0)}px`,
          height: `${MmToPx(areaForPrint.height ?? 0)}px`,
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
