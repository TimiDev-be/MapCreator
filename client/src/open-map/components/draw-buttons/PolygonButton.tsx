import { useEffect } from "react";
import PolygonLogo from "../../../assets/bx_shape-polygon.svg?react";
import { useDraw } from "../../../shared/hooks/Draw";
import { useMapContainer } from "../../../shared/hooks/MapContainer";

export default function PolygonButton() {
  const { map } = useMapContainer();
  const {
    toggleDrawButton,
    FinishPolygon,
    activeButton,
    handleRemoveLastPoint,
    handleClick,
    handleMouseMove,
  } = useDraw();

  useEffect(() => {
    if (
      !map.current ||
      !activeButton ||
      !activeButton.classList.contains("polygon")
    )
      return;

    const handleKeys = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        toggleDrawButton(null);
      } else if (e.key === "Enter") {
        FinishPolygon(null);
      } else if (e.key === "Backspace") {
        handleRemoveLastPoint();
      }
    };
    map.current.on("dblclick", FinishPolygon);
    map.current.on("mousemove", handleMouseMove);
    map.current.on("click", handleClick);
    window.addEventListener("keydown", handleKeys);

    return () => {
      map.current.off("dblclick", FinishPolygon);
      map.current.off("mousemove", handleMouseMove);
      map.current.off("click", handleClick);
      window.removeEventListener("keydown", handleKeys);
    };
  }, [activeButton, FinishPolygon, map]);

  return (
    <>
      <button
        type="button"
        className="draw-button polygon"
        onClick={toggleDrawButton}
      >
        <PolygonLogo width={32} height={32} />
      </button>
    </>
  );
}
