import { useEffect } from "react";
import MarkerLogo from "../../../assets/mdi_map-marker-outline.svg?react";
import { useDraw } from "../../../shared/hooks/Draw";
import { useMapContainer } from "../../../shared/hooks/MapContainer";

export default function MarkerButton() {
  const { map } = useMapContainer();
  const { toggleDrawButton, FinishMarker, activeButton } = useDraw();

  useEffect(() => {
    if (
      !map.current ||
      !activeButton ||
      !activeButton.classList.contains("marker")
    )
      return;

    window.onkeydown = (e) => {
      if (e.key === "Escape") {
        toggleDrawButton(undefined);
      }
    };
    map.current.on("click", FinishMarker);

    return () => {
      map.current!.off("click", FinishMarker);
      window.onkeydown = null;
    };
  }, [activeButton, FinishMarker, map]);

  return (
    <>
      <button
        type="button"
        className="draw-button marker"
        onClick={toggleDrawButton}
      >
        <MarkerLogo width={32} height={32} />
      </button>
    </>
  );
}
