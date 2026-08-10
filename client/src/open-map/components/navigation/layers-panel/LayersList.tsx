import { useDisabledLayers } from "../../../../shared/new-hooks/useDisabledLayers"
import { LayersIds } from "../../map-layers";
import LayerListElement from "./LayerListElement";

export default function LayersList() {
  const {layers, disabledLayerIds} = useDisabledLayers();

  return(
    <>
      <div className="layers-list">
        {layers && layers.sort((a, b) => a.id.localeCompare(b.id)).map(l => {
          if (LayersIds.includes(l.id)) return;
          return (
            <LayerListElement 
              key={crypto.randomUUID()} 
              layer={l} 
              isDisabled={disabledLayerIds.has(l.id)}
            />
            )
        })}
      </div>
    </>
  )
}