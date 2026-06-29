import LineLogo from "../../../assets/uil_line-alt.svg?react";
import { useDraw } from "../../../shared/hooks/Draw";
import { useMapContainer } from "../../../shared/hooks/MapContainer";
import { useEffect } from "react";

export default function LineButton() {
  const { map } = useMapContainer();
  const {
    toggleDrawButton,
    activeButton,
    FinishLine,
    handleRemoveLastPoint,
    handleClick,
    handleMouseMove,
  } = useDraw();

  useEffect(() => {
    if (
      !map.current ||
      !activeButton ||
      !activeButton.classList.contains("line")
    )
      return;

    const handleKeys = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        toggleDrawButton(undefined);
      } else if (e.key === "Enter") {
        FinishLine(undefined);
      } else if (e.key === "Backspace") {
        handleRemoveLastPoint();
      }
    };

    window.addEventListener("keydown", handleKeys);
    map.current.on("dblclick", FinishLine);
    map.current.on("mousemove", handleMouseMove);
    map.current.on("click", handleClick);

    return () => {
      map.current?.off("dblclick", FinishLine);
      map.current?.off("mousemove", handleMouseMove);
      map.current?.off("click", handleClick);
      window.removeEventListener("keydown", handleKeys);
    };
  }, [activeButton, FinishLine, map]);

  return (
    <>
      <button
        type="button"
        className="draw-button line"
        onClick={toggleDrawButton}
      >
        <LineLogo width={32} height={32} />
      </button>
    </>
  );
}
