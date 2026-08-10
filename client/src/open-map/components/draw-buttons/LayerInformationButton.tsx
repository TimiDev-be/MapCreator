import { useEffect } from "react";
import MessageIcon from "../../../assets/mage_message-information.svg?react";
import { useLayerInformationPopup } from "../../../shared/new-hooks/useLayerInformationPopup";

export default function LayerInformationButton() {
  const {handleLayersInfoClick, handleToggleActive, activeButton, maplibreMap} = useLayerInformationPopup();

  useEffect(() => {
    if (
      !maplibreMap.current ||
      !activeButton ||
      !activeButton.classList.contains("layers-info")
    )
      return;

    window.onkeydown = (e) => {
      if (e.key === "Escape") {
        handleToggleActive(null);
      }
    };
    maplibreMap.current.on("click", handleLayersInfoClick);

    return () => {
      maplibreMap.current!.off("click", handleLayersInfoClick);
      window.onkeydown = null;
    };
  }, [activeButton, handleLayersInfoClick, maplibreMap]);

  return(
    <>
      <button
        type="button"
        className="draw-button layers-info"
        onClick={(e) => handleToggleActive(e.currentTarget)}
      >
        <MessageIcon width={32} height={32} />
      </button>
    </>
  )
}