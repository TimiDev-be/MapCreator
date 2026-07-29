import { useOpenMapPage } from "../../shared/new-hooks/useOpenMapPage";
import CustomMarker from "./marker/CustomMarker";

export default function MarkersList() {
  const {currentMap} = useOpenMapPage();

  return(
    <>
      {currentMap && 
        [...currentMap.features]
          .filter(f => f.properties?.markerId != undefined)
          .map(f => <CustomMarker key={f.id} feature={f}/>) 
      }
    </>
  )
}