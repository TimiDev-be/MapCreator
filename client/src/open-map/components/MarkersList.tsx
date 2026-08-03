import { useOpenMapPage } from "../../shared/new-hooks/useOpenMapPage";
import CustomMarker from "./marker/CustomMarker";

type Props = {
  isDownload: boolean
}

export default function MarkersList({isDownload} : Props) {
  const {currentMap, connectedDrawings} = useOpenMapPage();

  return(
    <>
      {currentMap && 
        [...currentMap.features,]
          .filter(f => f.properties?.markerId != undefined)
          .map(f => <CustomMarker key={f.id} feature={f} isDownload={isDownload}/>) 
      }
      {currentMap && !isDownload && 
        [
          ...connectedDrawings
            .filter(m => m.id !== currentMap.id)
            .flatMap(m => m.features)
        ]
        .filter(f => f.properties?.markerId != undefined)
        .map(f => <CustomMarker key={f.id} feature={f} isDownload={isDownload}/>) 
      }
    </>
  )
}