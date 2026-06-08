import { useState, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import type { UserSource } from "../types/UserSource";
import type { Map } from "../types/Map";
import type { Group } from "../types/Group";
import { SOURCE_CONTEXT } from "./SourceContext";

export default function SourceProvider() {
  const [currentSource, setCurrentSource] = useState<UserSource | undefined>(
    undefined,
  );
  const CurrentMap = useRef<Map | null>(null);
  const CurrentGroup = useRef<Group | null>(null);

  //load data
  const loadSourceDataToState = async () => {
    const DataString = localStorage.getItem("source-of-user-data");
    let Source: UserSource = {
      id: "source-of-user-data",
      maps: [],
    };

    if (DataString) {
      const DataStringFormated = JSON.parse(DataString);
      if (DataStringFormated.id && DataStringFormated.maps)
        Source = {
          id: "source-of-user-data",
          maps: DataStringFormated.maps.map((map) => ({
            ...map,
            checked: false,
          })),
        };
    } else
      localStorage.setItem(
        Source.id,
        JSON.stringify({
          id: Source.id,
          maps: Source.maps.map(({ checked, ...rest }) => ({ ...rest })),
        }),
      );

    setCurrentSource(Source);
  };

  useEffect(() => {
    const handleLoad = async () => loadSourceDataToState();
    handleLoad();
  }, []);

  useEffect(() => {
    if (currentSource) {
      localStorage.setItem(
        currentSource.id,
        JSON.stringify({
          id: currentSource.id,
          maps: currentSource.maps.map(({ checked, ...rest }) => ({ ...rest })),
        }),
      );
    }
  }, [currentSource]);

  return (
    <>
      <SOURCE_CONTEXT.Provider
        value={{
          currentSource,
          setCurrentSource,
          currentMap: CurrentMap,
          currentGroup: CurrentGroup,
        }}
      >
        <Outlet />
      </SOURCE_CONTEXT.Provider>
    </>
  );
}
