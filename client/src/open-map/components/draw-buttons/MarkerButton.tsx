import { useEffect } from "react";
import MarkerLogo from "../../../assets/mdi_map-marker-outline.svg?react";
import { useDrawMarker } from "../../../shared/new-hooks/useDrawMarker";

export default function MarkerButton() {
  const {activeButton, maplibreMap, handleToggleActive, handleFinishMarkerDrawing} = useDrawMarker();

  useEffect(() => {
    if (
      !maplibreMap.current ||
      !activeButton ||
      !activeButton.classList.contains("marker")
    )
      return;

    window.onkeydown = (e) => {
      if (e.key === "Escape") {
        handleToggleActive(null);
      }
    };
    maplibreMap.current.on("click", handleFinishMarkerDrawing);

    return () => {
      maplibreMap.current!.off("click", handleFinishMarkerDrawing);
      window.onkeydown = null;
    };
  }, [activeButton, handleFinishMarkerDrawing, maplibreMap]);

  return (
    <>
      <button
        type="button"
        className="draw-button marker"
        onClick={(e) => handleToggleActive(e.currentTarget)}
      >
        <MarkerLogo width={32} height={32} />
      </button>
    </>
  );
}
