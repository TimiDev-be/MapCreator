import "../styles/_mapsList.scss";
import MapsListElement from "./MapsListElement";
import { useEffect } from "react";
import { useMap } from "../../shared/new-hooks/useMap";
import { useSource } from "../../shared/new-hooks/useSource";

export default function MapsList() {
  const { maps, config } = useSource();
  const { getMaps } = useMap();

  useEffect(() => {
    if (!config) return;
    getMaps();
  }, [config])

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
