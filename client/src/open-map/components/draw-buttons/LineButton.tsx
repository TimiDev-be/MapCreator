import LineLogo from "../../../assets/uil_line-alt.svg?react";
import { useEffect } from "react";
import { useDrawLine } from "../../../shared/new-hooks/useDrawLine";

export default function LineButton() {
  const {
    activeButton, 
    handleToggleActive,
    maplibreMap, 
    handleFinishLineDrawing,
    handleMouseMove,
    handleClick,
    handleRemoveLastLinePoint
  } = useDrawLine();

  useEffect(() => {
    if (
      !maplibreMap.current ||
      !activeButton ||
      !activeButton.classList.contains("line")
    )
      return;

    const handleKeys = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleToggleActive(null);
      } else if (e.key === "Enter") {
        handleFinishLineDrawing();
      } else if (e.key === "Backspace") {
        handleRemoveLastLinePoint();
      }
    };

    window.addEventListener("keydown", handleKeys);
    maplibreMap.current.on("dblclick", handleFinishLineDrawing);
    maplibreMap.current.on("mousemove", handleMouseMove);
    maplibreMap.current.on("click", handleClick);

    return () => {
      maplibreMap.current?.off("dblclick", handleFinishLineDrawing);
      maplibreMap.current?.off("mousemove", handleMouseMove);
      maplibreMap.current?.off("click", handleClick);
      window.removeEventListener("keydown", handleKeys);
    };
  }, [activeButton, handleFinishLineDrawing, maplibreMap]);

  return (
    <>
      <button
        type="button"
        className="draw-button line"
        onClick={(e) => handleToggleActive(e.currentTarget)}
      >
        <LineLogo width={32} height={32} />
      </button>
    </>
  );
}
