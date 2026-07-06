import "../styles/_mapsList.scss";
import MapsListElement from "./MapsListElement";
import { useMaps } from "../../shared/hooks/Maps";
import { useMap } from "../../shared/hooks/Map";
import { useEffect } from "react";

export default function MapsList() {
  const { maps } = useMaps();
  const { closeMap } = useMap();

  useEffect(() => {
    closeMap();
  }, [closeMap]);

  return (
    <>
      <section className="maps-list">
        <div className="maps-list-wrapper">
          {maps &&
            maps.map((map) => <MapsListElement key={map.id} map={map} />)}

          {maps && maps.length === 0 && (
            <div className="maps-list-empty t-maps-list-empty">
              No map has been created yet.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
