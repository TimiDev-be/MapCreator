import { useCallback, useEffect, useState } from "react";
import { useMap } from "../../shared/hooks/Map";
import { UnitToPx } from "../../shared/utils/UnitToPx";
import { toast } from "react-toastify";

export default function PrintAreaPreview() {
  const { currentMap } = useMap();
  const { areaForPrint, printSettings } = currentMap ?? {};
  if (!printSettings) return null;
  const [sizeValues, setSizeValues] = useState<{width: string, height: string}>({width: "0px", height: "0px"});

  const handleLoadSize = useCallback(() => {
    const mapContainer = document.querySelector("#map-container");
    if (!mapContainer) return;

    const width = UnitToPx(printSettings, areaForPrint?.width ?? 0);
    const height = UnitToPx(printSettings, areaForPrint?.height ?? 0);
    let mapContainerSizes = mapContainer.getBoundingClientRect();

    const widthFlag = width > mapContainerSizes.width;
    const heightFlag = height > mapContainerSizes.height;
    const flag = widthFlag || heightFlag;

    if (flag) {
      toast.warning("Expected preview is too big for your device. Remember: your map print area will be bigger!", {
        toastId: "print-area-preview-warning"
      });
      const NewValue = {
        width: widthFlag ? "100%" : `${width}px`,
        height: heightFlag ? "100%" : `${height}px`
      }
      setSizeValues(NewValue);
    } else {
      setSizeValues({width: `${width}px`, height: `${height}px`});
    }
  }, [areaForPrint, printSettings]);

  useEffect(() => {
    const mapContainer = document.querySelector("#map-container");
    if (!mapContainer) return;

    const observer = new ResizeObserver(() => {
      handleLoadSize();
    });

    observer.observe(mapContainer);
    return () => observer.disconnect();
  }, [areaForPrint, printSettings]);

  return (
    <>
      <div
        className="print-area-preview"
        style={{
          width: sizeValues.width,
          height: sizeValues.height,
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
