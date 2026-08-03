import { useEffect } from "react";
import PolygonLogo from "../../../assets/bx_shape-polygon.svg?react";
import { useDrawPolygon } from "../../../shared/new-hooks/useDrawPolygon";

export default function PolygonButton() {
  const {
    activeButton,
    maplibreMap,
    handleToggleActive,
    handleFinishPolygonDrawing,
    handleMouseMove,
    handleClick,
    handleRemoveLastPolygonPoint
  } = useDrawPolygon();

  useEffect(() => {
    if (
      !maplibreMap.current ||
      !activeButton ||
      !activeButton.classList.contains("polygon")
    )
      return;

    const handleKeys = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleToggleActive(null);
      } else if (e.key === "Enter") {
        handleFinishPolygonDrawing();
      } else if (e.key === "Backspace") {
        handleRemoveLastPolygonPoint();
      }
    };
    maplibreMap.current.on("dblclick", handleFinishPolygonDrawing);
    maplibreMap.current.on("mousemove", handleMouseMove);
    maplibreMap.current.on("click", handleClick);
    window.addEventListener("keydown", handleKeys);

    return () => {
      maplibreMap.current!.off("dblclick", handleFinishPolygonDrawing);
      maplibreMap.current!.off("mousemove", handleMouseMove);
      maplibreMap.current!.off("click", handleClick);
      window.removeEventListener("keydown", handleKeys);
    };
  }, [activeButton, handleFinishPolygonDrawing, maplibreMap]);

  return (
    <>
      <button
        type="button"
        className="draw-button polygon"
        onClick={(e) => handleToggleActive(e.currentTarget)}
      >
        <PolygonLogo width={32} height={32} />
      </button>
    </>
  );
}
