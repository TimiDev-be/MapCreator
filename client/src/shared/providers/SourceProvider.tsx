import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import type { UserSource } from "../types/UserSource";
import type { Group } from "../types/Group";
import { SOURCE_CONTEXT } from "../contexts/SourceContext";
import type { Map } from "../classes/Map";
import type { Config } from "../types/Config";

export default function SourceProvider() {
  const [currentSource, setCurrentSource] = useState<UserSource | undefined>(
    undefined,
  );
  const [currentMap, setCurrentMap] = useState<Map | undefined>(undefined);
  const [currentGroup, setCurrentGroup] = useState<Group | undefined>(
    undefined,
  );
  const [config, setConfig] = useState<Config | undefined>(undefined);

  //load data
  const loadSourceDataToState = async () => {
    if (!config) return;

    const response = await fetch(`${config.api.link}/data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseJson = await response.json();
      const parsedData = JSON.parse(responseJson.data);
      setCurrentSource(
        parsedData ?? { id: "source-of-user-data", maps: [], templates: [] },
      );
    } else {
      setCurrentSource({ id: "source-of-user-data", maps: [], templates: [] });
    }
  };

  useEffect(() => {
    fetch("config.json")
      .then((res) => res.json())
      .then(setConfig);
  }, []);

  useEffect(() => {
    if (!config) return;
    const handleLoad = async () => {
      await loadSourceDataToState();
    };
    handleLoad();
  }, [config]);

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
          config,
        }}
      >
        <Outlet />
      </SOURCE_CONTEXT.Provider>
    </>
  );
}
