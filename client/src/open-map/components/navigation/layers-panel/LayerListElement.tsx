import type { LayerSpecification } from "maplibre-gl"
import { useRef } from "react";
import { useDisabledLayers } from "../../../../shared/new-hooks/useDisabledLayers";

type Props = {
  layer: LayerSpecification,
  isDisabled: boolean
}

export default function LayerListElement({layer, isDisabled} : Props) {
  const {handleToggleDisabledLayer} = useDisabledLayers();
  const CheckBoxRef = useRef<HTMLInputElement | null>(null);
  const {id} = layer;

  const handleToggle = async () => {
    if (!CheckBoxRef.current) return;
    CheckBoxRef.current.checked = !CheckBoxRef.current.checked;
    await handleToggleDisabledLayer(id);
  }

  return(
    <>
      <button type="button" 
        className="layer-list-element"
        onClick={handleToggle}>
        <input type="checkbox" 
          name={`${id}-toggle`} 
          id={`${id}-toggle-input`}
          className="layer-toggle-checkbox"
          defaultChecked={!isDisabled}
          ref={CheckBoxRef}
          />
        <p className="layer-id t-panel-small">{id}</p>
      </button>
    </>
  )
}