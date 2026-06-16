import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import type { UserSource } from "../types/UserSource";
import type { Group } from "../types/Group";
import { SOURCE_CONTEXT } from "../contexts/SourceContext";
import type { Map } from "../classes/Map";

export default function SourceProvider() {
  const [currentSource, setCurrentSource] = useState<UserSource | undefined>(
    undefined,
  );
  const [currentMap, setCurrentMap] = useState<Map | undefined>(undefined);
  const [currentGroup, setCurrentGroup] = useState<Group | undefined>(
    undefined,
  );

  //load data
  const loadSourceDataToState = async () => {
    const DataString = localStorage.getItem("source-of-user-data");
    let Source: UserSource = {
      id: "source-of-user-data",
      maps: [],
      templates: [],
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
          templates: DataStringFormated.templates ?? [],
        };
    }

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
          templates: currentSource.templates,
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
          currentMap,
          setCurrentMap,
          currentGroup,
          setCurrentGroup,
        }}
      >
        <Outlet />
      </SOURCE_CONTEXT.Provider>
    </>
  );
}
