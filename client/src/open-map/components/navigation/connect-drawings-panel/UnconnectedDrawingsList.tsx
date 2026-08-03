import "../../../styles/_drawingsList.scss";
import ConnectDrawingsElement from "./ConnectDrawingsElement";
import { useEffect, useState } from "react";
import type { Map } from "../../../../shared/types/Map";
import { useMap } from "../../../../shared/new-hooks/useMap";
import { useOpenMapPage } from "../../../../shared/new-hooks/useOpenMapPage";

export default function UnconnectedDrawingsList() {
  const {connectedDrawings} = useOpenMapPage();
  const {getMaps} = useMap();
  const [maps, setMaps] = useState<Map[]>([]); 
  
  useEffect(() => {
    const handleLoad = async () => {
      const Maps = await getMaps();
      if (Maps)
        setMaps(Maps);
    }
    handleLoad();
  }, [])


  return (
    <>
      <div className="unconnected-drawings-list-container">
        <ul className="unconnected-drawings-list">
          {maps.filter(m => !connectedDrawings.find(cm => cm.id == m.id)).map((map) => (
            <ConnectDrawingsElement key={map.id} map={map} isCurrentMap={false} isConnected={false}/>
          ))}
        </ul>
      </div>
    </>
  );
}
